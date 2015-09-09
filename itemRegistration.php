<?php 

	require_once('libs/dbconnect.php');

	session_start();

	$itemId = mysqli_real_escape_string($conn, $_POST['itemId']);
	$itemName = mysqli_real_escape_string($conn, $_POST['itemName']);
	$itemPrice = mysqli_real_escape_string($conn, $_POST['itemPrice']);		
	$otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

	$itemId = empty($itemId) ? -1 : $itemId;
	if(!empty($itemPrice)){
		$itemPrice = str_replace(',', '', $itemPrice);
	}

	$sqlCallProcedure = "CALL pAddOrUpdateItem($itemId, '$itemName', '$itemPrice', '$otherInfo', '$loginUserId')";

	mysqli_query($conn, $sqlCallProcedure);
	$errNo  = mysqli_errno($conn);
	$errMSg = mysqli_error($conn);
	
	if(0 < $errNo){
		if($errNo == 1062)
			header('HTTP/1.0 500 Unable to add existing product(item).');
		else
			header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
		exit(0);
	}
	else {
		if(0 < $itemId)
			echo "Successfully updated item!";
		else
			echo "Successfully registered item!";
	}

	exit(0);
?>