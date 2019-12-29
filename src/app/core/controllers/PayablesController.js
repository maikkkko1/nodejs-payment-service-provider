/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-27 21:23:30
 * @modify date 2019-12-27 21:23:30
 * @desc Payables operations.
 */

const { Payable } = require('../../models');
const Request = require('../Request');
const Util = require('../Util');

 /** Percentage fee. */
const DEBIT_PAYABLE_FEE = 3;
const CREDIT_PAYABLE_FEE = 5;

const CREDIT_PAYABLE_PLUS_DAYS = 30;

exports.createPayable = async (data) => {
    const payableObject = {
        clientId: data.clientId,
        description: data.description,
        fee: data.paymentMethod == 'credit_card' ? CREDIT_PAYABLE_FEE : DEBIT_PAYABLE_FEE
    };

    switch (data.paymentMethod) {
        case 'debit_card':
            payableObject.status = 'paid';
            payableObject.value = getPayableValue(data.value, DEBIT_PAYABLE_FEE);
            payableObject.paymentDate = new Date().toISOString();

            break;
        case 'credit_card':
            payableObject.status = 'waiting_funds';
            payableObject.value = getPayableValue(data.value, CREDIT_PAYABLE_FEE);
            payableObject.paymentDate = getPayablePaymentDate();
    }

    try {
        const payable = await Payable.create(payableObject);

        payableObject.payableId = payable.dataValues.id;

        return payableObject;
    } catch(err) {
        console.log(err);

        return false;
    }
}

exports.getAvailableFunds = async (req, res) => {
    const clientId = req.params.clientId;

    if (!Util.isValid(clientId)) {
        res.send(Request.response('Invalid client id', true)); return;
    }

    const payables = await Payable.findAll({
        raw: true,
        where: {
          clientId: clientId,
          status: 'paid'
        }
    });
}   

function getPayablePaymentDate() {
    const date = new Date();
    date.setDate(date.getDate() + CREDIT_PAYABLE_PLUS_DAYS);

    return date.toISOString();
}

function getPayableValue(value, fee) {
    value = Number(value);

    const feeValue = fee * value / 100;

    return value - feeValue;
}