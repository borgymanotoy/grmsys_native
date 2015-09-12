var initWorkoutRegistrationComponents = function (){

	$("div.headerIconLabel").bind("click", function(){
		goToHome();
	});

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

	$('#txtAttendanceSearchKey').bind('keyup', function(){
		var searchkey = $(this).val();
		searchDailyAttendance(searchkey);
	});

	loadServiceType($('#selServiceType'));
	$('#selServiceType').bind('change', function(){
		computeAmountDue();
	});

	$('#txtMemberStart').Zebra_DatePicker({
		direction: true,
		pair: $('#txtMemberEnd'),
		onSelect: function(view, elements) {
			memberMonthlyDatesChanged($(this).val(), $('#txtMemberEnd').val());
		}
	});

	$('#txtMemberEnd').Zebra_DatePicker({
		direction: 1,
		onSelect: function(view, elements) {
			memberMonthlyDatesChanged($('#txtMemberStart').val(), $(this).val());
		}
	});

	$("input").bind("change", function(){
		clearMemberWorkoutStatus();
	});
};

var memberMonthlyDatesChanged = function(strStartDate, strEndDate){
	var loadedMemberId               = $('#hndLoadedMemberId').val();
	var loadedHasDiscount            = $('#hndLoadedHasDiscount').val();
	var stPriceMonthly             = parseFloat($('#hndSTPriceMonthly').val());
	var stPriceDiscountedMonthly   = parseFloat($('#hndSTPriceDiscountedMonthly').val());

	if(loadedMemberId && strStartDate && strEndDate){
		var dtStart = Date.parse(strStartDate);
		var dtEnd = Date.parse(strEndDate);
		if( (0 <= Date.today().compareTo(dtStart)) && (0 >= Date.today().compareTo(dtEnd)) ){
			$('#spnMemberType').html('Monthly');
			$('#hndLoadedMemberType').val('Monthly');
			if(loadedHasDiscount == 'Yes'){
				$('#hndLoadedAmountDue').val(stPriceDiscountedMonthly);
				$("#spanAmountDue").html(stPriceDiscountedMonthly.toFixed(2));
			}
			else{
				$('#hndLoadedAmountDue').val(stPriceMonthly);
				$("#spanAmountDue").html(stPriceMonthly.toFixed(2));
			}
		}	
	}
};

var computeAmountDue = function(){
	var serviceType                  = $('#selServiceType').val();
	var loadedMemberId               = $('#hndLoadedMemberId').val();
	var loadedMemberType             = $('#hndLoadedMemberType').val();
	var loadedHasDiscount            = $('#hndLoadedHasDiscount').val();
	var loadedPriceDaily             = parseFloat($('#hndLoadedPriceDaily').val());
	var loadedPriceDiscountedDaily   = parseFloat($('#hndLoadedPriceDiscountedDaily').val());
	var isActiveMontly               = $("#spnMonthlyStatus").html();

	if(loadedMemberId){
		$.getJSON("../computeAmountDue.php?serviceType=" + serviceType).done(function(data){
			$.each(data, function(i, obj){
				$("#hndSTPriceDaily").val(obj.price_daily);
				$("#hndSTPriceDiscountedDaily").val(obj.price_daily_discounted);
				$("#hndSTPriceMonthly").val(obj.price_monthly);
				$("#hndSTPriceDiscountedMonthly").val(obj.price_monthly_discounted);
	
				if(isActiveMontly == "Yes"){
					var st_price_daily              = parseFloat(obj.price_daily);
					var st_price_daily_discounted   = parseFloat(obj.price_daily_discounted);
					if(loadedMemberType == 'Monthly'){
						if(st_price_daily > loadedPriceDaily){
							var amt = st_price_daily - loadedPriceDaily;
							if(loadedHasDiscount == 'Yes') 
								amt = st_price_daily_discounted - loadedPriceDiscountedDaily;
							else{
								amt = st_price_daily - loadedPriceDaily;
							}
							$("#spanAmountDue").html(amt.toFixed(2));
							$('#hndLoadedAmountDue').val(amt);
						}
						else
							$("#spanAmountDue").html('0.00');
							$('#hndLoadedAmountDue').val('0');
					}
					else {
						if(loadedHasDiscount == 'Yes'){
							$('#hndLoadedAmountDue').val(st_price_daily_discounted);
							$("#spanAmountDue").html(st_price_daily_discounted.toFixed(2));
						}
						else {
							$('#hndLoadedAmountDue').val(st_price_daily);
							$("#spanAmountDue").html(st_price_daily.toFixed(2));
						}
							
					}
				}
				else {		
					var st_price_regular = 0;
					var st_price_discounted = 0;
					if(loadedMemberType == 'Daily'){
						st_price_regular = parseFloat(obj.price_daily);
						st_price_discounted = parseFloat(obj.price_daily_discounted);
					}
					else {
						st_price_regular = parseFloat(obj.price_monthly);
						st_price_discounted = parseFloat(obj.price_monthly_discounted);
					}

					if(loadedHasDiscount == 'Yes'){
						$('#hndLoadedAmountDue').val(st_price_discounted);
						$("#spanAmountDue").html(st_price_discounted.toFixed(2));
					}
					else {
						$('#hndLoadedAmountDue').val(st_price_regular);
						$("#spanAmountDue").html(st_price_regular.toFixed(2));
					}
				}
			});
		});
	}

};

