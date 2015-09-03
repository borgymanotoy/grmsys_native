<?php
	require_once('libs/dbconnect.php');

	$userId = mysqli_real_escape_string($conn, $_REQUEST['id']);

	$sqlQuery  = " select\n";
	$sqlQuery .= " 	   vu.user_id,\n";
	$sqlQuery .= " 	   vu.firstname,\n";
	$sqlQuery .= " 	   vu.lastname,\n";
	$sqlQuery .= " 	   vu.middlename,\n";
	$sqlQuery .= " 	   vu.contactno,\n";
	$sqlQuery .= " 	   vu.address,\n";
	$sqlQuery .= " 	   date_format(vu.birthdate, '%m-%d-%Y') as birthdate,\n";
	$sqlQuery .= " 	   vu.gender,\n";
	$sqlQuery .= " 	   vu.username,\n";
	$sqlQuery .= "     vu.password\n";
	$sqlQuery .= " from vw_users vu\n";
	$sqlQuery .= " where vu.user_id = " . $userId;

	if ($result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery)) {
		$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}
?>