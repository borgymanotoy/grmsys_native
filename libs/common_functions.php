<?php
	function generateUserCompleteName($user){
		$completeName = null;
		if( !empty($user) ){
			$completeName = $user['firstname'];
			if( !empty($user['middlename']) ){
				$completeName .= ' ' . strtoupper(substr($user['middlename'], 0, 1)) . '. ';
			}
			if( !empty($user['lastname']) ) $completeName .= ' ' . $user['lastname'];
		}

		return $completeName;
	}
	
	function debugDisplaySessionInfo(){
		echo "<p><b>[Username]: </b>" . $_SESSION['username'] . "</p>";
		echo "<p><b>[Password]: </b>" . $_SESSION['password'] . "</p>";
		echo "<p><b>[Name]: </b>" . $_SESSION['name'] . "</p>";
		echo "<p><b>[Contact Number]: </b>" . $_SESSION['contactno'] . "</p>";
		echo "<p><b>[Address]: </b>" . $_SESSION['address'] . "</p>";
		echo "<p><b>[Birthdate]: </b>" . $_SESSION['birthdate'] . "</p>";
		echo "<p><b>[Gender]: </b>" . $_SESSION['gender'] . "</p>";
		echo "<p><b>[Active]: </b>" . $_SESSION['is_active'] . "</p>";
	}
	
	function convertStringToDate($strDate){
		//From: MM-DD-YYYY  To: YYYY-MM-DD
		if($strDate){
			$nfo = explode('-', $strDate);
			$fmtDate = $nfo[1] . '-'. $nfo[0] . '-' . $nfo[2];
			return '\'' . date('Y-m-d',strtotime($fmtDate)) . '\'';
		} 
		return 'null';
	}
	
	function getDisplayRole($roleType){
		switch ($roleType){
			case 'administrator': return ' (Administrator)';
			case 'attendant': return ' (Attendant)';
			default: return '';
		}
	}
?>