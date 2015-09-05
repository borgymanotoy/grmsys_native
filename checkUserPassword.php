<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$username = mysqli_real_escape_string($conn, $_POST['susername']);
	$password = mysqli_real_escape_string($conn, $_POST['currentPassword']);

	$sqlCheckUserAccess = "SELECT fnCheckUserLogin('".trim($username)."', '".trim($password)."') AS has_access";
	$result = mysqli_query($conn, $sqlCheckUserAccess);
	$row = mysqli_fetch_assoc($result);

	if(0 < $row['has_access']){
		echo "true";
	}
	else
		echo "false";
?>