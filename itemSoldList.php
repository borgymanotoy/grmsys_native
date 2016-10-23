<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$itemId = mysqli_real_escape_string($conn, $_GET['itemId']);

	$sqlQuery = " SELECT vis.item_name, vis.item_quantity, vis.unit_total FROM vw_item_sales vis where vis.id = $itemId";

	//echo $sqlQuery;

	$recordCount = mysqli_num_rows(mysqli_query($conn, $sqlQuery));
	if(0 < $recordCount){
		$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
		include('pages/itemSoldList.html');
	}

	exit(0);
?>