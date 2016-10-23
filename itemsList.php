<?php
	require_once('libs/dbconnect.php');

	$searchkey = mysqli_real_escape_string($conn, $_GET['searchKey']);
	$sqlQuery = "SELECT id, name, price, quantity FROM item ";
	if(!empty($searchkey)){
		$sqlQuery .= " WHERE TRIM(LOWER(CONCAT(id, ' ', name))) LIKE '%".$searchkey."%'";  
	}

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/itemsList.html');
	}
?>
