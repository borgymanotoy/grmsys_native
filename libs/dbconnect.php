<?php
	ob_start();

	if( !is_resource($conn) ) {
		$conn = mysqli_connect("localhost:3306","root","root", "grmsys_db") or die ('Error Connectiong to mysql: '.mysqli_error());
		if (mysqli_connect_errno()) {
		    throw new Exception(mysqli_connect_error(), mysqli_connect_errno());
		}
	}
?>