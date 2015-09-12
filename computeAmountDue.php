<?php
	require_once('libs/dbconnect.php');

	$serviceType = mysqli_real_escape_string($conn, $_REQUEST['serviceType']);

	$sqlQuery = " SELECT st.* FROM service_type st ";
	if( isset($serviceType) ){
		$sqlQuery .= "  where st.type_code = '" . $serviceType . "'";
	}

	$result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery);
	$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
	header('Content-Type: application/json');
	echo json_encode($data);

	exit(0);
?>