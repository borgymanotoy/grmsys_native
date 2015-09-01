<?php 
	require_once('libs/dbconnect.php');

	/*
	address: Davao City, Philippines
	birthday: 05-20-1981
	contactNo: (0920) 987-1234
	firstname: Juan
	gender: Male
	lastname: Dela Cruz
	middlename: Pedrito
	password: password
	userId: 0
	username: juandelacruz
	*/

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

	$sqlCallProcedure = "CALL pAddMemberInfo($userId, '$username', '$password', '$firstname', '$lastname', '$middlename', '$contactNo', '$address', '$dateBirth', '$gender')";

//*
	//run the store proc
	$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
	if($successAddUpdate){
		if(0 < $userId)
			echo "Successfully updated member!";
		else
			echo "Successfully registered member!";
	}
	else {
		header('HTTP/1.0 500 Error in adding or updating member info.');
	}
//*/	

?>