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
  if (params[2] != undefined) {
    item.date = new Date(params[2]).getTime();
  }
  request.post(host + 'add', item, function(error, response, body) {
    console.log("success!");
  });
  break;
case 'list':
  console.log("未実装です．");
  break;
default:
  console.log("");
}
