var initItemComponents = function(){
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
		//console.log("[ID]: " + id);
		loadItemDetails(id);
	});
	
	$('#btnRemoveItem').hide();
};

var loadItemDetails = function(id){
	if(id){
		$.getJSON("../getItemDetails.php?id=" + id, function(data){
			if(data[0]){
				$("#txtItemId").val(data[0].item_id);
				$("#txtItemName").val(data[0].item_name);
				$("#txtItemPrice").val(data[0].item_price);
				$("#txtItemOtherInfo").val(data[0].item_infos);
				
				$('#btnRemoveItem').show();
			}
		});
	}
};

var addUpdateItem = function(){
	$.post("../itemRegistration.php", $("#formItem").serialize()).done(function(msg){
		setItemStatus(true, msg);
		clearItemFields();
		refreshItemsList();
	}).fail(function(){
		setItemStatus(false, "Error adding/updating item.");
	});
};

var removeItem = function(){
	var id = $("#txtItemId").val();
	if(id){
		console.log("Remove Item: " + id);
	}
};

var refreshItemsList = function(page, sortColumn, order){
	var url = "../itemsList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvItemListContainer").load(url, function(){
		initItemComponents();
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