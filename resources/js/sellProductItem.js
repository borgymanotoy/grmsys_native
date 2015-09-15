var initSellProductItemComponents = function (){

	$("div.headerIconLabel").bind("click", function(){
		goToHome();
	});

	$('#dialog-box').hide();

	//$(".myCheckboxes").iCheck({ checkboxClass: 'icheckbox_flat-red' });
	
	$('#txtItemSearchKey').autocomplete({
		source:'searchItem.php', 
		minLength:3,
		select: function(event,ui){
			event.preventDefault();
			$(this).val(ui.item.label);
			
			var id = ui.item.value;
			if(id) loadItemDetails(id);
		},
		focus: function(event,ui){
			event.preventDefault();
			$(this).val(ui.item.label);
		},
		// optional
		html: true, 
		// optional (if other layers overlap the autocomplete list)
		open: function(event, ui) {
			$(".ui-autocomplete").css("z-index", 1000);
		}
	});

	$('#txtMemberSearchKey').autocomplete({
		source:'searchMember.php', 
		minLength:3,
		select: function(event,ui){
			event.preventDefault();
			$(this).val(ui.item.label);
			$('#txtMemberId, #hndLoadedMemberId').val(ui.item.value);
			$('#txtMemberName').val(ui.item.label);
		},
		focus: function(event,ui){
			event.preventDefault();
			$(this).val(ui.item.label);
		},
		// optional
		html: true, 
		// optional (if other layers overlap the autocomplete list)
		open: function(event, ui) {
			$(".ui-autocomplete").css("z-index", 1000);
		}
	});

var loadItemDetails = function(id){
	if(id){
		$.getJSON("../getItemDetails.php?id=" + id, function(data){
			if(data[0]){
				$("#txtItemId, #hndLoadedItemId").val(data[0].item_id);
				$("#txtItemName").val(data[0].item_name);
				$("#txtItemPrice").val(numberWithCommas(data[0].item_price));
				$("#txtItemOtherInfo").val(data[0].item_infos);
			}
		});
	}
};

/*
	$('#txtItemSearchKey').bind('keyup', function(){
		var searchkey = $(this).val();
		console.info("searchkey: " +searchkey);
		//searchItemSalesList(searchkey);
	});
*/

/*
	loadServiceType($('#selServiceType'));
	$('#selServiceType').bind('change', function(){
		computeAmountDue();
	});

	$('#txtMemberStart').Zebra_DatePicker({
		direction: true,
		pair: $('#txtMemberEnd'),
		onSelect: function(view, elements) {
			memberMonthlyDatesChanged($(this).val(), $('#txtMemberEnd').val());
		}
	});

	$('#txtMemberEnd').Zebra_DatePicker({
		direction: 1,
		onSelect: function(view, elements) {
			memberMonthlyDatesChanged($('#txtMemberStart').val(), $(this).val());
		}
	});
*/

	$("input").bind("change", function(){
		clearSellProductItemStatus();
	});
};

var clearItemDetails = function(){
	$("#txtItemId, #hndLoadedItemId").val('');
	$("#txtItemName").val('');
	$("#txtItemPrice").val('');
	$("#txtItemOtherInfo").val('');
};

var clearSellProductItemStatus = function(){
	var objStatus = $('#spanSellProductItemStatus');
	objStatus.removeClass("success").removeClass("error").html("");
	
};

var clearSearchMembers = function(){
	$('#txtMemberSearchKey').val('').focus();
	$('#txtMemberId, #txtMemberName, #hndLoadedMemberId').val('');
};

var clearSearchItems = function(){
	$('#txtItemSearchKey').val('').focus();
	clearItemDetails();
};

var clearDetails = function(){
	$("#txtItemQuantitiy, #txtOtherInfo").val('');
	$("#hndItemTotalAmount").val('0');
	$("#spanItemTotalAmount").html('0.00');
	clearSearchItems();
};

var clearEverything = function(){
	clearDetails();
	$('#txtMemberSearchKey, #txtMemberId, #txtMemberName').val('');
	$('#hndItemTotalAmount, #hndGrandTotalAmount, #hndLoadedMemberId').val('');
	$('#spanItemTotalAmount, #spanGrandTotalAmount').html('0.00');
	$('#dvList').empty();
};