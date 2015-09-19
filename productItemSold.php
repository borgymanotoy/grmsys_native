<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	session_start();

	$item_sell_id = mysqli_real_escape_string($conn, $_POST['itemSellId']);
	$loadedItemId = mysqli_real_escape_string($conn, $_POST['loadedItemId']);
	$loadedMemberId = mysqli_real_escape_string($conn, $_POST['loadedMemberId']);
	$itemQuantitiy = mysqli_real_escape_string($conn, $_POST['itemQuantitiy']);
	$otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
	$itemTotalAmount = mysqli_real_escape_string($conn, $_POST['itemTotalAmount']);
	$grandTotalAmount = mysqli_real_escape_string($conn, $_POST['grandTotalAmount']);

	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);
	//if( !isset($loadedMemberId)) $loadedMemberId = 1;
	
	if( empty($loadedMemberId)) $loadedMemberId = 'null';

	if( empty($item_sell_id) ){
		$sqlInsertItemSell = "insert into item_sales(member_id, grand_total_amount, sales_date, user_id, creation_date) values (".$loadedMemberId.", '$itemTotalAmount', now(), $loginUserId, now())";
		

		mysqli_query($conn, $sqlInsertItemSell);
		$item_sell_id = mysqli_insert_id($conn);
	}
	else {
		$sqlInsertItemSell = "call pUpdateSoldItemsGrandTotal($item_sell_id, $itemTotalAmount)";
		mysqli_query($conn, $sqlInsertItemSell);
	}

	//echo  $sqlInsertItemSell;
//*
	$errNo  = mysqli_errno($conn);
	$errMSg = mysqli_error($conn);

	if(0 < $errNo){
		header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
		exit(0);
	}


	if( isset($item_sell_id) ){
		$sqlInsertSellItemDetails = "insert into item_sales_details(item_sales_id, item_id, qty, unit_total, remarks, user_id, creation_date) values ($item_sell_id, $loadedItemId, '$itemQuantitiy', '$itemTotalAmount', '$otherInfo', '$loginUserId', now())";
		//echo  $sqlInsertSellItemDetails;

		mysqli_query($conn, $sqlInsertSellItemDetails);
		$errNo1  = mysqli_errno($conn);
		$errMSg1 = mysqli_error($conn);
		if(0 < $errNo1){
			header('HTTP/1.0 500 DB Error (' . $errNo1 . ': ' . $errMSg1. ')' );
			exit(0);
		}

		echo $item_sell_id;
	}
//*/
	exit(0);
?>