<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$log_date = mysqli_real_escape_string($conn, $_GET['log_date']);
	$dateLog = convertStringToDate($log_date);


	$sqlDailyTotal = " SELECT SUM(total_sales) AS total_sales FROM vw_dailysales_total ";
	if('null' != $dateLog)
		$sqlDailyTotal .= " WHERE transaction_date = $dateLog";
	else
		$sqlDailyTotal .= " WHERE transaction_date = DATE(NOW()) ";

	//echo $sqlDailyTotal;

	if ($rsTotal = mysqli_query($conn, $sqlDailyTotal) or die("Query fail: " . $sqlDailyTotal)) {
		$data = mysqli_fetch_all($rsTotal, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}	

	exit(0);
?>