<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	session_start();

	$loadedMemberId = mysqli_real_escape_string($conn, $_POST['loadedMemberId']);
	$loadedMemberType = mysqli_real_escape_string($conn, $_POST['loadedMemberType']);
	$loadedServiceType = mysqli_real_escape_string($conn, $_POST['loadedServiceType']);
	$serviceType = mysqli_real_escape_string($conn, $_POST['serviceType']);
	$loadedHasDiscount = mysqli_real_escape_string($conn, $_POST['loadedHasDiscount']);
	$memberStart = mysqli_real_escape_string($conn, $_POST['memberStart']);
	$memberEnd = mysqli_real_escape_string($conn, $_POST['memberEnd']);
	$loadedAmountDue = mysqli_real_escape_string($conn, $_POST['loadedAmountDue']);

	$otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
	$amountPaid = mysqli_real_escape_string($conn, $_POST['amountPaid']);
	$loadedMonthlyStatus = mysqli_real_escape_string($conn, $_POST['loadedMonthlyStatus']);

	$amountPaid = empty($amountPaid) ? 'Unpaid' : $amountPaid;

	$dateMStart = convertStringToDate($memberStart);
	$dateMEnd = convertStringToDate($memberEnd);

	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

	mysqli_begin_transaction($conn, MYSQLI_TRANS_START_READ_WRITE);

	$sqlInsertMemberWorkout = "INSERT INTO workout_sales(member_id, workout_date, workout_hour, service_type, rendered_amount, paid, other_info, creation_date) VALUES('" . $loadedMemberId . "', now(), hour(now()), '" . $serviceType . "', '" . $loadedAmountDue . "','" . $amountPaid . "','" . $OtherInfo . "', now())";
	mysqli_query($conn, $sqlInsertMemberWorkout);
	$errNo  = mysqli_errno($conn);
	$errMSg = mysqli_error($conn);

	if($loadedMemberType == 'Monthly' && $loadedMonthlyStatus == 'No' && !IS_NULL($dateMStart) && !IS_NULL($dateMEnd)){
		$sqlUpdateMemberWorkout = "UPDATE membership_type SET type = '$loadedMemberType', service_type = '$serviceType', monthly_startdate = $dateMStart, monthly_enddate = $dateMEnd, last_modified_date = now(), user_id = '$loginUserId' WHERE member_id = $loadedMemberId";
		mysqli_query($conn, $sqlUpdateMemberWorkout);
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);
	}
	elseif($loadedMemberType == 'Daily' && $loadedMonthlyStatus == 'No' && !IS_NULL($dateMStart) && !IS_NULL($dateMEnd)){
		$sqlUpdateMemberWorkout = "UPDATE membership_type SET type = '$loadedMemberType', last_modified_date = now(), user_id = '$loginUserId' WHERE member_id = $loadedMemberId";
		mysqli_query($conn, $sqlUpdateMemberWorkout);
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);
	}

	mysqli_commit($conn);

	if(0 < $errNo){
		if($errNo == 1062)
			header('HTTP/1.0 500 Cannot allow registering workout too soon.');
		else
			header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
			//header('HTTP/1.0 500 DB Error (SQL: ' . $sqlMemberWorkout . ')' );
		exit(0);
	}
	else {
		echo "Successfully registered workout!";
	}

	exit(0);
?>