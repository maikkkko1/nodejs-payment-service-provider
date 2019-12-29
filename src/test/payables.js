/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 11:45:01
 * @modify date 2019-12-29 11:45:01
 * @desc Payables unit tests.
 */

const chai = require("chai");
const assert = chai.assert;

const mockedData = require("./mockData");
const PayablesController = require("../app/core/controllers/PayablesController");

describe("Payables unit tests", () => {
  it("Test: Should pass get funds response", () => {
    assert.isObject(PayablesController.getFundsResponse(mockedData.payablesQueryResponse));
  });

  it("Test: Should fail get funds response", () => {
    assert.isFalse(PayablesController.getFundsResponse(null));
  });

  it("Test: Should pass get payable value", () => {
    assert.isObject(PayablesController.getPayableValue(mockedData.payableValue, mockedData.payableFee));
  });

  it("Test: Should fail get payable value", () => {
    assert.isFalse(PayablesController.getPayableValue(null, mockedData.payableFee));
  });
});
