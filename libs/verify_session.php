<?php
	session_start();

	/*
	echo "<p><b>[Session ID]: </b>" . session_id() . "</p>";	
	echo "<p><b>[Username]: </b>" . $_SESSION['username'] . "</p>";
	echo "<p><b>[Password]: </b>" . $_SESSION['password'] . "</p>";
	echo "<p><b>[Name]: </b>" . $_SESSION['name'] . "</p>";
	echo "<p><b>[Contact Number]: </b>" . $_SESSION['contactno'] . "</p>";
	echo "<p><b>[Address]: </b>" . $_SESSION['address'] . "</p>";
	echo "<p><b>[Birthdate]: </b>" . $_SESSION['birthdate'] . "</p>";
	echo "<p><b>[Gender]: </b>" . $_SESSION['gender'] . "</p>";
	echo "<p><b>[Active]: </b>" . $_SESSION['is_active'] . "</p>";
	*/

	if( !isset( $_SESSION['username'] ) ) {
		header('location:../index.php');
	}
?>