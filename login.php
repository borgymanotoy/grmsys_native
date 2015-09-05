<?php 
	//require_once( $_SERVER['DOCUMENT_ROOT']."/libs/verify_session.php" );
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');
	
	session_start();

	$username = $_POST['username']; 
	$password = $_POST['password'];
	$isValid = false;
	
	if( !empty($username) && !empty($password) ){
		//Check if username and password is valid from DB
		$escaped_password = mysqli_real_escape_string($conn, $password);
		$sql = "SELECT fnCheckUserLogin('" . $username . "', '" . $password . "') AS has_access";
		$result = mysqli_query($conn, $sql);
		$row = mysqli_fetch_assoc($result);

		if(0 < $row['has_access']){
			$isValid = true;

			//Store user info to session
			$sqlUser = "SELECT * FROM USER WHERE username = '".$username."'";
			$rsUser = mysqli_query($conn, $sqlUser);
			$user = mysqli_fetch_assoc($rsUser);
			$_SESSION['user_id'] = $user['id'];
			$_SESSION['username'] = $user['username'];
			$_SESSION['password'] = $user['password'];
			$_SESSION['name'] = generateUserCompleteName($user);
			if( !empty($user['contactno']) ) $_SESSION['contactno'] = $user['contactno'];
			if( !empty($user['address']) ) $_SESSION['address'] = $user['address'];
			if( !empty($user['birthdate']) ) $_SESSION['birthdate'] = $user['birthdate'];
			$_SESSION['gender'] = $user['gender'];
			$_SESSION['is_active'] = $user['is_active'];
			$_SESSION['role_type'] = $user['role_type'];
			$_SESSION['display_role_type'] = getDisplayRole($user['role_type']);
		}
	}

	if(!$isValid){
		//Return 401 (Unauthorized) Status
		http_response_code(401);
		header('location:index.php?success=false');
	}
	else {
		//debugDisplaySessionInfo();
		header('location:home.php');
		session_write_close();
	}
	
	exit();
?>