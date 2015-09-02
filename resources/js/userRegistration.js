var addUpdateUser = function(){
	$.post("../userRegistration.php", $("#formUser").serialize()).done(function(msg){
		setUserStatus(true, msg);
		clearUserFields();
		refreshUsersList();
	}).fail(function(){
		setUserStatus(false, "Error adding/updating user.");
	});
};

var refreshUsersList = function(page, sortColumn, order){
	var url = "../usersList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvUserListContainer").load(url);
};

var loadDummyUserInfo = function(){
	$("#txtUserId").val("0");
	$("#txtFirstname").val("Juan");
	$("#txtLastname").val("Dela Cruz");
	$("#txtMiddlename").val("Pedrito");
	$("#txtContactNo").val("(0920) 987-1234");
	$("#txtAddress").val("Davao City, Philippines");
	$("#txtBirthdate").val("05/20/1981");
	$("#rdbGenderMale").attr("checked", "true");
	$("#txtUsername").val("juandelacruz");
	$("#txtPassword").val("password");
};

var clearUserFields = function(){
	$('input[type="text"], textarea').val("");
	$('#rdbGenderMale').iCheck('check');
};

var setUserStatus = function(isSuccess, msg){
	var objStatus = $('#spanUserStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
};

var clearUserStatus = function(){
	var objStatus = $('#spanUserStatus');
	objStatus.removeClass("success").removeClass("error").html("");
};