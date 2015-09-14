<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$typeCode = mysqli_real_escape_string($conn, $_REQUEST['typeCode']);	

	if(!empty($typeCode)){
		$sqlDelete = "delete from service_type where type_code = '$typeCode'";

		//echo $sqlDelete;

		$successAddUpdate = mysqli_query($conn, $sqlDelete) or die("Query fail: " . $sqlDelete);
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);

		if(0 < $errNo){
			header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
			exit(0);
		}
	
		if($successAddUpdate)  echo "Successfully removed service type!";
	}

	exit(0);
?>