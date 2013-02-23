/**
 * model/account.js
 */

function Account(db) {
  this.db = db;
  this.add = function (item) {
    this.db.items.push(item);
  },
  this.list = function() {
    return this.db.items;
  }
}

module.exports = Account;
