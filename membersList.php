<?php
	require_once('libs/dbconnect.php');

	$sqlQuery = "SELECT vm.member_id, vm.member_name, vm.membership_type, vm.has_discount FROM vw_members vm;";
	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/membersList.html');	
	}
?>