var initItemSalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			var date = $(this).val();
			var selectedDate = Date.parse(date);

			var firstDateOfMonth = Date.parse(date);
			var lastDateOfMonth = Date.parse(date);
			firstDateOfMonth.moveToFirstDayOfMonth();
			lastDateOfMonth.moveToLastDayOfMonth();
			
			var weekMonday = Date.parse(date);
			if (!weekMonday.is().monday()) {
				weekMonday.last().monday();
			}
			var weekSunday = Date.parse(weekMonday.toString("MM-dd-yyyy")).sunday();
			
			//console.info("date: " + selectedDate);
			console.info("selected-date: " + selectedDate.toString("MM-dd-yyyy"));
			console.info("monday: " + weekMonday.toString("MM-dd-yyyy"));
			console.info("sunday: " + weekSunday.toString("MM-dd-yyyy"));

			reloadItemDailySalesTable(date);
		}
	});	
};

var initItemWeeklySalesComponents = function(){
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

			console.info("monday: " + weekMonday.toString("MM-dd-yyyy"));
			console.info("sunday: " + weekSunday.toString("MM-dd-yyyy"));

			reloadItemWeeklySalesTable(dateStart, dateEnd);
		}
	});	
};

var initItemMonthlySalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			var date = $(this).val();
			var firstDateOfMonth = Date.parse(date);
			var lastDateOfMonth = Date.parse(date);
			firstDateOfMonth.moveToFirstDayOfMonth();
			lastDateOfMonth.moveToLastDayOfMonth();

			console.info("month-first-date: " + firstDateOfMonth.toString("MM-dd-yyyy"));
			console.info("month-last-date: " + lastDateOfMonth.toString("MM-dd-yyyy"));

			var dateStart = firstDateOfMonth.toString("MM-dd-yyyy");
			var dateEnd = lastDateOfMonth.toString("MM-dd-yyyy");

			reloadItemMonthlySalesTable(dateStart, dateEnd);
		}
	});	
};

var reloadItemDailySalesTable = function(strDate){
	var url = "../itemSellList.php";
	if(strDate) url += "?log_date=" + strDate;
	$("#dvList").load(url, function(){
		initItemSalesTable();
		loadItemDailySales(strDate);
	});
};

var reloadItemWeeklySalesTable = function(dateStart, dateEnd){
	var url = "../itemSellWeeklyList.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$("#dvList").load(url, function(){
		initItemSalesTable();
		loadItemWeeklySales(dateStart, dateEnd);
	});
};

var reloadItemMonthlySalesTable = function(dateStart, dateEnd){
	var url = "../itemSellMonthlyList.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$("#dvList").load(url, function(){
		initItemSalesTable();
		loadItemMonthlySales(dateStart, dateEnd);
	});
};
		
var initItemSalesTable = function(){
	$("table.itemSoldTable tr:odd").addClass("odd");
	$("table.itemSoldTable tr:even").addClass("even");
};

var loadItemDailySales = function(strDate){
	var url = "../getItemDailySalesTotal.php";
	if(strDate) url += "?log_date=" + strDate;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalDailyProductItemsSales').html(numberWithCommas(amt.toFixed(2)));				
			}
		}
		else {
			$('#spanTotalDailyProductItemsSales').html('0.00');
		}
	});
};

var loadItemWeeklySales = function(dateStart, dateEnd){
	var url = "../getItemWeeklySalesTotal.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalWeeklyProductItemsSales').html(numberWithCommas(amt.toFixed(2)));
			}
			else {
				$('#spanTotalWeeklyProductItemsSales').html('0.00');
			}
		}
	});
};

var loadItemMonthlySales = function(dateStart, dateEnd){
	var url = "../getItemMonthlySalesTotal.php";
	if(dateStart && dateEnd) url += "?start_date=" + dateStart + "&end_date=" + dateEnd;
	$.getJSON(url, function(data){
		if(data[0]){
			if(data[0].total_sales){
				var amt = parseFloat(data[0].total_sales);
				$('#spanTotalMonthlyProductItemsSales').html(numberWithCommas(amt.toFixed(2)));
			}
			else {
				$('#spanTotalMonthlyProductItemsSales').html('0.00');
			}
		}
	});
};