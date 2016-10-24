<?php
	ob_start();

	if( !is_resource($conn) ) {
		//MaDz: Connection
		$conn = mysqli_connect("localhost", "root", "r00t1f13d", "grmsys_db", "3333") or die ('Error Connecting to mysql: '. mysqli_error());
		
		//Patrick: Connection
		//$conn = mysqli_connect("localhost:3306","root","root", "grmsys_db") or die ('Error Connectiong to mysql: '.mysqli_error());
		if (mysqli_connect_errno()) {
		    throw new Exception(mysqli_connect_error(), mysqli_connect_errno());
		}
	}
?>