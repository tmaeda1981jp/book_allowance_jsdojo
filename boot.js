/**
 * Bootstrap
 * boot.js
 */

var mode = process.argv[2] || "development";

process.env.NODE_ENV = mode;

require("./app");