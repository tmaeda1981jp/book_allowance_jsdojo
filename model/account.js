/**
 * model/account.js
 */

var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  date: Date,
  amount: Number
});
mongoose.model('Item', ItemSchema);

function Account(db_name) {
  mongoose.connect('mongodb://localhost/' + db_name);

  this.add = function (item) {
    var Item = mongoose.model('Item');
    var new_item = new Item();
    new_item.date = item.date;
    new_item.amount = item.amount;
    new_item.save(function(err){
      if(err){ console.log(err); }
    });
  }
}

module.exports = Account;
