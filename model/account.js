/**
 * model/account.js
 */

function Account(db) {
  this.db = db;
  this.add = function (item) {
    this.db.items.push(item);
  }
}

module.exports = Account;