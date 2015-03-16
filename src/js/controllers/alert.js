var Alert = {};

Alert.msgDiv;

Alert.show = function(msg){
	Alert.msgDiv.innerHTML = msg;
	
	setTimeout( function(){
	Alert.msgDiv.innerHTML = "";
	}, 3500 )

}


module.exports = Alert;