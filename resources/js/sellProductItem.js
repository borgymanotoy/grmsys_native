var initSellProductItemComponents = function (){

	//setSellProductItemStatus(false, "Please complete all fields.");

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

	$("input.numeric").numeric();

	$("input").bind("change", function(){
		clearSellProductItemStatus();
	});

	$('#txtItemQuantitiy').bind('change', function(){
		clearSellProductItemStatus();
		computeItemTotal();
	});
};

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

var computeItemTotal = function(){
	var itemPrice = $('#txtItemPrice').val();
	var quantity = $('#txtItemQuantitiy').val();
	itemPrice = itemPrice.replace(/,/g, "");
	itemPrice = parseFloat(itemPrice);
	quantity = parseInt(quantity);
	console.info("[itemPrice]: " + itemPrice);
	var itemTotal = itemPrice * quantity;
	$('#hndItemTotalAmount').val(itemTotal);
	$('#spanItemTotalAmount').html(numberWithCommas(itemTotal));
};

var sellProductItem = function(){
	if('' != $('#hndLoadedItemId').val() && '' != $('#txtItemQuantitiy').val()){
		$.post("../productItemSold.php", $("#formSellItem").serialize()).done(function(id){
			//setSellProductItemStatus(true, id);
			$('#hndItemSellId').val(id);
			setSellProductItemStatus(true, "Sold item successfully. Select new item to sell or click the empty cart button below.");
			clearDetails();
			refreshItemSoldList(id);
		}).fail(function(error){
			setSellProductItemStatus(false, "Sell Product Item Error: " + error.statusText);
		});
	}
	else {
		console.log("Please complete all fields.");
		setSellProductItemStatus(false, "Please complete all fields.");
	}
};

var refreshItemSoldList = function(id){
	console.info('id: ' + id);
	if(id){
		var url = "../itemSoldList.php?itemId=" + id;
		$("#dvList").load(url, function(){
			loadItemSoldGrandTotal(id);
		});
	}	
};

var initItemSoldTable = function(){
	$("table.itemSoldTable").delegate('td','mouseover mouseleave', function(e) {
		if (e.type == 'mouseover') {
			$(this).parent().addClass("hover");
			$("colgroup").eq($(this).index()).addClass("hover");
		}
		else {
			$(this).parent().removeClass("hover");
			$("colgroup").eq($(this).index()).removeClass("hover");
		}
	});

	$("table.itemSoldTable tr:odd").addClass("odd");
	$("table.itemSoldTable tr:even").addClass("even");
};

var loadItemSoldGrandTotal = function(id){
	if(id){
		var url = "../getItemSoldGrandTotal.php?itemId=" + id;
		$.getJSON(url, function(data){
			if(data[0]){
				var amt = parseFloat(data[0].grand_total);
				$('#grandTotalAmount').val(data[0].grand_total);
				//$('#spanGrandTotalAmount').html(amt.toFixed(2));
				$('#spanGrandTotalAmount').html(numberWithCommas(amt.toFixed(2)));
			}
		});
	}
};

var setSellProductItemStatus = function(isSuccess, msg){
	var objStatus = $('#spanSellProductItemStatus');
	 objStatus.removeClass("success").removeClass("error");
	if(isSuccess)
		objStatus.addClass("success").html(msg);
	else
		objStatus.addClass("error").html(msg);	
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
	$('#hndLoadedMemberId').val('');
	$('#hndItemTotalAmount, #hndGrandTotalAmount').val('0');
	$('#spanItemTotalAmount, #spanGrandTotalAmount').html('0.00');
	$('#dvList').empty();
	clearSellProductItemStatus();
};