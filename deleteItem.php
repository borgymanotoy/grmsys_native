<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$itemId = mysqli_real_escape_string($conn, $_POST['itemId']);

	if(0 < $itemId){
		$sqlDeleteItemSaleDetails = "DELETE FROM item_sales_details WHERE item_sales_id = $itemId";
		$successAddUpdate = mysqli_query($conn, $sqlDeleteItemSaleDetails);
		$sqlDeleteItemSales = "DELETE FROM item_sales WHERE id = $itemId ";
		$successAddUpdate = mysqli_query($conn, $sqlDeleteItemSales);
		$sqlDeleteItem= "DELETE FROM item WHERE id = $itemId";
		$successAddUpdate = mysqli_query($conn, $sqlDeleteItem);
		
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);
		
		if(0 < $errNo){
			header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
			exit(0);
		}

		if($successAddUpdate) echo "Successfully removed item!";
	}

	exit(0);
?>