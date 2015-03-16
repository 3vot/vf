var Account = require("./models/account");
var AccountList = require("./controllers/list");

var Alert = require("./controllers/alert");

var Layout = require("./layout");


var container = document.querySelector(".container");
var alertDiv = document.querySelector(".alert");

container.innerHTML = Layout();

Alert.msgDiv = alertDiv;

var container = new AccountList(container);

Account.query("select id , Name, AccountSource, Type from Account")
.fail( function(err){ Alert.show( err[0].message ); } )
.done()