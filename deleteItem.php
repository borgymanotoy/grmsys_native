<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$itemId = mysqli_real_escape_string($conn, $_POST['itemId']);	

	if(0 < $itemId){
		$sqlCallProcedure = "CALL pRemoveItem($itemId)";
		$successAddUpdate = mysqli_query($conn, $sqlCallProcedure);
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