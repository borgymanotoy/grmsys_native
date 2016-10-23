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
	$typeOccurenceCount = 0;
	$sqlCheckTypeExists = "SELECT * FROM service_type WHERE type_code = '" . $typeCode . "'";
	if ($result=mysqli_query($conn,$sqlCheckTypeExists)){
		$typeOccurenceCount = mysqli_num_rows($result);
	}

	if(0 < $typeOccurenceCount){
		$sqlServiceType = "UPDATE service_type SET type_name = '$typeName', price_daily = '$priceDaily', price_daily_discounted = '$priceDiscountedDaily', price_monthly = '$priceMonthly', price_monthly_discounted = '$priceDiscountedMonthly', last_modified_date=now() WHERE type_code = '$typeCode'";
		//SQL
		//Execute
	}
	else {
		$sqlServiceType = "INSERT INTO service_type (type_code, type_name, price_daily, price_daily_discounted, price_monthly, price_monthly_discounted, remarks, user_id, creation_date, last_modified_date) VALUES ('" . $typeCode . "','" . $typeName . "','" . $priceDaily . "','" . $priceDiscountedDaily . "','" . $priceMonthly . "','" . $priceDiscountedMonthly . "','" . $otherInfo . "','" . $loginUserId . "', now(), now())";
		//SQL
		//Execute
	}

	mysqli_query($conn, $sqlServiceType);
	$errNo  = mysqli_errno($conn);
	$errMSg = mysqli_error($conn);
	
	if(0 < $errNo){
		if($errNo == 1062)
			header('HTTP/1.0 500 Unable to add existing product(item).');
		else
			//header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
			header('HTTP/1.0 500 DB Error (sql: ' . $sqlServiceType . ')' );
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