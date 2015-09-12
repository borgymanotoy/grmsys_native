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

	$amountPaid = empty($amountPaid) ? 'unpaid' : $amountPaid;

	$dateMStart = convertStringToDate($memberStart);
	$dateMEnd = convertStringToDate($memberEnd);

	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

	if( !empty($loadedMemberId) ){
		$sqlCallProcedure = "CALL pRegisterMemberWorkout($loadedMemberId, '$loadedMemberType', '$loadedMonthlyStatus', '$serviceType', $loadedAmountDue, '$amountPaid', '$otherInfo', $dateMStart, $dateMEnd, $loginUserId)";
		//echo  $sqlCallProcedure;

		mysqli_query($conn, $sqlCallProcedure);
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);
		
		if(0 < $errNo){
			if($errNo == 1062)
				header('HTTP/1.0 500 Cannot allow registering workout too soon.');
			else
				header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
			exit(0);
		}
		else {
			echo "Successfully registered workout!";
		}
	}
	
	exit(0);
?>