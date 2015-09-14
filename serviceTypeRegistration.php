<?php 

	require_once('libs/dbconnect.php');

	session_start();

	$typeCode = mysqli_real_escape_string($conn, $_POST['typeCode']);
	$typeName = mysqli_real_escape_string($conn, $_POST['typeName']);
	$priceDaily = mysqli_real_escape_string($conn, $_POST['priceDaily']);		
	$priceDiscountedDaily = mysqli_real_escape_string($conn, $_POST['priceDiscountedDaily']);
	$priceMonthly = mysqli_real_escape_string($conn, $_POST['priceMonthly']);
	$priceDiscountedMonthly = mysqli_real_escape_string($conn, $_POST['priceDiscountedMonthly']);
	$otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

	$priceDaily = str_replace(',', '', $priceDaily);
	$priceDiscountedDaily = str_replace(',', '', $priceDiscountedDaily);
	$priceMonthly = str_replace(',', '', $priceMonthly);
	$priceDiscountedMonthly = str_replace(',', '', $priceDiscountedMonthly);

	$itemId = empty($itemId) ? -1 : $itemId;
	if(!empty($itemPrice)){
		$itemPrice = str_replace(',', '', $itemPrice);
	}

	$sqlCallProcedure = "CALL pAddUpdateServiceType('$typeCode', '$typeName', '$priceDaily', '$priceDiscountedDaily', '$priceMonthly', '$priceDiscountedMonthly', '$otherInfo', '$loginUserId')";

	//echo $sqlCallProcedure;

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