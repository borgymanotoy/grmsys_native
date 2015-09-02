<?php 
	require_once('libs/dbconnect.php');

	$userId = mysqli_real_escape_string($conn, $_POST['userId']);
	$username = mysqli_real_escape_string($conn, $_POST['username']);
	$password = mysqli_real_escape_string($conn, $_POST['password']);	
	
	$firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
	$lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
	$middlename = mysqli_real_escape_string($conn, $_POST['middlename']);
	$address = mysqli_real_escape_string($conn, $_POST['address']);
	$contactNo = mysqli_real_escape_string($conn, $_POST['contactNo']);
	$birthday = mysqli_real_escape_string($conn, $_POST['birthday']);
	$gender = mysqli_real_escape_string($conn, $_POST['gender']);

	$time = strtotime($birthday);
	$dateBirth = date('Y-m-d', $time);

	$userId = empty($userId) ? -1 : $userId;

	$sqlCallProcedure = "CALL pAddOrUpdateUser($userId, '$username', '$password', '$firstname', '$lastname', '$middlename', '$contactNo', '$address', '$dateBirth', '$gender')";

//*
	//run the store proc
	$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
	if($successAddUpdate){
		if(0 < $userId)
			echo "Successfully updated user!";
		else
			echo "Successfully registered user!";
	}
	else {
		header('HTTP/1.0 500 Error in adding or updating user info.');
	}
//*/	

?>