/**
 * model/account.js
 */

var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  date: Date,
  amount: Number
});
mongoose.model('Item', ItemSchema);
var Item = mongoose.model('Item');

function Account(db_name) {
  mongoose.connect('mongodb://localhost/' + db_name);

  this.add = function (item) {
    var new_item = new Item();
    new_item.date = item.date;
    new_item.amount = item.amount;
    new_item.save(function(err){
      if(err){ console.log(err); }
    });
  }

  this.list = function(callback){
    Item.find({}, function(err, items){
      callback(items);
    });
  }

  this.month = function(month, callback){
    var req_date = "201302";
//    var req_date = month;
    var show_date = req_date.match(/(\d{4})(\d{2})/);
    var start_date = new Date(show_date[1],parseInt(show_date[2]) - 1, 1,0,0,0);
    var next_date = new Date(show_date[1],parseInt(show_date[2]) ,1,0,0,0);
    console.log(start_date);
    console.log(next_date);
    Item.find({date:{$gte: start_date, $lte: next_date}},function(err, items){
      callback(items);
    });
  }
}

module.exports = Account;
