<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$memberId = mysqli_real_escape_string($conn, $_POST['memberId']);

	if(0 < $memberId){
		$sqlDeleteWorkoutSales = "DELETE FROM workout_sales WHERE member_id = $memberId";
		$successAddUpdate = mysqli_query($conn, $sqlDeleteWorkoutSales) or die("Query fail: " . $sqlDeleteWorkoutSales);
		$sqlDeleteItemSales = "DELETE FROM item_sales WHERE member_id = $memberId";
		$successAddUpdate = mysqli_query($conn, $sqlDeleteItemSales) or die("Query fail: " . $sqlDeleteItemSales);
		$sqlDeleteMemberType = "DELETE FROM membership_type WHERE member_id = $memberId";
		$successAddUpdate = mysqli_query($conn, $sqlDeleteMemberType) or die("Query fail: " . $sqlDeleteMemberType);
		$sqlDeleteMember = "DELETE FROM member WHERE id = $memberId";
		$successAddUpdate = mysqli_query($conn, $sqlDeleteMember) or die("Query fail: " . $sqlDeleteMember);
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