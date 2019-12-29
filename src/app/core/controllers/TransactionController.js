/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-27 20:59:32
 * @modify date 2019-12-27 20:59:32
 * @desc Transactions operations.
 */

const Util = require('../Util');
const Request = require('../Request');
const { Transaction } = require('../../models');
const PayablesController = require('./PayablesController');

exports.createPayment = async (req, res) => {
  const body = req.body;

  if (!Util.isValid(body) || !Util.isValidObject(body) || !this.validateBody(body)) {
    res.send(Request.response('Invalid body', true)); return;
  }

  const cardObject = this.getCardObject(req.body.cardData);

  if (!cardObject) {
    res.send(Request.response('Invalid card data', true)); return;
  }

  const transactionObject = await createTransaction(body, cardObject);

  if (!transactionObject) {
    res.send(Request.response('Fail while creating transaction or payable', true)); return;
  }

  res.send(Request.response(transactionObject));
};

exports.getTransactions = async (req, res) => {
  const clientId = req.params.clientId;

  const queryParams = {raw: true};

  if (clientId != undefined) {
    if (!Util.isValid(clientId)) {
      res.send(Request.response('Invalid client id', true)); return;
    }

    queryParams.where = {clientId: clientId};
  }

  try {
    const transactions = await Transaction.findAll(queryParams);
    
    if (transactions && transactions.length == 0) {
      res.send(Request.response("There's no transactions found", true)); return;
    }

    res.send(Request.response(transactions));
  } catch(err) {
    console.log(err);

    res.send(Request.response('Fail while getting transactions', true)); return;
  }
}

/**
 * Create the transaction and his payables.
 * @param {object} data 
 * @param {object} cardObject 
 */
async function createTransaction(data, cardObject) {
  const transactionObject = data;

  transactionObject.cardData = JSON.stringify(cardObject);

  try {
    const transaction = await Transaction.create(transactionObject);

    transactionObject.transactionId = transaction.dataValues.id;
  } catch(err) {
    console.log(err);

    return false;
  }

  const payable = await PayablesController.createPayable(transactionObject);

  if (!payable) return false;
  
  transactionObject.payable = payable;

  return transactionObject;
}

exports.validateBody = (body) => {
  const validateKeys = ['clientId', 'value', 'description', 'paymentMethod', 'cardData', 'installments'];

  for (const key of validateKeys) {
    if (!Util.isValid(body[key])) return false;
  }

  return true;
}

exports.getCardObject = (data) => {
  const cardKeys = Object.keys(data);

  if (cardKeys.length < 4) return false;

  if (!data.cardNumber) return false;

  const prefix = '**** **** **** ';

  data.cardNumber = prefix + data.cardNumber.substring(data.cardNumber.length - 4);
  
  return data;
}