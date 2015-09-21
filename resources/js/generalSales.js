var initGeneralSalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			var date = $(this).val();
			reloadGeneralDailySalesTable(date);
		}
	});	
};

var initGeneralWeeklySalesComponents = function(){
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
			reloadGeneralWeeklySalesTable(dateStart, dateEnd);
		}
	});	
};

var initGeneralMonthlySalesComponents = function(){
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
			reloadGeneralMonthlySalesTable(dateStart, dateEnd);
		}
	});	
};

var reloadGeneralDailySalesTable = function(strDate){
	var url = "../generalDailySalesList.php";
	if(strDate) url += "?log_date=" + strDate;
	$("#dvList").load(url, function(){
		var title = "Gym Daily Sales";
		if(strDate) title += " (" + strDate + ")";
		$('table.generalSalesTable > caption').html(title);
		loadGeneralDailySales(strDate);
	});
};

var reloadGeneralWeeklySalesTable = function(dateStart, dateEnd){
	var url = "../generalWeeklySalesList.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$("#dvList").load(url, function(){
		var title = "Gym Weekly Sales";
		if(dateStart && dateEnd) title += " (" + dateStart + " to " + dateEnd + ")";
		$('table.weeklyGeneralSalesTable > caption').html(title);
		loadGeneralWeeklySales(dateStart, dateEnd);
	});
};

var reloadGeneralMonthlySalesTable = function(dateStart, dateEnd){
	var url = "../generalMonthlySalesList.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$("#dvList").load(url, function(){
		var title = "Gym Monthly Sales";
		if(dateStart && dateEnd) title += " (" + dateStart + " to " + dateEnd + ")";
		$('table.monthlyGeneralSalesTable > caption').html(title);
		loadGeneralMonthlySales(dateStart, dateEnd);
	});
};

var loadGeneralDailySales = function(strDate){
	var url = "../getGeneralDailySalesTotal.php";
	if(strDate) url += "?log_date=" + strDate;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalDailyGeneralSales').html(numberWithCommas(amt.toFixed(2)));				
			}
		}
		else {
			$('#spanTotalDailyGeneralSales').html('0.00');
		}
	});
};

var loadGeneralWeeklySales = function(dateStart, dateEnd){
	var url = "../getGeneralWeeklySalesTotal.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalWeeklyGeneralSales').html(numberWithCommas(amt.toFixed(2)));
			}
			else {
				$('#spanTotalWeeklyGeneralSales').html('0.00');
			}
		}
	});
};

var loadGeneralMonthlySales = function(dateStart, dateEnd){
	var url = "../getGeneralMonthlySalesTotal.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalMonthlyGeneralSales').html(numberWithCommas(amt.toFixed(2)));
			}
			else {
				$('#spanTotalMonthlyGeneralSales').html('0.00');
			}
		}
	});
};