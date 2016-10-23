<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	session_start();

	$item_sell_id = mysqli_real_escape_string($conn, $_POST['itemSellId']);

	$loadedItemId = mysqli_real_escape_string($conn, $_POST['loadedItemId']);
	$loadedItemQtyLeft = mysqli_real_escape_string($conn, $_POST['loadedItemQtyLeft']);

	$loadedMemberId = mysqli_real_escape_string($conn, $_POST['loadedMemberId']);
	$itemQuantitiy = mysqli_real_escape_string($conn, $_POST['itemQuantitiy']);
	$itemQty = mysqli_real_escape_string($conn, $_POST['itemQty']);
	$otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
	$itemTotalAmount = mysqli_real_escape_string($conn, $_POST['itemTotalAmount']);
	$grandTotalAmount = mysqli_real_escape_string($conn, $_POST['grandTotalAmount']);

	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);
	//if( !isset($loadedMemberId)) $loadedMemberId = 1;

	//Product Item Quantity Available VS Item quantity purchased
	//START (1): Check if AVailable QTY greater than quantity purchased
	if($loadedItemQtyLeft >= $itemQuantitiy){
		// echo "[sql]:" . $itemQty;

		//START (OLD-CODE)
		if( empty($loadedMemberId)) $loadedMemberId = 'null';

		//1a. If no $item_sell_id, insert to item_sales then get $item_sell_id
		if( empty($item_sell_id) ){
			$sqlInsertItemSell = "INSERT INTO item_sales(member_id, grand_total_amount, sales_date, user_id, creation_date) values (".$loadedMemberId.", '$itemTotalAmount', now(), $loginUserId, now())";

			mysqli_query($conn, $sqlInsertItemSell);
			$item_sell_id = mysqli_insert_id($conn);

			$errNoAddItemSell  = mysqli_errno($conn);
			$errMSgAddItemSell = mysqli_error($conn);

			if(0 < $errNoAddItemSell){
				header('HTTP/1.0 500 DB Error (' . $errNoAddItemSell . ': ' . $errMSgAddItemSell. ')' );
				exit(0);
			}
		}

		//1b. $item_sell_id is not null, meaning naka save kana sa item sale.
		elseif(!IS_NULL($item_sell_id) && !IS_NULL($itemTotalAmount)) {
			$sqlInsertItemSell = "SELECT grand_total FROM vw_itemsales_grandtotal WHERE id = $item_sell_id";
			mysqli_query($conn, $sqlInsertItemSell);

			//... fetch assoc
			$row = mysqli_fetch_assoc($sqlInsertItemSell);

			$grandTotal = $row['grand_total'];

			//SQL UPdate: update item_sales set grand_total_amount= $grandTotal + $itemTotalAmount where id = $item_sell_id;
			$sqlUpdateGrandTotal = "update item_sales set grand_total_amount = " . ($grandTotal + $itemTotalAmount) . " where id = " . $item_sell_id;
			mysqli_query($conn, $sqlUpdateGrandTotal);

			//$sqlInsertItemSell = "call pUpdateSoldItemsGrandTotal($item_sell_id, $itemTotalAmount)";
			$errNoUpdateGrandTotal  = mysqli_errno($conn);
			$errMSgUpdateGrandTotal = mysqli_error($conn);

			if(0 < $errNoUpdateGrandTotal){
				header('HTTP/1.0 500 DB Error (' . $errNoUpdateGrandTotal . ': ' . $errMSgUpdateGrandTotal. ') - Update Grand Total Error.' );
				exit(0);
			}
		}

		//echo "[ITEM-SALES-ID]: " .  $item_sell_id;

		//2. Naka save kana ug item, meaning naa nakay item_sell_id
		//2a. save ang new item sold padulong sa item_sales_details (item_Sell_id)

		$sqlInsertSellItemDetails = "INSERT INTO item_sales_details(item_sales_id, item_id, qty, unit_total, remarks, user_id, creation_date) values ('$item_sell_id', '$loadedItemId', '$itemQuantitiy', '$itemTotalAmount', '$otherInfo', '$loginUserId', now())";
		//echo  $sqlInsertSellItemDetails;

		mysqli_query($conn, $sqlInsertSellItemDetails);
		$errNoAddDetails  = mysqli_errno($conn);
		$errMSgAddDetails = mysqli_error($conn);
		if(0 < $errNoAddDetails){
			header('HTTP/1.0 500 DB Error (' . $errNoAddDetails . ': ' . $errMSgAddDetails . ')' );
			exit(0);
		}
		//END (OLD-CODE)

		//2b. Update ang available quantity sa item... i deduct ang number of items gipalit
		//START (2): Deduct number of bought quantities to the product item available quantities
		$sqlInsertItemQty = "UPDATE item SET quantity = quantity - '$itemQuantitiy' WHERE id = $loadedItemId";
		mysqli_query($conn, $sqlInsertItemQty);
		$errNoUpdateQty  = mysqli_errno($conn);
		$errMSgUpdateQty = mysqli_error($conn);
		if(0 < $errNoUpdateQty){
			header('HTTP/1.0 500 DB Error (' . $errNoUpdateQty . ': ' . $errMSgUpdateQty . ')' );
			exit(0);
		}
		//END (2)
		echo $item_sell_id;
		return $item_sell_id;
		//$item_sell_id return
	}
	else {
		header('HTTP/1.0 409 The number of ordered items is more than the number of items available ("item").' );
		exit(0);
	}
	//END (1)

	exit(0);
?>