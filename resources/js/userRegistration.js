var initUserComponents = function(defaultRoleTypeCode){
	$("#popupSecurity, #dialog-box").hide();
	$('.myRadioButtons').iCheck({ radioClass: 'iradio_flat-red' });
	
	// $('#txtBirthdate').Zebra_DatePicker();
	// 	direction: -1
	   $('#txtBirthdate').Zebra_DatePicker({
        direction: -1,
        pair: false,
        format: 'm-d-Y',
        onSelect: function(view, elements) {
        }
    });
	$("div.headerIconLabel").bind("click", function(){
		goToHome();
	});
	$("input").bind("change", function(){
		clearUserStatus();
	});
	
	//$('#txtContactNo').autoNumeric('init');
	$("#txtContactNo").mask("(000) 000-0000");
	$('#selRoleype').val('');
	// $('#btnRemoveUser, #btnChangePassword').hide();

	$('#txtSearchKey').bind('keyup', function(){
		var searchkey = $(this).val();
		searchUserList(searchkey);
	});

	loadRoleType($('#selRoleype'), defaultRoleTypeCode);

	$("input").bind("change", function(){
		clearUserStatus();
	});

	//loadDummyUserInfo();
	initializeUserForm();
	initializeSecurityForm();
};

var initializeUserForm = function(){
	$("#formUser").validate({
		onkeyup:false,
		onkeydown:false,
		onchange: false,
		onblur:false,
		rules: {
			"firstname": {
				required:true,
				maxlength: 40
			},
			"lastname": {
				required:true,
				maxlength: 40
			},
			"username": {
				required:true,
				maxlength: 25
			},
			"password": {
				required:true,
				maxlength: 50
			},
			"confirmpassword": {
				required:true,
				maxlength: 50,
				minlength: 5,
				equalTo: "#txtPassword"
			},
			"roleType": {
				required: true
			}
		},
		messages: {
			"firstname": {
				required: "Please enter first name.",
				maxlength: "Name should not exceed 40 characters.",
			},
			"lastname": {
				required: "Please enter last name.",
				maxlength: "Name Password should not exceed 40 characters.",
			},
			"username": {
				required: "Please enter username.",
				maxlength: "Username should not exceed 25 characters.",
			},
			"newPassword": {
				required: "Please enter new password.",
				maxlength: "New Password should not exceed 50 characters.",
				minlength: "New Password should be atleast 5 characters."
			},
			"confirmpassword": {
				required: "Please enter confirm password.",
				maxlength: "Confirm Password should not exceed 50 characters.",
				minlength: "Confirm Password should be at least 5 characters.",
				equalTo: "Please re-enter the correct password"
			},
			"roleType": {
				required: "Please select role type."
			}
		},
		errorElement: 'div',
		wrapper: 'div',
		errorPlacement: function(error, element) {
			error.insertBefore(element).addClass('msgContainer'); // default function
		}
	});
};

var initializeSecurityForm = function(){
	$("#formUserSecurity").validate({
		onkeyup:false,
		onkeydown:false,
		onchange: false,
		onblur:false,
		rules: {
			"susername": {
				required:true,
				maxlength: 25
			},
			"currentPassword": {
				required:true,
				maxlength: 25,
				remote: {
					url: '../checkUserPassword.php',
					type: "post",
					data: {
						susername: function() {
							return $("#txtSUsername").val();
						}
					}
				}
			},
			"newPassword": {
				required:true,
				maxlength: 25,
				minlength: 5
			},
			"confirm_password": {
				required:true,
				maxlength: 25,
				minlength: 5,
				equalTo: "#txtSNewPassword"
			}
		},
		messages: {
			"susername": {
				required: "Please enter username.",
				maxlength: "Username should not exceed 25 characters.",
			},
			"currentPassword": {
				required: "Please enter current password.",
				maxlength: "Current Password should not exceed 25 characters.",
				remote: "Invalid password!"
			},
			"newPassword": {
				required: "Please enter new password.",
				maxlength: "New Password should not exceed 25 characters.",
				minlength: "New Password should be atleast 5 characters."
			},
			"confirm_password": {
				required: "Please enter confirm password.",
				maxlength: "Confirm Password should not exceed 25 characters.",
				minlength: "Confirm Password should be at least 5 characters.",
				equalTo: "Please re-enter the correct password"
			}
		},
		errorElement: 'div',
		wrapper: 'div',
		errorPlacement: function(error, element) {
			error.insertBefore(element).addClass('msgContainer'); // default function
		}
	});	
};

