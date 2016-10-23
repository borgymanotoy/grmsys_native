<?php
	require_once('libs/dbconnect.php');

	$searchkey = mysqli_real_escape_string($conn, $_GET['searchKey']);
	$sqlQuery = "select vu.user_id, vu.user_name, vu.contactno from vw_users vu";
	if(!empty($searchkey)){
		$sqlQuery .= " WHERE TRIM(LOWER(CONCAT(vu.user_id, ' ', vu.firstname, ' ', vu.middlename, ' ', vu.lastname))) LIKE '%".$searchkey."%'";
	}

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));

	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/usersList.html');
	}

	exit(0);
?>