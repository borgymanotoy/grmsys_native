var addUpdateItem = function(){
	$.post("../itemRegistration.php", $("#formItem").serialize()).done(function(msg){
		alert(msg);
		clearItemFields();
		refreshItemsList();
	}).fail(function(){
		alert("Error adding/updating item.");
	});
};

var refreshItemsList = function(page, sortColumn, order){
	var url = "../itemsList.php";
	if(page) url += "?page=" + page;
	if(sortColumn) url += "&sortBy=" + sortColumn;
	if(order) url += "&order=" + order;

	$("#dvItemListContainer").load(url);
};

var loadDummyUserInfo = function(){
	$("#txtItemId").val("0");
	$("#txtItemName").val("Vitamilk");
	$("#txtItemPrice").val("28.00");
	$("#txtItemOtherInfo").text("Tag singko tag singko tag singko nalang...");
};

var clearItemFields = function(){
	$('input[type="text"], textarea').val("");
};