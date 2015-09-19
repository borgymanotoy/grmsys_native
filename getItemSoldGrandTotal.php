<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$itemSellId = mysqli_real_escape_string($conn, $_GET['itemId']);

	$sqlItemTotal = " SELECT * FROM vw_itemsales_grandtotal where id = $itemSellId";
	//echo $sqlItemTotal;

	if ($rsTotal = mysqli_query($conn, $sqlItemTotal) or die("Query fail: " . $sqlItemTotal)) {
		$data = mysqli_fetch_all($rsTotal, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}	

	exit(0);
?>