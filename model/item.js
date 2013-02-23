/**
 * model/item.js
 */

function Item(obj) {
  this.date = obj.date || new Date();
  this.amount = obj.amount;
}

module.exports = Item;