/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 11:45:01
 * @modify date 2019-12-29 11:45:01
 * @desc Util unit tests.
 */

const chai = require("chai");
const assert = chai.assert;

const Util = require("../app/core/Util");

describe("Util unit tests", () => {
  it("Test: Should pass get is valid", () => {
    assert.isTrue(Util.isValid('test string'));
  });

  it("Test: Should fail get is valid", () => {
    assert.isFalse(Util.isValid(undefined));
  });

  it("Test: Should pass get is valid object", () => {
    assert.isTrue(Util.isValidObject({attr: 'test attr', attr2: 'test attr2'}));
  });

  it("Test: Should fail get is valid object", () => {
    assert.isFalse(Util.isValidObject({attr: null, attr2: 'test attr2'}));
  });
});
