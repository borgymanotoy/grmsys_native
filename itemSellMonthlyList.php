<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$start_date = mysqli_real_escape_string($conn, $_GET['start_date']);
	$dateStart = convertStringToDate($start_date);
	
	$end_date = mysqli_real_escape_string($conn, $_GET['end_date']);
	$dateEnd = convertStringToDate($end_date);

	$sqlQuery = " SELECT item_id, item_name, SUM(item_count) AS item_count, SUM(total) AS total FROM vw_sold_items_daily  ";
	if('null' != $dateStart && 'null' != $dateEnd)
		$sqlQuery .= " WHERE sales_date between $dateStart and $dateEnd";
	else
		$sqlQuery .= " WHERE sales_date BETWEEN CAST(DATE_FORMAT(NOW() ,'%Y-%m-01') AS DATE) and LAST_DAY(NOW()) ";
	$sqlQuery .= " GROUP BY item_id, item_name ";

	//echo $sqlQuery;

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/itemSellList.html');	
	}

	exit(0);
?>