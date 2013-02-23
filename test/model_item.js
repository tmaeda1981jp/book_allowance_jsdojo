/**
 * item model test
 * test/model_item.js
 */

var mocha = require("mocha"),
    expect = require("expect.js"),
    Item = require("../model/item");

describe("Item", function () {
  it("initialize", function () {
    var date = new Date().getTime();
    
    var itemA = new Item({
      date: date,
      amount: 5000
    });
    expect(itemA).to.have.property("date");
    expect(itemA.date.getTime()).to.be(date);
    expect(itemA).to.have.property("amount");
    expect(itemA.amount).to.be(5000);
    
    var itemB = new Item({
      amount: "6000"
    });
    expect(itemB).to.have.property("date");
    expect(itemB.date.getTime()).to.be.within(date, new Date().getTime());
    expect(itemB).to.have.property("amount");
    expect(itemB.amount).to.be(6000);
  });
});