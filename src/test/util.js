/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 11:45:01
 * @modify date 2019-12-29 11:45:01
 * @desc Util unit tests.
 */

const chai = require("chai");
const assert = chai.assert;

const mockedData = require("./mockData");
const Util = require("../app/core/Util");

describe("Util unit tests", () => {
  it("Test: Should pass get funds response", () => {
    assert.isObject(PayablesController.getFundsResponse(mockedData.payablesQueryResponse));
  });

});
