var initAttendancePageComponents = function(){
	$('#txtLogDate').Zebra_DatePicker({
		direction: false,
		onSelect: function(view, elements) {
			reloadWorkoutTable($(this).val());
		}
	});

	$('#imgPrintIcon').bind("click", function(){
		$("#dvPrintable").print({
			stylesheet : 'resources/css/reportSmallFonts.css'
		});
	});
};

var reloadWorkoutTable = function(strDate){
	var url = "../attendanceList.php";
	if(strDate) url += "?log_date=" + strDate;
	$("#dvList").load(url, function(){
		initAttendanceTable();
	});
};
		
var initAttendanceTable = function(){
	$("table.attendanceTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});

	$("table.attendanceTable tr:odd").addClass("odd");
	$("table.attendanceTable tr:even").addClass("even");
};