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

//Call this method inside initializeComponents and use the id 'selServiceType' to the select field
var loadServiceType = function(objSel){
	if(objSel){
		$.getJSON("../populateServiceTpes.php").done(function(data){
			$(objSel).empty().append('<option value=\'-1\'>- Please select -</option>');
			$.each(data, function(i, obj){
				$(objSel).append('<option value=' + obj.type_code + '>' + obj.type_name + '</option>');
			});
		});
	}
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