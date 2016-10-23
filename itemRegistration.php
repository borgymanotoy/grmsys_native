<?php 

	require_once('libs/dbconnect.php');

	session_start();

	$itemId = mysqli_real_escape_string($conn, $_POST['itemId']);
	$itemName = mysqli_real_escape_string($conn, $_POST['itemName']);
	$itemQty = mysqli_real_escape_string($conn, $_POST['itemQty']);
	$itemPrice = mysqli_real_escape_string($conn, $_POST['itemPrice']);
	$otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

	$itemId = empty($itemId) ? -1 : $itemId;
	if(!empty($itemPrice)){
		$itemPrice = str_replace(',', '', $itemPrice);
	}

	if (0 < $itemId){
		$sqlItem = "UPDATE item SET name = '$itemName', quantity = '$itemQty', price = '$itemPrice', other_info = '$otherInfo', name = '$itemName', last_modified_date=now() WHERE id = $itemId";
	}
	else {
		$sqlItem = "INSERT INTO item (name, quantity, price, other_info, user_id, creation_date, last_modified_date) VALUES ('" . $itemName . "','" . $itemQty . "','" . $itemPrice . "','" . $otherInfo . "','" . $loginUserId . "', now(), now())";
	}

	mysqli_query($conn, $sqlItem);
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