/**
 * account model class
 * model/account.js
 */

var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
  date: Date,
  amount: Number
});
var Item = mongoose.model('Item', ItemSchema);

function Account(db_name) {
  mongoose.connect('mongodb://localhost/' + db_name);
}

Account.prototype.add = function (item, callback) {
  var new_item = new Item({
    date: item.date ? new Date(Number(item.date)) : new Date(),
    amount: item.amount
  });
  new_item.save(callback);
};

Account.prototype.list = function (callback) {
  Item.find({}, callback);
};

Account.prototype.month = function (month, callback) {
  var req_date = month;
  console.log(req_date);
  
  var show_date = req_date.match(/(\d{4})(\d{2})/);
  var start_date = new Date(show_date[1], Number(show_date[2]) - 1, 1, 0, 0, 0);
  var next_date = new Date(show_date[1], Number(show_date[2]), 1, 0, 0, 0);
  console.log(start_date);
  console.log(next_date);
  
  Item.find({date: {$gte: start_date, $lte: next_date}}, callback);
};

module.exports = Account;