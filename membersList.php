<?php
	require_once('libs/dbconnect.php');

	$searchkey = mysqli_real_escape_string($conn, $_GET['searchKey']);
	$sqlQuery = "SELECT vm.member_id, vm.member_name, vm.membership_type, vm.has_discount FROM vw_members vm ";
	if(!empty($searchkey)){
		$sqlQuery .= " WHERE TRIM(LOWER(CONCAT(vm.member_id, ' ', vm.firstname, ' ', vm.middlename, ' ', vm.lastname))) LIKE  '%".$searchkey."%'";
	}

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));

	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/membersList.html');	
	}

	exit(0);
?>