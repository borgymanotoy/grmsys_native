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
	
	$time = strtotime( $birthday );	
	$dateBirth = date( 'y-m-d', $time );
	
	//run the store proc
	$successAddUpdate = mysqli_query($conn, "CALL pAddOrUpdateUser($userId, '$username', '$password', '$firstname', '$lastname', '$middlename', '$contactNo', '$address', $dateBirth, '$gender')") or die("Query fail: " . mysqli_error());
	if($successAddUpdate){
		
	}
	else {
		header('HTTP/1.0 500 Error in adding or updating user info.');
	}
	

?>