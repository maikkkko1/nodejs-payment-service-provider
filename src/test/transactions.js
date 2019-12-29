/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 11:45:01
 * @modify date 2019-12-29 11:45:01
 * @desc Transactions unit tests.
 */

const chai = require("chai");
const assert = chai.assert;

const mockedData = require("./mockData");
const TransactionController = require("../app/core/controllers/TransactionController");

describe("Transactions unit tests", () => {
  it("Test: Should pass validate body data", () => {
    assert.isTrue(
      TransactionController.validateBody(
        mockedData.mockedSuccessTransactionBody
      )
    );
  });

  it("Test: Should fail validate body data", () => {
    assert.isFalse(
      TransactionController.validateBody(mockedData.mockedFailTransactionBody)
    );
  });

  it("Test: Should pass get card data object", () => {
    assert.isObject(
      TransactionController.getCardObject(
        mockedData.mockedSuccessTransactionBody.cardData
      )
    );
  });

  it("Test: Should fail get card data object", () => {
    assert.isFalse(
      TransactionController.getCardObject(
        mockedData.mockedFailTransactionBody.cardData
      )
    );
  });
});
