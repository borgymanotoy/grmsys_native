var initUserComponents = function(){
	$("table.usersTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});

	$("table.usersTable tr:odd").addClass("odd");
	$("table.usersTable tr:even").addClass("even");
	
	$("table.usersTable tr td").on("click", function(){
		var id = $(this).parent().find(":first-child").html();
		//console.log("[ID]: " + id);
		loadUserDetails(id);
	});
	
	$('#btnRemoveUser').hide();
};

var loadUserDetails = function(id){
	if(id){
		$.getJSON("../getUserDetails.php?id=" + id, function(data){
			if(data[0]){
				$("#txtUserId").val(data[0].user_id);
				$("#txtFirstname").val(data[0].firstname);
				$("#txtLastname").val(data[0].lastname);
				$("#txtMiddlename").val(data[0].middlename);
				$("#txtContactNo").val(data[0].contactno);
				$("#txtAddress").val(data[0].address);
				$("#txtBirthdate").val(data[0].birthdate);
				
				if(data[0].gender == 'M')
					$("#rdbGenderMale").iCheck('check');
				else
					$("#rdbGenderFemale").iCheck('check');

				$("#txtUsername").val(data[0].username);
				$("#txtPassword").val(data[0].password);

				$('#btnRemoveUser').show();
			}
		});
	}
};

var addUpdateUser = function(){
	$.post("../userRegistration.php", $("#formUser").serialize()).done(function(msg){
		setUserStatus(true, msg);
		clearUserFields();
		refreshUsersList();
	}).fail(function(){
		setUserStatus(false, "Error adding/updating user.");
	});
};

var removeUser = function(){
	var id = $("#txtUserId").val();
	if(id){
		console.log("Remove User: " + id);
	}
};

var refreshUsersList = function(page, sortColumn, order){
	var url = "../usersList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvUserListContainer").load(url, function(){
		initUserComponents();
	});
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
	$('#btnRemoveUser').hide();
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