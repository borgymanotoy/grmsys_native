var initMemberComponents = function(){

	$("div.headerIconLabel").bind("click", function(){
		goToHome();
	});

	$("#txtContactNo, #txtEmergencyContactNumber").mask("(000) 000-0000");
	$('.myRadioButtons').iCheck({ radioClass: 'iradio_flat-red' });

	$('#txtBirthday').Zebra_DatePicker();
	$('#txtMemberStart').Zebra_DatePicker({
		direction: true,
		pair: $('#txtMemberEnd')
	});
	$('#txtMemberEnd').Zebra_DatePicker({
		direction: 1
	});

	loadServiceType($('#selServiceType'));

	$("input").bind("change", function(){
		clearMemberStatus();
	});
	
	$('#selServiceType').val('weights');

	$('#btnRemoveMember').hide();

	$('#txtSearchKey').bind('keyup', function(){
		var searchkey = $(this).val();
		searchMemberList(searchkey);
	});

	initializeMemberForm();
};

var initMemberTable = function(){
	$("table.membersTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});

	$("table.membersTable tr:odd").addClass("odd");
	$("table.membersTable tr:even").addClass("even");
	
	$("table.membersTable tr td").on("click", function(){
		var id = $(this).parent().find(":first-child").html();
		loadMemberDetails(id);
	});	
};

var initializeMemberForm = function(){
	$("#formMember").validate({
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
			"emergencyContactPerson": {
				required:true,
				maxlength: 100
			},
			"emergencyContactNumber": {
				required:true,
				maxlength: 100
			},
			"emergencyContactRelationship": {
				required:true,
				maxlength: 100
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
			"emergencyContactPerson": {
				required: "Please enter username.",
				maxlength: "Username should not exceed 100 characters.",
			},
			"emergencyContactNumber": {
				required: "Please enter new password.",
				maxlength: "New Password should not exceed 100 characters."
			},
			"emergencyContactRelationship": {
				required: "Please enter confirm password.",
				maxlength: "Confirm Password should not exceed 100 characters."
			}
		},
		errorElement: 'div',
		wrapper: 'div',
		errorPlacement: function(error, element) {
			error.insertBefore(element).addClass('msgContainer'); // default function
		}
	});
};

var loadMemberDetails = function(id){
	if(id){
		$.getJSON("../getMemberDetails.php?id=" + id, function(data){
			if(data[0]){
				$("#txtMemberId").val(data[0].member_id);
				$("#txtFirstname").val(data[0].firstname);
				$("#txtLastname").val(data[0].lastname);
				$("#txtMiddlename").val(data[0].middlename);
				$("#txtContactNo").val(data[0].contactno);
				$("#txtAddress").val(data[0].address);
				$("#txtBirthday").val(data[0].birthdate);
				
				if(data[0].gender == 'M')
					$("#rdbGenderMale").iCheck('check');
				else
					$("#rdbGenderFemale").iCheck('check');

				$("#txtEmergencyContactPerson").val(data[0].emergency_contact_person);
				$("#txtEmergencyContactNumber").val(data[0].emergency_contact_number);
				$("#txtEmergencyContactRelationship").val(data[0].emergency_contact_relationship);
				
				if(data[0].membership_type == 'Daily')
					$("#rdbTypeWalkin").iCheck('check');
				else
					$("#rdbTypeMonthly").iCheck('check');
					
				if(data[0].has_discount == 'Yes')
					$("#rdbDiscountYes").iCheck('check');
				else
					$("#rdbDiscountNo").iCheck('check');

				$('#selServiceType').val(data[0].service_type_code);
				$("#txtMemberStart").val(data[0].monthly_startdate);
				$("#txtMemberEnd").val(data[0].monthly_enddate);

				if(roleType == 'administrator'){
					$('#btnRemoveMember').show();
				}
			}
		});
	}
};

var addUpdateMember = function(){
	if($('#formMember').valid()){
		$.post("../memberRegistration.php", $("#formMember").serialize()).done(function(msg){
			setMemberStatus(true, msg);
			clearMemberFields();
			refreshMembersList();
		}).fail(function(error){
			setMemberStatus(false, "Save Member Error: " + error.statusText);
		});
	}
};

var removeMember = function(){
	var id = $("#txtMemberId").val();
	if(id){
		$.post("../deleteMember.php", $("#formMember").serialize()).done(function(msg){
			setMemberStatus(true, msg);
			clearMemberFields();
			refreshMembersList();
		}).fail(function(error){
			setMemberStatus(false, "Remove Member Error: " + error.statusText);
		});
	}
};

var searchMemberList = function(searchKey){
	var url = "../membersList.php";
	if(searchKey) url += "?searchKey=" + searchKey;
	$("#dvList").load(url, function(){
		initMemberTable();
	});
};

var refreshMembersList = function(page, sortColumn, order){
	var url = "../membersList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvList").load(url, function(){
		initMemberTable();
	});
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
	$('#btnRemoveMember').hide();
};

var clearSearchKeys = function(){
	$('#txtSearchKey').val('');
	refreshMembersList();
};

var clearMemberStatus = function(){
	var objStatus = $('#spanMemberStatus');
	objStatus.removeClass("success").removeClass("error").html("");
};

var setMemberStatus = function(isSuccess, msg){
	var objStatus = $('#spanMemberStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
};

var showConfirmRemoveMemberDialog = function(){
	$("#dialog-box").html('Do you want to remove member?');
	$("#dialog-box").dialog({
		modal: true,
		title: "GRMSys Members",
		resizable: false,
		height: "auto",
		width: "auto",
		buttons: {
			"Remove Member": function () {
				removeMember();
				$(this).dialog('close');
			},
			"Cancel": function () {
				$(this).dialog('close');
			},
		}
	});
};