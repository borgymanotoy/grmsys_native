var initWorkoutSalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			var date = $(this).val();
			reloadWorkoutDailySalesTable(date);
		}
	});

	$('#imgPrintIcon').bind("click", function(){
		$("#dvPrintable").print({
			stylesheet : 'resources/css/reports.css'
		});
	});
};

var initWorkoutWeeklySalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			var date = $(this).val();
			var weekMonday = Date.parse(date);
			if (!weekMonday.is().monday()) {
				weekMonday.last().monday();
			}
			var weekSunday = Date.parse(weekMonday.toString("MM-dd-yyyy")).sunday();			
			var dateStart = weekMonday.toString("MM-dd-yyyy");
			var dateEnd = weekSunday.toString("MM-dd-yyyy");
			reloadWorkoutWeeklySalesTable(dateStart, dateEnd);
		}
	});

	$('#imgPrintIcon').bind("click", function(){
		$("#dvPrintable").print({
			stylesheet : 'resources/css/reports.css'
		});
	});	
};

var initWorkoutMonthlySalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			var date = $(this).val();
			var firstDateOfMonth = Date.parse(date);
			var lastDateOfMonth = Date.parse(date);
			firstDateOfMonth.moveToFirstDayOfMonth();
			lastDateOfMonth.moveToLastDayOfMonth();
			var dateStart = firstDateOfMonth.toString("MM-dd-yyyy");
			var dateEnd = lastDateOfMonth.toString("MM-dd-yyyy");
			reloadWorkoutMonthlySalesTable(dateStart, dateEnd);
		}
	});

	$('#imgPrintIcon').bind("click", function(){
		$("#dvPrintable").print({
			stylesheet : 'resources/css/reports.css'
		});
	});	
};

var reloadWorkoutDailySalesTable = function(strDate){
	var url = "../workoutDailySalesList.php";
	if(strDate) url += "?log_date=" + strDate;
	$("#dvList").load(url, function(){

		var title = "Fitness Sales Daily List";
		if(strDate) title += " (" + strDate + ")";
		$('table.workoutSalesTable > caption').html(title);

		loadWorkoutDailySales(strDate);
	});
};

var reloadWorkoutWeeklySalesTable = function(dateStart, dateEnd){
	var url = "../workoutWeeklySalesList.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$("#dvList").load(url, function(){

		var title = "Fitness Weekly Sales";
		if(dateStart && dateEnd) title += " (" + dateStart + " to " + dateEnd + ")";
		$('table.weeklyWorkoutSalesTable > caption').html(title);

		loadWorkoutWeeklySales(dateStart, dateEnd);
	});
};

var reloadWorkoutMonthlySalesTable = function(dateStart, dateEnd){
	var url = "../workoutMonthlySalesList.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$("#dvList").load(url, function(){

		var title = "Fitness Monthly Sales";
		if(dateStart && dateEnd) title += " (" + dateStart + " to " + dateEnd + ")";
		$('table.weeklyWorkoutSalesTable > caption').html(title);

		loadWorkoutMonthlySales(dateStart, dateEnd);
	});
};

var loadWorkoutDailySales = function(strDate){
	var url = "../getWorkoutDailySalesTotal.php";
	if(strDate) url += "?log_date=" + strDate;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalDailyWorkoutSales').html(numberWithCommas(amt.toFixed(2)));				
			}
		}
		else {
			$('#spanTotalDailyWorkoutSales').html('0.00');
		}
	});
};

var loadWorkoutWeeklySales = function(dateStart, dateEnd){
	var url = "../getWorkoutWeeklySalesTotal.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalWeeklyWorkoutSales').html(numberWithCommas(amt.toFixed(2)));
			}
			else {
				$('#spanTotalWeeklyWorkoutSales').html('0.00');
			}
		}
	});
};

var loadWorkoutMonthlySales = function(dateStart, dateEnd){
	var url = "../getWorkoutMonthlySalesTotal.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalMonthlyWorkoutSales').html(numberWithCommas(amt.toFixed(2)));
			}
			else {
				$('#spanTotalMonthlyWorkoutSales').html('0.00');
			}
		}
	});
};