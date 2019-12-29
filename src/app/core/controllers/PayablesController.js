/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-27 21:23:30
 * @modify date 2019-12-27 21:23:30
 * @desc Payables operations.
 */

const { Payable } = require("../../models");
const Request = require("../Request");
const Util = require("../Util");

/** Percentage fee. */
const DEBIT_PAYABLE_FEE = 3;
const CREDIT_PAYABLE_FEE = 5;

const CREDIT_PAYABLE_PLUS_DAYS = 30;

exports.createPayable = async data => {
  const payableObject = {
    transactionId: data.transactionId,
    clientId: data.clientId,
    description: data.description,
    originalValue: data.value,
    fee:
      data.paymentMethod == "credit_card"
        ? CREDIT_PAYABLE_FEE
        : DEBIT_PAYABLE_FEE
  };

  switch (data.paymentMethod) {
    case "debit_card":
      const payableValueDebit = this.getPayableValue(
        data.value,
        DEBIT_PAYABLE_FEE
      );

      payableObject.status = "paid";
      payableObject.value = payableValueDebit.value;
      payableObject.feeValue = payableValueDebit.fee;
      payableObject.paymentDate = new Date().toISOString();

      break;
    case "credit_card":
      const payableValueCredit = this.getPayableValue(
        data.value,
        CREDIT_PAYABLE_FEE
      );

      payableObject.status = "waiting_funds";
      payableObject.value = payableValueCredit.value;
      payableObject.feeValue = payableValueCredit.fee;
      payableObject.paymentDate = this.getPayablePaymentDate(CREDIT_PAYABLE_PLUS_DAYS);
  }

  try {
    const payable = await Payable.create(payableObject);

    payableObject.payableId = payable.dataValues.id;

    return payableObject;
  } catch (err) {
    console.log(err);

    return false;
  }
};

exports.getClientFunds = async (req, res) => {
  const clientId = req.params.clientId;
  const type = req.params.type;

  if (!Util.isValid(clientId) || !Util.isValid(type)) {
    res.send(Request.response("Invalid client id or funds type", true));
    return;
  }

  let fundsRequestType;

  if (type == "available") {
    fundsRequestType = "paid";
  } else if (type == "waiting") {
    fundsRequestType = "waiting_funds";
  } else {
    res.send(Request.response("Invalid funds type", true));
    return;
  }

  try {
    const payables = await Payable.findAll({
      raw: true,
      where: {
        clientId: clientId,
        status: fundsRequestType
      }
    });

    if (!payables) {
      res.send(Request.response("Fail while get available funds", true));
      return;
    }

    res.send(Request.response(this.getFundsResponse(payables)));
  } catch (err) {
    console.log(err);

    res.send(Request.response("Fail while get available funds", true));
  }
};

exports.getFundsResponse = payables => {
  if (!payables) return false;

  const response = (available, totalFee, waiting) => {
    const respObject = {
      available: Util.formatMonetary(available),
      waiting_funds: Util.formatMonetary(waiting),
      totalFee: Util.formatMonetary(totalFee)
    };

    return respObject;
  };

  if (payables.length == 0) return response(0, 0, 0);

  let available = 0;
  let totalFee = 0;
  let waiting = 0;

  payables.forEach(payable => {
    if (payable.status == "paid") {
      available += Number(payable.value);
    } else if (payable.status == "waiting_funds") {
      waiting += Number(payable.value);
    }

    totalFee += Number(payable.feeValue);
  });

  return response(available, totalFee, waiting);
};

exports.getPayablePaymentDate = (plusDays) => {
  const date = new Date();
  date.setDate(date.getDate() + plusDays);

  return date.toISOString();
};

exports.getPayableValue = (value, fee) => {
  if (!Util.isValid(value) || !Util.isValid(fee)) return false;
    
  value = Number(value);

  const feeValue = (fee * value) / 100;

  return {
    value: value - feeValue,
    fee: feeValue
  };
};
