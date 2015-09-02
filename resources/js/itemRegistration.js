var addUpdateItem = function(){
	$.post("../itemRegistration.php", $("#formItem").serialize()).done(function(msg){
		setItemStatus(true, msg);
		clearItemFields();
		refreshItemsList();
	}).fail(function(){
		setItemStatus(false, "Error adding/updating item.");
	});
};

var refreshItemsList = function(page, sortColumn, order){
	var url = "../itemsList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvItemListContainer").load(url);
};

var loadDummyItemInfo = function(){
	$("#txtItemId").val("0");
	$("#txtItemName").val("Vitamilk");
	$("#txtItemPrice").val("28.00");
	$("#txtItemOtherInfo").text("Tag singko tag singko tag singko nalang...");
};

var clearItemFields = function(){
	$('input[type="text"], textarea').val("");
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