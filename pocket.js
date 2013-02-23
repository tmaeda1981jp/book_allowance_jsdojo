/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, node: true, */
/*global _:false, $:false, define:false, require:false, */
'use strict';

var host = 'http://localhost:3000/',
    request = require('request'),
    params = process.argv.slice(2),
    item
;

switch(params[0]) {
case 'add':
  item = { amount: params[1] };
  if (typeof params[2] !== 'undefined') {
    item.date = new Date(params[2]+'-00:00:00').getTime();
  }
  request.post(host + 'add', {form: item}, function(error, response, body) {
    if (error) {
      console.log("エラーだよ.");
    }
  });
  break;

case 'list':
  request.get(host + 'list', function(error, response, body) {
    var result = JSON.parse(response.body);
    result.forEach(function(item) {
      var d = new Date(item.date);
      console.log("(" + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ") " + item.amount + '円');
    });
  });
  break;

case 'month':
  item = {};
  if (typeof params[1] !== 'undefined') {
    var year = new Date().getFullYear(),
        yyyymm = year + ('0' + parseInt(params[1], 10)).slice(-2);
    item.month = yyyymm;
    request.get(host + 'month', item, function(error, response, body) {
      var result = JSON.parse(response.body), sum;
      result.forEach(function(item) {
        sum += item.amount;
      });
      console.log(yyyymm + 'の収支: ' + sum + '円');
    });
  }
  else {
    console.log("ex) node pocket month 12");
  }
  break;

default:
  console.log("Usage)\n node pocket [add|list|month] params\n");
}
