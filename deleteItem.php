<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$itemId = mysqli_real_escape_string($conn, $_POST['itemId']);	

	$has_error = false;
	
	if(0 < $itemId){
		$sqlCallProcedure = "CALL pRemoveItem($itemId)";
		$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
		if(!$successAddUpdate) $has_error = true;
	}

	if($has_error)
		header('HTTP/1.0 500 Error removing user!');
	else
		echo "Successfully removed item!";	
?>