/**
 * book_allowance_jsdojo
 * app.js
 */

var express = require("express"),
    hogan = require("hogan-express"),
    http = require("http"),
    path = require("path"),
    util = require("util"),
    model = require("./model");

var db_name = "pocket_db",
    account = new model.Account(db_name);

var app = express();

app.configure(function () {
  app.set("view engine", "html");
  app.set("layout", "layout");
  app.set("views", path.join(__dirname, "views"));
  app.engine("html", hogan);
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: "test secret"}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, "static")));
});

app.configure("development", function () {
  app.set("port", 3000);
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.errorHandler());
});

app.configure("production", function () {
  app.set("port", 3000);
  app.enable("view cache");
  process.on("uncaughtException", function (err) {
    console.error(err);
  });
});

app.get("/mypage", function (req, res) {
  account.list(function(err, items) {
    var list = items.map(function (item) {
      if (err)
        return res.send(500, "Internal Server Error");
      
      var d = new Date(item.date);
      return [
        [d.getFullYear(), d.getMonth() + 1, d.getDate()].join("/"),
        item.amount
      ];
    });
    res.render("mypage", {list: list});
  });
});

app.post("/add", function (req, res) {
  var item = {
    date: req.body.date,
    amount: req.body.amount
  };
  
  account.add(item, function (err) {
    if (err)
      return res.json(500, {result: "error", error: err});
    
    res.json({result: "success"});
  });
});

app.get("/list", function(req, res) {
  account.list(function(err, items) {
    if (err)
      return res.json(500, {result: "error", error: err});
    
    res.json(items);
  });
});

app.get("/month", function(req, res) {
  account.month(req.query.month, function (err, items) {
    if (err)
      return res.json(500, {result: "error", error: err});
    
    res.json(items);
  });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express server running at " + app.get("port"));
});
