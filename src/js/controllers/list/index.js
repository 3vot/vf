var Account  = require("../../models/account");
var Alert    = require("../alert");

var Item     = require("./item");
var DelItem  = require("./deleteItem");

var List = function(el){
	this.el = el;
	this.registerDOMElements();
	this.bindEvents();
}

List.prototype.registerDOMElements = function(){
	this.accountList     =  this.el.querySelector(".account-list")
	this.accountDelete   =  this.el.querySelector(".account-list-delete")
	this.btnCreate       =  this.el.querySelector(".btn-save");
	this.txtAccountName  =  this.el.querySelector(".txt-account-name");
	this.chkAccountTypes =  this.el.querySelector(".account-types");
}

List.prototype.bindEvents = function(){
	var _this = this;
	Account.bind("refresh destroy create", function(){ _this.render() });
	
	this.accountDelete.onclick    = this.onDelete;
	this.btnCreate.onclick        = function(e){   _this.onCreate(e);  }
	this.chkAccountTypes.onclick  = function(e){   _this.onAccountTypeClick(e);  } 	
}

List.prototype.render = function(){
	var accs = Account.all();
	this.accountList.innerHTML    = "";
	this.accountDelete.innerHTML  = "";

	var src = ""
	var srcDel = "";

	for (var i = accs.length - 1; i >= 0; i--) {
		var acc  = accs[i];
		src      += Item(acc);
		srcDel   += DelItem(acc)
	};

	this.accountDelete.innerHTML = srcDel;
	this.accountList.innerHTML   = src;
}


List.prototype.onDelete = function(e){
	if(e.target.classList.contains("btn-delete")){
			var id      = e.target.dataset.id;
			var account = Account.find(id);
			
			account.destroy()
			.fail( function(err){ 
				Alert.show( err[0].message ); 
			});
		}
}

List.prototype.onCreate = function(e){
	var _this = this;
	if(this.disableCreate == true) return;

	if(e.target.classList.contains("btn-save")){
			var accountType = this.chkAccountTypes.querySelector(".account-type-option.active")
			if(accountType == null) return Alert.show("Select and Account Type before creating an Account.")
			accountType = accountType.dataset.type;

			var name = this.txtAccountName.value;
			if( name == null || name.length == 0 )  return Alert.show("Type a Name for the account you want to create.")

			this.disableCreate = true;
			Account.create({ Name: name , Type: accountType })
			.then( function(){ _this.onCreateComplete() } )
			.fail( function(err){  
				_this.disableCreate = false;
				Alert.show( err[0].message ); 
			})
		
		}
}

List.prototype.onCreateComplete = function(){
	this.txtAccountName.value = "";
	this.clearAccountTypes();
	this.disableCreate = false;
}

List.prototype.onAccountTypeClick = function(e){
	if(e.target.tagName  != "A") return;
	this.clearAccountTypes();
	e.target.parentNode.classList.add("active")
}

List.prototype.clearAccountTypes = function(){
	var types = this.chkAccountTypes.querySelectorAll(".account-type-option")
	for (var i = types.length - 1; i >= 0; i--) {
		types[i].classList.remove("active");
	};
}

module.exports = List;