var initUserTable = function(){
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

				$('#selRoleype').val(data[0].role_type);

				$("#txtSUsername").val(data[0].username)
				$("#txtUsername").val(data[0].username).attr('readonly', true);
				$("#txtPassword").val(data[0].password).attr('readonly', true);
				$("#txtConfirmPassword").val(data[0].password).attr('readonly', true);
				$('#divSecurity').hide();

                if(roleType == 'Administrator'){
                    $('#btnRemoveUser').show();
					$('#btnChangePassword').show();
                }
				else {
					// $("#selRoleype option[value='Administrator']").remove();
					$('#btnRemoveUser').hide();
					$('#btnChangePassword').hide();
				}
				
				$('#formUser').valid();
			}
		});
	}
};

var addUpdateUser = function(){
	if($('#formUser').valid()){
		$.post("../userRegistration.php", $("#formUser").serialize()).done(function(msg){
			setUserStatus(true, msg);
			clearUserFields();
			refreshUsersList();
		}).fail(function(error){
			setUserStatus(false, "Save Error: " + error.statusText);
		});
	}
};

var removeUser = function(){
	var id = $("#txtUserId").val();
	if(id){
		$.post("../deleteUser.php", $("#formUser").serialize()).done(function(msg){
			setUserStatus(true, msg);
			clearUserFields();
			refreshUsersList();
		}).fail(function(error){
			setUserStatus(false, "Remove User Error: " + error.statusText);
		});
	}
};

var searchUserList = function(searchKey){
	var url = "../usersList.php";
	if(searchKey) url += "?searchKey=" + searchKey;
	$("#dvList").load(url, function(){
		initUserTable();
	});
};

var refreshUsersList = function(page, sortColumn, order){
	var url = "../usersList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvList").load(url, function(){
		initUserTable();
	});
};

var loadDummyUserInfo = function(){
	$("#txtUserId").val("0");
	$("#txtFirstname").val("wong");
	$("#txtLastname").val("hone");
	$("#txtMiddlename").val("fei");
	$("#txtContactNo").val("(0920) 888-8888");
	$("#txtAddress").val("Davao City, Philippines");
	$("#txtBirthdate").val("02/28/1966");
	$("#rdbGenderMale").attr("checked", "true");
	$('#selRoleype').val('attendant');
	$("#txtUsername").val("wfhong");
	$("#txtPassword").val("password");
	$("#txtConfirmPassword").val("password");
};

var setUserStatus = function(isSuccess, msg){
	var objStatus = $('#spanUserStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
};

var clearUserFields = function(){
	$('input[type="text"], textarea').val("");
	$("#txtUsername").val("").attr('disabled', false);
	$('input[type="password"]').val('').attr('disabled', false);
	$("#txtUsername, #txtPassword, #txtConfirmPassword").attr('readonly', false);
	$('#txtFirstname, #txtLastname').removeClass('error');
	$('#rdbGenderMale').iCheck('check');
	$('#selRoleype').val('');
	$('#divSecurity').show();
	$('#btnRemoveUser, #btnChangePassword').hide();
	$('div.msgContainer').hide();
	clearSecurityDetails();
};

var clearUserStatus = function(){
	var objStatus = $('#spanUserStatus');
	objStatus.removeClass("success").removeClass("error").html("");
	$("input[type='text'], input[type='password'], textarea").css("border", "2px solid #000");
	$('#txtFirstname, #txtLastname, #txtMiddlename').removeClass('error');
};

var clearSearchKeys = function(){
	$('#txtSearchKey').val('');
	refreshUsersList();
};

var clearSecurityDetails = function(){
	$('#txtSCurrentPassword, #txtSNewPassword, #txtSConfirmPassword').val('');
};

var showChangePassword = function(){
	$("#popupSecurity").dialog({
		resizable: false,
		modal: true,
		title: "GRMSys Security",
		height: 350,
		width: 400,
		buttons: {
			"Change Password": function () {
				if($('#formUserSecurity').valid()){
					updateUserPassword();
					$(this).dialog('close');
				}
			},
			"Cancel": function(){
				$(this).dialog('close');
			}
		}
	});
};

var updateUserPassword = function(){
	$.post("../updateUserPassword.php", $("#formUserSecurity").serialize()).done(function(msg){
		setUserStatus(true, msg);
		clearSecurityDetails();
	}).fail(function(error){
		setUserStatus(false, "Login Error: " + error.statusText);
	});
};

var showMessageDialog = function(msg){
	$("#dialog-box").html(msg);
	$("#dialog-box").dialog({
		modal: true,
		title: "GRMSys Security",
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

var showConfirmRemoveUserDialog = function(){
	$("#dialog-box").html('Do you want to remove user?');
	$("#dialog-box").dialog({
		modal: true,
		title: "GRMSys Users",
		resizable: false,
		height: "auto",
		width: "auto",
		buttons: {
			"Remove User": function () {
				removeUser();
				$(this).dialog('close');
			},
			"Cancel": function () {
				$(this).dialog('close');
			},
		}
	});
};