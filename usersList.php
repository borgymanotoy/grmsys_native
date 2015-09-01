<?php
	require_once('libs/dbconnect.php');

	$sqlQuery = "select vu.user_id, vu.user_name, vu.contactno from vw_users vu;";
	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/usersList.html');	
	}
?>