var addUpdateMember = function(){
	$.post("../memberRegistration.php", $("#formMember").serialize()).done(function(msg){
		setMemberStatus(true, msg);
		clearMemberFields();
		refreshMembersList();
	}).fail(function(){
		setMemberStatus(false, "Error adding/updating member.");
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
	$("#txtMemberId").val("0");
	$("#txtFirstname").val("Juan Federico");
	$("#txtLastname").val("Bayuoc");
	$("#txtMiddlename").val("Sarap");
	$("#txtContactNo").val("(0920) 987-1234");
	$("#txtAddress").val("Barrio Patay, Agdao, Davao City, Philippines");
	$("#txtBirthday").val("08-12-1988");
	$("#rdbGenderMale").attr("checked", "true");
	$("#txtEmergencyContactPerson").val("Elizabeth Y. Panglugod");
	$("#txtEmergencyContactNumber").val("(0918) 232-1555)");
	$("#txtEmergencyContactRelationship").val("The Other Woman");
};

var clearMemberFields = function(){
	$('input[type="text"], textarea').val("");
	$('#rdbGenderMale').iCheck('check');
	$('#rdbTypeWalkin').iCheck('check');
	$('#rdbDiscountNo').iCheck('check');
	$('#selServiceType').val('-1');
	$("input[type='text'].dateField").val("");
};

var setMemberStatus = function(isSuccess, msg){
	var objStatus = $('#spanMemberStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
};


var clearMemberStatus = function(){
	var objStatus = $('#spanMemberStatus');
	objStatus.removeClass("success").removeClass("error").html("");
};