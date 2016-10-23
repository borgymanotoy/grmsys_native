var initAttendancePageComponents = function(){

    $('#txtDateStart').Zebra_DatePicker({
        direction: -1,
        pair: $('#txtDateEnd'),
        onSelect: function(view, elements) {
            $('#txtDateEnd').val('');
            refreshWorkoutTableByDateRange();
        }
    });

    $('#txtDateEnd').Zebra_DatePicker({
        direction: true,
        pair: false,
        onSelect: function(view, elements) {
            refreshWorkoutTableByDateRange();
        }
    });

    $('#imgPrintIcon').bind("click", function(){
        $("#dvPrintable").print({
            stylesheet : 'resources/css/reportSmallFonts.css'
        });
    });
};

var initMemberAttendancePageComponents = function(){
    $('#txtMemberAttendance').on('keyup', function(){
        var searchkey = $(this).val();
        searchMemberAttendancePageList(searchkey);
    });

    $('#imgPrintIcon').bind("click", function(){
        $("#dvPrintable").print({
            stylesheet : 'resources/css/reportSmallFonts.css'
        });
    });
};

var refreshWorkoutTableByDateRange = function(){
    var start = $('#txtDateStart').val();
    var end = $('#txtDateEnd').val();
    if(start && end){
        var url = "../attendanceList.php?startDate=" + start + "&endDate=" + end;
        $("#dvList").load(url, function(){
            initAttendanceTable();
        });
    }
};

var searchMemberAttendancePageList = function(searchKey){
    if(searchKey && 2 < searchKey.length){
        var url = "../memberAttendancePageList.php";
        if(searchKey) url += "?searchKey=" + searchKey;
        $("#dvList").load(url, function(){
            initAttendanceTable();
        });
    }
    else {
    	$("table.attendanceTable > tbody").empty();
    }
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