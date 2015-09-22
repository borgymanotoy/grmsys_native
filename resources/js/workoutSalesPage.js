var initWorkoutSalesComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			reloadWorkoutSalesTable($(this).val());
		}
	});

	$('#imgPrintIcon').bind("click", function(){
		alert('Please select \'Landscape\' Paper Orientation in the Printer Properties to display the report correctly.');
		$("#dvPrintable").print({
			stylesheet : 'resources/css/reportSmallFonts.css'
		});
	});
};

var reloadWorkoutSalesTable = function(strDate){
	var url = "../workoutSalesList.php";
	if(strDate) url += "?log_date=" + strDate;
	$("#dvList").load(url, function(){
		initWorkoutSalesTable();
		loadFitnessDailyTotalSales(strDate);
		loadFitnessMonthlyTotalSales(strDate);
	});
};
		
var initWorkoutSalesTable = function(){
	/*
	$("table.workoutSalesTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});
	*/

	$("table.workoutSalesTable tr:odd").addClass("odd");
	$("table.workoutSalesTable tr:even").addClass("even");
};

var loadFitnessDailyTotalSales = function(strDate){
	var url = "../getFitnessDailySalesTotal.php";
	if(strDate) url += "?log_date=" + strDate;
	$.getJSON(url, function(data){
		if(data[0]){
			var amt = parseFloat(data[0].daily_sales);
			$('#spanTotalDailyFitnessSales').html(numberWithCommas(amt.toFixed(2)));
		}
	});
};

var loadFitnessMonthlyTotalSales = function(strMonthYear){
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