<?php
	require_once('libs/dbconnect.php');

	$searchkey = mysqli_real_escape_string($conn, $_GET['searchKey']);
	$sqlQuery = "SELECT type_code, type_name, remarks FROM service_type ";
	if(!empty($searchkey)){
		$sqlQuery .= " WHERE TRIM(LOWER(CONCAT(type_code, ' ', type_name))) LIKE '%".$searchkey."%'";  
	}

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/serviceTypeList.html');	
	}
?>