// JavaScript Document
//filename: common.js

var goToHome = function(){
	redirectPage('/home.php');
};

var goToMember = function(){
	redirectPage('/member.php');
};

var goToUser = function(){
	redirectPage('/user.php');
};

var goToItem = function(){
	redirectPage('/item.php');
};

var redirectPage = function(url){
    $(location).attr('href', url);
};

var showStatusMessage = function(msg){
	$("#dialog-box").html(msg);
	$("#dialog-box").dialog({
		resizable: false,
		modal: true,
		title: "Gym Records Management",
		height: 200,
		width: 400,
		buttons: {
			"OK": function () {
				$(this).dialog('close');
			}
		}
	});
};

var showGrmSysMessageDialog = function(title, msg){
	$("#dialog-box").html(msg);
	$("#dialog-box").dialog({
		modal: true,
		title: title,
		resizable: false,
		height: "auto",
		width: "auto",
		buttons: {
			"OK": function () {
				$(this).dialog('close');
			}
		}
	});
};