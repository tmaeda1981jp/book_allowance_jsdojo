/**
 * model/item.js
 */

function Item(obj) {
  if (typeof obj.amount === "number")
    throw new TypeError(amount);
  
  this.date = obj.date ? new Date(parseInt(obj.date, 10)) : new Date();
  this.amount = obj.amount;
}

module.exports = Item;
