<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$memberId = mysqli_real_escape_string($conn, $_POST['memberId']);	

	$has_error = false;
	
	if(0 < $memberId){
		$sqlCallProcedure = "CALL pRemoveMember($memberId)";
		$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
		if(!$successAddUpdate) $has_error = true;
	}

	if($has_error)
		header('HTTP/1.0 500 Error removing member!');
	else
		echo "Successfully removed member!";	
?>