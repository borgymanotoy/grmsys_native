var initMemberComponents = function(){

	$("#txtContactNo, #txtEmergencyContactNumber").mask("(000) 000-0000");

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

	$('#btnRemoveMember').hide();
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
				
				if(data[0].membership_type == 'walk-in')
					$("#rdbTypeWalkin").iCheck('check');
				else
					$("#rdbTypeMonthly").iCheck('check');
					
				if(data[0].has_discount == 'Yes')
					$("#rdbDiscountYes").iCheck('check');
				else
					$("#rdbDiscountNo").iCheck('check');
					
				$('#selServiceType').val(data[0].service_type);
				$("#txtMemberStart").val(data[0].monthly_startdate);
				$("#txtMemberEnd").val(data[0].monthly_enddate);

				$('#btnRemoveMember').show();
			}
		});
	}
};

var addUpdateMember = function(){
	$.post("../memberRegistration.php", $("#formMember").serialize()).done(function(msg){
		setMemberStatus(true, msg);
		clearMemberFields();
		refreshMembersList();
	}).fail(function(){
		setMemberStatus(false, "Error adding/updating member.");
	});
};

var removeMember = function(){
	var id = $("#txtMemberId").val();
	if(id){
		console.log("Remove Member: " + id);
	}
};

var refreshMembersList = function(page, sortColumn, order){
	var url = "../membersList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvMemberListContainer").load(url, function(){
		initMemberComponents();
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