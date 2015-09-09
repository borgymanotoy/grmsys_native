<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$userId = mysqli_real_escape_string($conn, $_POST['userId']);	

	if(0 < $userId){
		$sqlCallProcedure = "CALL pRemoveUser($userId)";
		$successAddUpdate = mysqli_query($conn, $sqlCallProcedure);
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);
		
		if(0 < $errNo){
			header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
			exit(0);
		}
		
		if($successAddUpdate) echo "Successfully removed user!";
	}
	exit(0);
?>