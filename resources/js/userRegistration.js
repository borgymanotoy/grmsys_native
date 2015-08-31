var addUpdateUser = function(){
	$.post("../userRegistration.php", $("#formUser").serialize(), function(){
		alert("User successfully registered.");
	}).fail(function(msg){
		alert("Error registering user.\n\n" + msg);
	});
};

var loadDummyUserInfo = function(){
	$("#txtUserId").val("0");
	$("#txtFirstname").val("Juan");
	$("#txtLastname").val("Dela Cruz");
	$("#txtMiddlename").val("Pedrito");
	$("#txtContactNo").val("(0920) 987-1234");
	$("#txtAddress").val("Davao City, Philippines");
	$("#txtBirthdate").val("05-20-1981");
	$("#rdbGenderMale").attr("checked", "true");
	$("#txtUsername").val("juandelacruz");
	$("#txtPassword").val("password");
};

var clearUserFields = function(){
	$('input[type="text"], textarea').val("");
	$('input').removeAttr('checked').removeAttr('selected');
};