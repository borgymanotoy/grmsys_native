<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$memberId = mysqli_real_escape_string($conn, $_POST['memberId']);	

	if(0 < $memberId){
		$sqlCallProcedure = "CALL pRemoveMember($memberId)";
		$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);

		if(0 < $errNo){
			header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
			exit(0);
		}
	
		if($successAddUpdate)  echo "Successfully removed member!";		
	}
	exit(0);
?>