var addUpdateMember = function(){
	$.post("../memberRegistration.php", $("#formMember").serialize()).done(function(msg){
		alert(msg);
		clearMemberFields();
		refreshMembersList();
	}).fail(function(){
		alert("Error adding/updating member.");
	});
};

var refreshMembersList = function(page, sortColumn, order){
	var url = "../membersList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvMemberListContainer").load(url);
};

var loadDummyMemberInfo = function(){
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

var clearMemberFields = function(){
	$('input[type="text"], textarea').val("");
	$('#rdbGenderMale').iCheck('check');
};