var loadMemberDetails = function(id){
	if(id){
		clearDetails();
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

				$('#hndLoadedMemberType').val(data[0].member_type);
				$('#spnMemberType').html(data[0].member_type);
				$('#hndLoadedHasDiscount').val(data[0].has_discount);
				$('#spnHasDiscount').html(data[0].has_discount);
				$('#selServiceType, #hndLoadedServiceType').val(data[0].service_type_code);
				$("#hndLoadedMStartDate").val(data[0].monthly_startdate);
				$("#hndLoadedMEndDate").val(data[0].monthly_enddate);

				if(data[0].member_type == "Monthly"){
					$("#txtMemberStart").val(data[0].monthly_startdate).attr("disabled", "disabled");
					$("#txtMemberEnd").val(data[0].monthly_enddate).attr("disabled", "disabled");
				}
				else {
					$("#txtMemberStart").val('').removeAttr("disabled");
					$("#txtMemberEnd").val('').removeAttr("disabled");
				}

				$("#hndLoadedPriceDaily, #hndSTPriceDaily").val(data[0].price_daily);
				$("#hndLoadedPriceDiscountedDaily, #hndSTPriceDiscountedDaily").val(data[0].price_daily_discounted);
				$("#hndLoadedPriceMonthly, #hndSTPriceMonthly").val(data[0].price_monthly);
				$("#hndLoadedPriceDiscountedMonthly, #hndSTPriceDiscountedMonthly").val(data[0].price_monthly_discounted);

				$("#hndLoadedAmountDue").val(data[0].amount_due);
				$("#hndLoadedMonthlyStatus").val(data[0].member_type == 'Monthly' ? 'Yes' : 'No');
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

var registerMemberWorkout = function(){
	if($('#hndLoadedMemberId').val() && !$('#hndLoadedWorkoutId').val()){
		$.post("../memberWorkoutRegistration.php", $("#formWorkoutRegistration").serialize()).done(function(msg){
			setMemberWorkoutStatus(true, msg);
			clearDetails();
			refreshAttendanceList();
		}).fail(function(error){
			setMemberWorkoutStatus(false, "Save Workout Registration Error: " + error.statusText);
		});
	}
}

var searchDailyAttendance = function(searchKey){
	var url = "../workoutLogList.php";
	if(searchKey) url += "?searchKey=" + searchKey;
	$("#dvList").load(url, function(){
		initWorkoutLogTable();
	});
};

var refreshAttendanceList = function(page, sortColumn, order){
	var url = "../workoutLogList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvList").load(url, function(){
		initWorkoutLogTable();
	});
};

var initWorkoutLogTable = function(){
	$("table.workoutLogTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});

	$("table.workoutLogTable tr:odd").addClass("odd");
	$("table.workoutLogTable tr:even").addClass("even");
	
	$("table.workoutLogTable tr td").on("click", function(){
		var id = $(this).parent().find(":first-child").html();
		loadMemberWorkoutDetails(id);
	});	
};

var loadMemberWorkoutDetails = function(id){
	if(id){
		$.getJSON("../getWorkoutDetails.php?id=" + id, function(data){
			if(data[0]){
				$('#hndLoadedWorkoutId').val(data[0].id);
				$("#txtMemberId, #hndLoadedMemberId").val(data[0].member_id);
				$("#txtFirstname").val(data[0].firstname);
				$("#txtLastname").val(data[0].lastname);
				$("#txtMiddlename").val(data[0].middlename);
				$("#txtContactNo").val(data[0].contactno);
				$("#txtAddress").val(data[0].address);
				$("#txtBirthday").val(data[0].birthdate);
				$("#txtMemberGender").val(data[0].gender == 'M' ? 'Male' : 'Female');

				$('#hndLoadedMemberType').val(data[0].member_type);
				$('#spnMemberType').html(data[0].member_type);
				$('#hndLoadedHasDiscount').val(data[0].has_discount);
				$('#spnHasDiscount').html(data[0].has_discount);
				$('#selServiceType, #hndLoadedServiceType').val(data[0].service_type_code);
				$("#hndLoadedMStartDate").val(data[0].monthly_startdate);
				$("#hndLoadedMEndDate").val(data[0].monthly_enddate);

				if(data[0].member_type == "Monthly"){
					$("#txtMemberStart").val(data[0].monthly_startdate).attr("disabled", "disabled");
					$("#txtMemberEnd").val(data[0].monthly_enddate).attr("disabled", "disabled");
				}
				else {
					$("#txtMemberStart").val('').removeAttr("disabled");
					$("#txtMemberEnd").val('').removeAttr("disabled");
				}

				$("#hndLoadedPriceDaily, #hndSTPriceDaily").val(data[0].price_daily);
				$("#hndLoadedPriceDiscountedDaily, #hndSTPriceDiscountedDaily").val(data[0].price_daily_discounted);
				$("#hndLoadedPriceMonthly, #hndSTPriceMonthly").val(data[0].price_monthly);
				$("#hndLoadedPriceDiscountedMonthly, #hndSTPriceDiscountedMonthly").val(data[0].price_monthly_discounted);

				$("#hndLoadedAmountDue").val(data[0].rendered_amount);
				$("#hndLoadedMonthlyStatus").val(data[0].member_type == 'Monthly' ? 'Yes' : 'No');
				$("#spnMonthlyStatus").html(data[0].member_type == 'Monthly' ? 'Yes' : 'No');
				var amount_due = parseFloat(data[0].rendered_amount).toFixed(2);
				$("#spanAmountDue").html(amount_due);

				$('#txtRemarks').val(data[0].other_info);

				if(data[0].paid == "paid"){
					$("#chkPaid").iCheck("check").iCheck('disable');
				}
				else {
					$("#chkPaid").iCheck("uncheck").iCheck('disable');
				}
			}
		});
	}	
};

var setMemberWorkoutStatus = function(isSuccess, msg){
	var objStatus = $('#spanMemberWorkoutStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
};

var clearMemberWorkoutStatus = function(){
	var objStatus = $('#spanMemberWorkoutStatus');
	objStatus.removeClass("success").removeClass("error").html("");
};

var clearSearchKeys = function(){
	$('#txtSearchKey').val('').focus();
};

var clearSearchAttendance = function(){
	$('#txtAttendanceSearchKey').val('').focus();
};

var clearDetails = function(){
	$('#hndLoadedWorkoutId').val('');
	$('#txtSearchKey').val('');
	$("#txtMemberId, #hndLoadedMemberType").val('');
	$("#txtFirstname").val('');
	$("#txtLastname").val('');
	$("#txtMiddlename").val('');
	$("#txtContactNo").val('');
	$("#txtAddress").val('');
	$("#txtBirthday").val('');
	$("#txtMemberGender").val('');
	
	$('#hndLoadedMemberId').val("Daily");
	$('#spnMemberType, #hndLoadedMemberId').html("Daily");
	$('#hndLoadedHasDiscount').val("No");
	$('#spnHasDiscount, #hndLoadedHasDiscount').html("No");
	$('#hndLoadedServiceType').val("");
	$('#selServiceType').val("-1");
	$("#txtMemberStart, #hndLoadedMStartDate").val("");
	$("#txtMemberEnd, #hndLoadedMEndDate").val("");

	$('#txtMemberStart').removeAttr("disabled");
	$('#txtMemberEnd').removeAttr("disabled");

	$("#hndLoadedMonthlyStatus").val("No");
	$("#spnMonthlyStatus").html("No");
	$("#hndLoadedPriceDaily, #hndLoadedPriceDiscountedDaily, #hndLoadedPriceMonthly, #hndLoadedPriceDiscountedMonthly").val('');
	$("#hndSTPriceDaily, #hndSTPriceDiscountedDaily, #hndSTPriceMonthly, #hndSTPriceDiscountedMonthly").val('');
	$("#hndLoadedAmountDue").html("0");
	$("#spanAmountDue").html("0.00");
	$('#txtRemarks').val('');

	$("#chkPaid").iCheck("uncheck").iCheck('enable');
};