<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$log_date = mysqli_real_escape_string($conn, $_GET['log_date']);
	$dateLog = convertStringToDate($log_date);

	$sqlQuery = " SELECT * FROM vw_dailysales_total ";
	if('null' != $dateLog)
		$sqlQuery .= " WHERE transaction_date = $dateLog";
	else
		$sqlQuery .= " WHERE transaction_date = DATE(NOW()) ";

	//echo $sqlQuery;

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/generalSalesList.html');	
	}

	exit(0);
?>