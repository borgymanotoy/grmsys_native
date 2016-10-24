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
    var selDate = Date.parse(strDate);
    var month_year = new Date(selDate).toString("MMMM-yyyy");
    var url = "../workoutSalesList.php";
    if(strDate) url += "?log_date=" + strDate;
    $("#dvList").load(url, function(){
        initWorkoutSalesTable();
        loadFitnessDailyTotalSales(strDate);
        loadFitnessMonthlyTotalSales(month_year);
    });
};

var initWorkoutSalesTable = function(){
    //*
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
    //*/

    $("table.workoutSalesTable tr:odd").addClass("odd");
    $("table.workoutSalesTable tr:even").addClass("even");
};

var loadFitnessDailyTotalSales = function(strDate){
    var url = "../getFitnessDailySalesTotal.php";
    if(strDate) url += "?log_date=" + strDate;
    $.getJSON(url, function(data){
        if(data){
            var amt = parseFloat(data.daily_sales);
            $('#spanTotalDailyFitnessSales').html(numberWithCommas(amt.toFixed(2)));
        }
        else {
            $('#spanTotalDailyFitnessSales').html("0.00");
        }
    }).error(function(){
        $('#spanTotalDailyFitnessSales').remove();
    });
};

var loadFitnessMonthlyTotalSales = function(strMonthYear){
    var s_year = Date.parse(strMonthYear).toString('yyyy');

    if(s_year < 2015)
        strMonthYear = Date.parse('now').toString('MMMM-yyyy');

    var url = "../getFitnessMonthlySalesTotal.php";
    if(strMonthYear) url += "?month_year=" + strMonthYear;
    $.getJSON(url, function(data){
        if(data){
            $('#spanReportMonthYear').html(data.sales_group);
            var amt = parseFloat(data.monthly_sales);
            $('#spanTotalFitnessMonthlySales').html(numberWithCommas(amt.toFixed(2)));
        }
        else {
            $('#spanReportMonthYear').html(strMonthYear);
            $('#spanTotalFitnessMonthlySales').html("0.00");
        }
    });
};