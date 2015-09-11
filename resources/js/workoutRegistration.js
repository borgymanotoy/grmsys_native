var initWorkoutRegistrationComponents = function (){
	$('#dialog-box').hide();

	$(".myCheckboxes").iCheck({ checkboxClass: 'icheckbox_flat-red' });
	
	$('#txtSearchKey').autocomplete({
		source:'searchMember.php', 
		minLength:3,
		select: function(event,ui){
			event.preventDefault();
			$(this).val(ui.item.label);
			
			var id = ui.item.value;
			if(id) loadMemberDetails(id);
		},
		focus: function(event,ui){
			event.preventDefault();
			$(this).val(ui.item.label);
		},
		// optional
		html: true, 
		// optional (if other layers overlap the autocomplete list)
		open: function(event, ui) {
			$(".ui-autocomplete").css("z-index", 1000);
		}
	});

	$("div.headerIconLabel").bind("click", function(){
		goToHome();
	});

	$('#txtMemberStart').Zebra_DatePicker({
		direction: true,
		pair: $('#txtMemberEnd')
	});
	$('#txtMemberEnd').Zebra_DatePicker({
		direction: 1
	});
};

var loadMemberDetails = function(id){
	if(id){
		$.getJSON("../getMemberDetails.php?id=" + id, function(data){
			if(data[0]){
				$("#txtMemberId, #hndLoadedMemberId").val(data[0].member_id);
				$("#txtFirstname").val(data[0].firstname);
				$("#txtLastname").val(data[0].lastname);
				$("#txtMiddlename").val(data[0].middlename);
				$("#txtContactNo").val(data[0].contactno);
				$("#txtAddress").val(data[0].address);
				$("#txtBirthday").val(data[0].birthdate);
				$("#txtMemberGender").val(data[0].gender == 'M' ? 'Male' : 'Female');

				$('#spnMemberType').html(data[0].member_type);
				$('#spnHasDiscount').html(data[0].has_discount);
				$('#selServiceType, #hndLoadedServiceType').val(data[0].service_type_code);
				$("#txtMemberStart, #hndLoadedMStartDate").val(data[0].monthly_startdate);
				$("#txtMemberEnd, #hndLoadedMEndDate").val(data[0].monthly_enddate);
				
				$("#hndLoadedAmountDue").val(data[0].amount_due);
				$("#spnMonthlyStatus").html(data[0].member_type == 'Monthly' ? 'Yes' : 'No');
				var amount_due = parseFloat(data[0].amount_due).toFixed(2);
				$("#spanAmountDue").html(amount_due);
				
				if(data[0].amount_due <= 0){
					$("#chkPaid").iCheck("uncheck").iCheck('disable');
				}
				else {
					$("#chkPaid").iCheck('enable');
				}
			}
		});
	}
};

var clearSearchKeys = function(){
	$('#txtSearchKey').val('');
};

var clearDetails = function(){
	$('#txtSearchKey').val('');
	$("#txtMemberId, #hndLoadedMemberId").val('');
	$("#txtFirstname").val('');
	$("#txtLastname").val('');
	$("#txtMiddlename").val('');
	$("#txtContactNo").val('');
	$("#txtAddress").val('');
	$("#txtBirthday").val('');
	$("#txtMemberGender").val('');
	
	$('#spnMemberType').html("Daily");
	$('#spnHasDiscount').html("No");
	$('#selServiceType, #hndLoadedServiceType').val("");
	$("#txtMemberStart, #hndLoadedMStartDate").val("");
	$("#txtMemberEnd, #hndLoadedMEndDate").val("");
	
	$("#spnMonthlyStatus").html("No");
	$("#spanAmountDue").html("0.00");
};