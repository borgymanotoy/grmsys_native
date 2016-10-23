<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$username = mysqli_real_escape_string($conn, $_POST['susername']);
	$password = mysqli_real_escape_string($conn, $_POST['currentPassword']);
	$newPassword = mysqli_real_escape_string($conn, $_POST['newPassword']);	

	if( !empty($password) && !empty($newPassword) ){
		$encryptedPW = md5($password);
		$encryptedNPW = md5($newPassword);

		//1. SQL Select: Get Administrator record using username = 'administrator'
		$sqlCheckAdmin = "  SELECT u.password FROM user u WHERE u.username = 'administrator' LIMIT 1;";
		if ($result=mysqli_query($conn,$sqlCheckAdmin)){
			$row = mysqli_fetch_assoc($result);
			if ($row['password'] == $encryptedPW){
				$sqlUpdateUserPass = "UPDATE user SET password = '$encryptedNPW' WHERE username = '$username'";
				$successAddUpdate = mysqli_query($conn, $sqlUpdateUserPass) or die("Query fail: " . $sqlUpdateUserPass);
				if(!$successAddUpdate) $has_error = true;
			}
		}

		//2. Check administrator's password if equals to $encryptedPW
		//3. If same (OK), encrypt new password using md5() then update administrator record

	}

	$has_error = false;

	if($has_error)
		header('HTTP/1.0 500 Error updating user password!');
	else
		echo "Successfully updated user password!";	
?>