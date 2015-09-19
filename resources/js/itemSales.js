var initItemSalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			reloadItemDailySalesTable($(this).val());
		}
	});	
};

var reloadItemDailySalesTable = function(strDate){
	var url = "../workoutSalesList.php";
	if(strDate) url += "?log_date=" + strDate;
	$("#dvList").load(url, function(){
		initWorkoutSalesTable();
		loadItemDailySales(strDate);
		//loadItemMonthlySales(strDate);
	});
};
		
var initItemSalesTable = function(){
	$("table.itemSoldTable tr:odd").addClass("odd");
	$("table.itemSoldTable tr:even").addClass("even");
};

var loadItemDailySales = function(strDate){
	var url = "../getFitnessDailySalesTotal.php";
	if(strDate) url += "?log_date=" + strDate;
	$.getJSON(url, function(data){
		if(data[0]){
			var amt = parseFloat(data[0].daily_sales);
			$('#spanTotalDailyFitnessSales').html(numberWithCommas(amt.toFixed(2)));
		}
	});
};

var loadItemMonthlySales = function(strMonthYear){
	var url = "../getFitnessMonthlySalesTotal.php";
	if(strMonthYear) url += "?month_year=" + strMonthYear;
	$.getJSON(url, function(data){
		if(data[0]){
			$('#spanReportMonthYear').html(data[0].sales_group);
			var amt = parseFloat(data[0].monthly_sales);
			$('#spanTotalFitnessMonthlySales').html(numberWithCommas(amt.toFixed(2)));
		}
	});
};