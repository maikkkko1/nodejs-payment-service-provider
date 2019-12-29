/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 12:07:50
 * @modify date 2019-12-29 12:07:50
 * @desc Mocked data for unit tests.
 */



exports.payableValue = 377;
exports.payableFee = 7;

exports.payablesQueryResponse = [
  {
    id: 1,
    clientId: 1234,
    transactionId: 5,
    originalValue: 350,
    feeValue: 17.5,
    value: 332.5,
    description: "iPhone 7 Plus 128GB",
    paymentDate: "2020-01-28T13:56:28.160Z",
    status: "waiting_funds",
    fee: "5"
  },
  {
    id: 2,
    clientId: 1234,
    transactionId: 5,
    originalValue: 350,
    feeValue: 17.5,
    value: 332.5,
    description: "iPhone 7 Plus 128GB",
    paymentDate: "2020-01-28T13:56:28.160Z",
    status: "waiting_funds",
    fee: "5"
  },
  {
    id: 3,
    clientId: 1234,
    transactionId: 5,
    originalValue: 350,
    feeValue: 17.5,
    value: 332.5,
    description: "iPhone 7 Plus 128GB",
    paymentDate: "2020-01-28T13:56:28.160Z",
    status: "waiting_funds",
    fee: "5"
  }
];

exports.mockedSuccessTransactionBody = {
  clientId: 1234,
  value: 350.0,
  description: "iPhone 7 Plus 128GB",
  paymentMethod: "credit_card",
  cardData: {
    cardNumber: "41111111111",
    cardName: "Maikon",
    cardValidate: "10/20",
    cardCvv: "737"
  },
  installments: 2
};

exports.mockedFailTransactionBody = {
  clientId: 1234,
  value: 350.0,
  description: null,
  paymentMethod: "credit_card",
  cardData: {
    cardNumber: null,
    cardName: "Maikon",
    cardValidate: "10/20",
    cardCvv: "737"
  },
  installments: 2
};
