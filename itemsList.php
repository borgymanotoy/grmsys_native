<?php
	require_once('libs/dbconnect.php');

	$sqlQuery = "SELECT id, name, price FROM item;";
	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/itemsList.html');	
	}
?>