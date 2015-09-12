<?php
	require_once('libs/dbconnect.php');

	$searchkey = mysqli_real_escape_string($conn, $_GET['searchKey']);
	$sqlQuery = " SELECT A.* FROM vw_workout_sales A WHERE A.workout_date = DATE(NOW()) ";
	if(!empty($searchkey)){
		$sqlQuery .= " AND TRIM(LOWER(CONCAT(A.member_name, ' ', A.service_type_name, ' ', A.membership_type))) LIKE '%".$searchkey."%'";
	}

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));

	//echo $sqlQuery;

	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/workoutLogList.html');	
	}

	exit(0);
?>