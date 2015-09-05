<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$username = mysqli_real_escape_string($conn, $_POST['susername']);
	$password = mysqli_real_escape_string($conn, $_POST['currentPassword']);
	$newpassword = mysqli_real_escape_string($conn, $_POST['newPassword']);	

	$has_error = false;
	$sqlCallProcedure = "CALL pUpdateUserPassword('$username', '$password', '$newpassword')";
	$successAddUpdate = mysqli_query($conn, $sqlCallProcedure) or die("Query fail: " . $sqlCallProcedure);
	if(!$successAddUpdate) $has_error = true;

	if($has_error)
		header('HTTP/1.0 500 Error updating user password!');
	else
		echo "Successfully updated user password!";	
?>