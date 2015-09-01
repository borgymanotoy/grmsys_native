<?php 

	require_once('libs/dbconnect.php');

	session_start();

	$itemId = mysqli_real_escape_string($conn, $_POST['itemId']);
	$itemName = mysqli_real_escape_string($conn, $_POST['itemName']);
	$itemPrice = mysqli_real_escape_string($conn, $_POST['itemPrice']);		
	$otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

	$itemId = empty($itemId) ? -1 : $itemId;
	$sqlCallProcedure = "CALL pAddOrUpdateItem($itemId, '$itemName', '$itemPrice', '$otherInfo', '$loginUserId')";
	
	//echo $sqlCallProcedure;

	$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
	if($successAddUpdate){
		if(0 < $itemId)
			echo "Successfully updated item!";
		else
			echo "Successfully registered item!";
	}
	else {
		header('HTTP/1.0 500 Error in adding or updating item info.');
	}
?>