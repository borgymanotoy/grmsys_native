<?php
	require_once('libs/dbconnect.php');

	$memberId = mysqli_real_escape_string($conn, $_REQUEST['id']);

	$sqlQuery  = " select \n";
	$sqlQuery .= " 	   vwsd.id, \n";
	$sqlQuery .= " 	   vwsd.workout_date, \n";
	$sqlQuery .= " 	   vwsd.member_id, \n";
	$sqlQuery .= " 	   vwsd.firstname, \n";
	$sqlQuery .= " 	   vwsd.lastname, \n";
	$sqlQuery .= " 	   vwsd.middlename, \n";
	$sqlQuery .= " 	   vwsd.member_name, \n";
	$sqlQuery .= " 	   vwsd.contactno, \n";
	$sqlQuery .= " 	   vwsd.address, \n";
	$sqlQuery .= " 	   date_format(vwsd.birthdate, '%m-%d-%Y') as birthdate, \n";
	$sqlQuery .= " 	   vwsd.gender, \n";
	$sqlQuery .= " 	   vwsd.service_type_code, \n";
	$sqlQuery .= "     vwsd.service_type_name, \n";
	$sqlQuery .= "     vwsd.member_type, \n";
	$sqlQuery .= "     vwsd.has_discount,\n";
	$sqlQuery .= " 	   date_format(vwsd.monthly_startdate, '%m-%d-%Y') as monthly_startdate,\n";
	$sqlQuery .= " 	   date_format(vwsd.monthly_enddate, '%m-%d-%Y') as monthly_enddate,\n";
	$sqlQuery .= "     vwsd.rendered_amount, \n";
	$sqlQuery .= "     vwsd.other_info, \n";
	$sqlQuery .= "     vwsd.paid \n";
	$sqlQuery .= " from vw_workout_sales_details vwsd \n";
	$sqlQuery .= " where vwsd.id = " . $memberId;

	//echo $sqlQuery;

	if ($result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery)) {
		$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}
?>