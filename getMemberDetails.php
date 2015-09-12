<?php
	require_once('libs/dbconnect.php');

	$memberId = mysqli_real_escape_string($conn, $_REQUEST['id']);

	$sqlQuery  = " select\n";
	$sqlQuery .= " 	   vm.member_id,\n";
	$sqlQuery .= " 	   vm.firstname,\n";
	$sqlQuery .= " 	   vm.lastname,\n";
	$sqlQuery .= " 	   vm.middlename,\n";
	$sqlQuery .= " 	   vm.contactno,\n";
	$sqlQuery .= " 	   vm.address,\n";
	$sqlQuery .= " 	   date_format(vm.birthdate, '%m-%d-%Y') as birthdate,\n";
	$sqlQuery .= " 	   vm.gender,\n";
	$sqlQuery .= " 	   vm.emergency_contact_person,\n";
	$sqlQuery .= "     vm.emergency_contact_number,\n";
	$sqlQuery .= "     vm.emergency_contact_relationship,\n";
	$sqlQuery .= "     vm.member_type,\n";
	$sqlQuery .= "     vm.has_discount,\n";
	$sqlQuery .= "     vm.price_daily,\n";
	$sqlQuery .= "     vm.price_daily_discounted,\n";
	$sqlQuery .= "     vm.price_monthly,\n";
	$sqlQuery .= "     vm.price_monthly_discounted,\n";
	$sqlQuery .= "     vm.service_type_code,\n";
	$sqlQuery .= "     vm.service_type,\n";
	$sqlQuery .= " 	   date_format(vm.monthly_startdate, '%m-%d-%Y') as monthly_startdate,\n";
	$sqlQuery .= " 	   date_format(vm.monthly_enddate, '%m-%d-%Y') as monthly_enddate,\n";
	$sqlQuery .= " 	   vm.amount_due as amount_due\n";
	$sqlQuery .= " from vw_members vm\n";
	$sqlQuery .= " where vm.member_id = " . $memberId;

	if ($result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery)) {
		$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
		header('Content-Type: application/json');
		echo json_encode($data);
	}
?>