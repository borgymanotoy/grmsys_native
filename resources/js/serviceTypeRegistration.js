var initServiceTypeComponents = function(){
	$("div.headerIconLabel").bind("click", function(){
		goToHome();
	});
	$("input").bind("change", function(){
		clearServiceTypeStatus();
	});
	$('.currency').autoNumeric('init');
	$('#btnRemoveServiceType').hide();

	$('#txtSearchKey').bind('keyup', function(){
		var searchkey = $(this).val();
		searchServiceTypeList(searchkey);
	});

	initializeServiceTypeForm();
};

var initializeServiceTypeForm = function(){
	$("#formServiceType").validate({
		onkeyup:false,
		onkeydown:false,
		onchange: false,
		onblur:false,
		rules: {
			"typeCode": {
				required:true,
				maxlength: 20
			},
			"typeName": {
				required:true
			},
			"priceDaily": {
				required:true
			},
			"priceDiscountedDaily": {
				required:true
			},
			"priceMonthly": {
				required:true
			},
			"priceDiscountedMonthly": {
				required:true
			}
		},
		messages: {
			"typeCode": {
				required: "Please enter service type code.",
				maxlength: "Service Type Code should not exceed 20 characters.",
			},
			"typeName": {
				required: "Please enter service type name"
			},
			"priceDaily": {
				required: "Enter daily price"
			},
			"priceDiscountedDaily": {
				required: "Enter discounted daily price"
			},
			"priceMonthly": {
				required: "Enter regular monthly price"
			},
			"priceDiscountedMonthly": {
				required: "Enter discounted monthly price"
			},
		},
		errorElement: 'div',
		wrapper: 'div',
		errorPlacement: function(error, element) {
			error.insertBefore(element).addClass('msgContainer'); // default function
		}
	});
};

var initializeServiceTypeTable = function(){
	$("table.serviceTypeTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});

	$("table.serviceTypeTable tr:odd").addClass("odd");
	$("table.serviceTypeTable tr:even").addClass("even");
	
	$("table.serviceTypeTable tr td").on("click", function(){
		var id = $(this).parent().find(":first-child").html();
		loadServiceTypeDetails(id);
	});
};

var loadServiceTypeDetails = function(id){
	if(id){
		$.getJSON("../getServiceTypeDetails.php?typeCode=" + id, function(data){
			if(data[0]){
				$("#txTtypeCode").val(data[0].type_code);
				$("#txtServiceTypeName").val(data[0].type_name);
				$("#txtPriceDaily").val(numberWithCommas(data[0].price_daily));
				$("#txtPriceDiscountedDaily").val(data[0].price_daily_discounted);
				$("#txtPriceMonthly").val(numberWithCommas(data[0].price_monthly));
				$("#txtPriceDiscountedMonthly").val(data[0].price_monthly_discounted);
				
                if(roleType == 'administrator'){
                    $('#btnRemoveServiceType').show();
                }
				
				$('#formServiceType').valid();
			}
		});
	}
};

var addUpdateServiceType = function(){
	if($('#formServiceType').valid()){
		$.post("../serviceTypeRegistration.php", $("#formServiceType").serialize()).done(function(msg){
			setServiceTypeStatus(true, msg);
			clearServiceTypeFields();
			refreshServiceTypeList();
		}).fail(function(error){
			setServiceTypeStatus(false, "Save Service Type Error: " + error.statusText);
		});
	}
};

var removeServiceType = function(){
	var typeCode = $("#txTtypeCode").val();
	if(typeCode){
		if(typeCode!='boxing' && typeCode!='weights'){
			$.post("../deleteServiceType.php?typeCode=" + typeCode).done(function(msg){
				setServiceTypeStatus(true, msg);
				clearServiceTypeFields();
				refreshServiceTypeList();
			}).fail(function(error){
				setServiceTypeStatus(false, "Remove Service Type Error: " + error.statusText);
			});
		}
		else {
			setServiceTypeStatus(false, 'Cannot remove referred served types.');
		}

	}
};

var searchServiceTypeList = function(searchKey){
	var url = "../serviceTypeList.php";
	if(searchKey) url += "?searchKey=" + searchKey;
	$("#dvList").load(url, function(){
		initializeServiceTypeTable();
	});
};

var refreshServiceTypeList = function(page, sortColumn, order){
	var url = "../serviceTypeList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvList").load(url, function(){
		initializeServiceTypeTable();
	});
};

var loadDummyServiceTypeInfo = function(){
	$("#txTtypeCode").val('poledancing');
	$("#txtServiceTypeName").val('Pole Dancing');
	$("#txtPriceDaily").val('150');
	$("#txtPriceDiscountedDaily").val('100');
	$("#txtPriceMonthly").val('1500');
	$("#txtPriceDiscountedMonthly").val('1000');
	$("#txtOtherInfo").text("Tag singko tag singko tag singko nalang...");
};

var clearServiceTypeFields = function(){
	$('input[type="text"], textarea').val("");
	$('#btnRemoveServiceType').hide();
	$('div.msgContainer').hide();
};

var setServiceTypeStatus = function(isSuccess, msg){
	var objStatus = $('#spanServiceTypeStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
};

var clearServiceTypeStatus = function(){
	var objStatus = $('#spanServiceTypeStatus');
	objStatus.removeClass("success").removeClass("error").html("");
};

var clearSearchKeys = function(){
	$('#txtSearchKey').val('');
	refreshServiceTypeList();
};

var showMessageDialog = function(msg){
	$("#dialog-box").html(msg);
	$("#dialog-box").dialog({
		modal: true,
		title: "GRMSys Service Types",
		resizable: false,
		height: "auto",
		width: "auto",
		buttons: {
			"OK": function () {
				$(this).dialog('close');
			}
		}
	});
};

var showConfirmRemoveServiceTypeDialog = function(){
	$("#dialog-box").html('Do you want to remove service type?');
	$("#dialog-box").dialog({
		modal: true,
		title: "GRMSys Service Types",
		resizable: false,
		height: "auto",
		width: "auto",
		buttons: {
			"Remove Type": function () {
				removeServiceType();
				$(this).dialog('close');
			},
			"Cancel": function () {
				$(this).dialog('close');
			},
		}
	});
};

var numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};