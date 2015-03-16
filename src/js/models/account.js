var Model = require("clay-model");
var ClayVfr = require("clay-model-vfr");

var Account = Model.setup("Account", ["Id", "Name", "AccountSource", "Type"] );
Account.ajax = ClayVfr;

module.exports= Account;
