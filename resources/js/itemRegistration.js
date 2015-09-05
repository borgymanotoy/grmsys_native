var initItemComponents = function(){
	$("div.headerIconLabel").bind("click", function(){
		goToHome();
	});
	$("input").bind("change", function(){
		clearItemStatus();
	});
	$('.currency').autoNumeric('init');
	$('#btnRemoveItem').hide();

	initializeItemForm();
};

var initializeItemForm = function(){
	$("#formItem").validate({
		onkeyup:false,
		onkeydown:false,
		onchange: false,
		onblur:false,
		rules: {
			"itemName": {
				required:true,
				maxlength: 50
			},
			"itemPrice": {
				required:true
			}
		},
		messages: {
			"itemName": {
				required: "Please enter item name.",
				maxlength: "Item name should not exceed 50 characters.",
			},
			"itemPrice": {
				required: "Please enter item price."
			}
		},
		errorElement: 'div',
		wrapper: 'div',
		errorPlacement: function(error, element) {
			error.insertBefore(element).addClass('msgContainer'); // default function
		}
	});
};

var initializeItemTable = function(){
	$("table.itemsTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});

	$("table.itemsTable tr:odd").addClass("odd");
	$("table.itemsTable tr:even").addClass("even");
	
	$("table.itemsTable tr td").on("click", function(){
		var id = $(this).parent().find(":first-child").html();
		loadItemDetails(id);
	});
};

var loadItemDetails = function(id){
	if(id){
		$.getJSON("../getItemDetails.php?id=" + id, function(data){
			if(data[0]){
				$("#txtItemId").val(data[0].item_id);
				$("#txtItemName").val(data[0].item_name);
				$("#txtItemPrice").val(numberWithCommas(data[0].item_price));
				$("#txtItemOtherInfo").val(data[0].item_infos);
				
                if(roleType == 'administrator'){
                    $('#btnRemoveItem').show();
                }
				
				$('#formItem').valid();
			}
		});
	}
};

var addUpdateItem = function(){
	if($('#formItem').valid()){
		$.post("../itemRegistration.php", $("#formItem").serialize()).done(function(msg){
			setItemStatus(true, msg);
			clearItemFields();
			refreshItemsList();
		}).fail(function(){
			setItemStatus(false, "Error adding/updating item.");
		});
	}
};

var removeItem = function(){
	var id = $("#txtItemId").val();
	if(id){
		$.post("../deleteItem.php", $("#formItem").serialize()).done(function(msg){
			setItemStatus(true, msg);
			clearItemFields();
			refreshItemsList();
		}).fail(function(){
			setItemStatus(false, "Error: Unable to remove item.");
		});
	}
};

var refreshItemsList = function(page, sortColumn, order){
	var url = "../itemsList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvItemListContainer").load(url, function(){
		initializeItemTable();
	});
};

var loadDummyItemInfo = function(){
	$("#txtItemId").val("0");
	$("#txtItemName").val("Vitamilk");
	$("#txtItemPrice").val("28.00");
	$("#txtItemOtherInfo").text("Tag singko tag singko tag singko nalang...");
};

var clearItemFields = function(){
	$('input[type="text"], textarea').val("");
	$('#btnRemoveItem').hide();
};

var setItemStatus = function(isSuccess, msg){
	var objStatus = $('#spanItemStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
};

var clearItemStatus = function(){
	var objStatus = $('#spanItemStatus');
	objStatus.removeClass("success").removeClass("error").html("");
};

var showMessageDialog = function(msg){
	$("#dialog-box").html(msg);
	$("#dialog-box").dialog({
		modal: true,
		title: "GRMSys Items",
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

var showConfirmRemoveItemDialog = function(){
	$("#dialog-box").html('Do you want to remove item?');
	$("#dialog-box").dialog({
		modal: true,
		title: "GRMSys Items",
		resizable: false,
		height: "auto",
		width: "auto",
		buttons: {
			"Remove Item": function () {
				removeItem();
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