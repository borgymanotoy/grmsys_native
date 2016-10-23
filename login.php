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
		//$sql = "SELECT fnCheckUserLogin('" . $username . "', '" . $password . "') AS has_access";
		$sql = "SELECT id, username, password, firstname, lastname, middlename, contactno, address, birthdate, gender, is_active, role_type, is_activated FROM user WHERE username = '" . $username . "'";
		$result = mysqli_query($conn, $sql);
		$row = mysqli_fetch_assoc($result);

		//echo "[sqlUser]: " . $sql;

		if($username == $row['username']){
			
			if ( md5($password) == $row['password']) {
				$isValid = true;
				
				$_SESSION['user_id'] = $row['id'];
				$_SESSION['username'] = $row['username'];
				$_SESSION['password'] = $row['password'];
				$_SESSION['name'] = generateUserCompleteName($row);
				if( !empty($row['contactno']) ) $_SESSION['contactno'] = $row['contactno'];
				if( !empty($row['address']) ) $_SESSION['address'] = $row['address'];
				if( !empty($row['birthdate']) ) $_SESSION['birthdate'] = $row['birthdate'];
				$_SESSION['gender'] = $row['gender'];
				$_SESSION['is_activated'] = $row['is_activated'];
				$_SESSION['activation_date'] = $row['activation_date'];
				$_SESSION['is_active'] = $row['is_active'];
				$_SESSION['role_type'] = $row['role_type'];
				$_SESSION['display_role_type'] = getDisplayRole($row['role_type']);
			}
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