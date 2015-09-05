<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$userId = mysqli_real_escape_string($conn, $_POST['userId']);	

	$has_error = false;
	
	if(0 < $userId){
		$sqlCallProcedure = "CALL pRemoveUser($userId)";
		$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
		if(!$successAddUpdate) $has_error = true;
	}

	if($has_error)
		header('HTTP/1.0 500 Error removing user!');
	else
		echo "Successfully removed user!";	
?>