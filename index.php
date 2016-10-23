<?php
	//require_once('libs/common_functions.php');

	$success = $_REQUEST['success'];
	
	$statusMsg = null;
	
	if( !empty($success) ){
		$statusMsg = "Access Denied: Invalid Username/Password.";
	}

	include('pages/login.html');
?>