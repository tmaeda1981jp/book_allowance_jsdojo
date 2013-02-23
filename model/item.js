/**
 * model/item.js
 */

function Item(obj) {
  if (typeof obj.amount === "undefined")
    throw new TypeError("amount is not defined");
  
  this.date = obj.date ? new Date(Number(obj.date)) : new Date();
  this.amount = Number(obj.amount);
}

module.exports = Item;
