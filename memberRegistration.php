<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	session_start();

	$memberId = mysqli_real_escape_string($conn, $_POST['memberId']);
	$firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
	$lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
	$middlename = mysqli_real_escape_string($conn, $_POST['middlename']);
	$address = mysqli_real_escape_string($conn, $_POST['address']);
	$contactNo = mysqli_real_escape_string($conn, $_POST['contactNo']);

	$emergencyContactPerson = mysqli_real_escape_string($conn, $_POST['emergencyContactPerson']);
	$emergencyContactNumber = mysqli_real_escape_string($conn, $_POST['emergencyContactNumber']);
	$emergencyContactRelationship = mysqli_real_escape_string($conn, $_POST['emergencyContactRelationship']);

	$birthdate = mysqli_real_escape_string($conn, $_POST['birthdate']);
	$memberStart = mysqli_real_escape_string($conn, $_POST['memberStart']);
	$memberEnd = mysqli_real_escape_string($conn, $_POST['memberEnd']);
	
	$gender = mysqli_real_escape_string($conn, $_POST['gender']);
	$membership_type = mysqli_real_escape_string($conn, $_POST['type']);
	$has_discount = mysqli_real_escape_string($conn, $_POST['discounted']);
	$service_type = mysqli_real_escape_string($conn, $_POST['serviceType']);

	$dateBirth = convertStringToDate($birthdate);
	$dateMStart = convertStringToDate($memberStart);
	$dateMEnd = convertStringToDate($memberEnd);

	$memberId = empty($memberId) ? -1 : $memberId;
	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

	$sqlCallProcedure = "CALL pAddOrUpdateMemberInfo($memberId, '$firstname', '$lastname', '$middlename', '$contactNo', '$address', $dateBirth, '$gender', '$emergencyContactPerson', '$emergencyContactNumber', '$emergencyContactRelationship', '$membership_type', '$has_discount', '$service_type', $dateMStart, $dateMEnd, '$loginUserId')";

	//echo  $sqlCallProcedure;

	mysqli_query($conn, $sqlCallProcedure);
	$errNo  = mysqli_errno($conn);
	$errMSg = mysqli_error($conn);
	
	if(0 < $errNo){
		if($errNo == 1062)
			header('HTTP/1.0 500 Unable to add existing member.');
		else
			header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ')' );
		exit(0);
	}
	else {
		if(0 < $memberId)
			echo "Successfully updated member!";
		else
			echo "Successfully registered member!";
	}
	
	exit(0);
?>