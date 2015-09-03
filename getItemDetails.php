<?php
	require_once('libs/dbconnect.php');

	$itemId = mysqli_real_escape_string($conn, $_REQUEST['id']);

	$sqlQuery  = " select vi.* from vw_items vi where vi.item_id = " . $itemId;

	if ($result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery)) {
		$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}
?>