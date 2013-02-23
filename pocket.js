/*jslint white: true, nomen: true, maxlen: 120, plusplus: true, node: true, */
/*global _:false, $:false, define:false, require:false, */
'use strict';

var host = 'http://localhost:3000/',
    request = require('request'),
    params = process.argv.slice(2)
;

switch(params[0]) {
case 'add':
  var item = {
    amount: params[1]
  };
  if (typeof params[2] !== 'undefined') {
    item.date = new Date(params[2]+'-00:00:00').getTime();
  }
console.log(item.date);
  request.post(host + 'add', {form: item}, function(error, response, body) {
    console.log("success!");
  });
  break;
case 'list':
  console.log("未実装です．");
  break;
default:
  console.log("");
}
