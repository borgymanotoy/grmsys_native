<?php
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	$userId = mysqli_real_escape_string($conn, $_POST['userId']);
	$username = mysqli_real_escape_string($conn, $_POST['username']);
	$password = mysqli_real_escape_string($conn, $_POST['password']);
	$firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
	$lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
	$middlename = mysqli_real_escape_string($conn, $_POST['middlename']);
	$address = mysqli_real_escape_string($conn, $_POST['address']);
	$contactNo = mysqli_real_escape_string($conn, $_POST['contactNo']);
	$birthday = mysqli_real_escape_string($conn, $_POST['birthday']);
	$gender = mysqli_real_escape_string($conn, $_POST['gender']);
	$role_type = mysqli_real_escape_string($conn, $_POST['roleType']);
	$question1 = mysqli_real_escape_string($conn, $_POST['question1']);
	$answer1 = mysqli_real_escape_string($conn, $_POST['answer1']);
	$question2 = mysqli_real_escape_string($conn, $_POST['question2']);
	$answer2 = mysqli_real_escape_string($conn, $_POST['answer2']);
	$question3 = mysqli_real_escape_string($conn, $_POST['question3']);
	$answer3 = mysqli_real_escape_string($conn, $_POST['answer3']);


	$dateBirth = date($birthday);

	//Get isActivated parameter value
	$isActivated = mysqli_real_escape_string($conn, $_POST['isActivated']);

	$userId = empty($userId) ? -1 : $userId;

	if(0 < $userId){
		//Existing User

		if($role_type != "Administrator" && (0 == $isActivated || !$isActivated) )
			$sqlUser = "UPDATE user SET username = '$username', password = md5('$password'), firstname = '$firstname', lastname = '$lastname', middlename = '$middlename', contactNo = '$contactNo', address = '$address', birthdate = '$dateBirth', gender = '$gender', role_type = '$role_type', question1 = '$question1', answer1 = '$answer1', question2 = '$question2', answer2 = '$answer2', question3 = '$question3', answer3 = '$answer3', is_activated = '1', activation_date = now(), last_modified_date=now() WHERE id = $userId";
		else
			$sqlUser = "UPDATE user SET username = '$username', password = md5('$password'), firstname = '$firstname', lastname = '$lastname', middlename = '$middlename', contactNo = '$contactNo', address = '$address', birthdate = '$dateBirth', gender = '$gender', role_type = '$role_type', question1 = '$question1', answer1 = '$answer1', question2 = '$question2', answer2 = '$answer2', question3 = '$question3', answer3 = '$answer3', last_modified_date=now() WHERE id = $userId";
	}
	else {
		$sqlUser = "INSERT INTO user (username, password, firstname, lastname, middlename, contactNo, address, birthdate, gender, role_type, question1, answer1, question2, answer2, question3, answer3, creation_date, last_modified_date) VALUES ('" . $username . "',md5('" . $password . "'),'" . $firstname . "','" . $lastname . "','" . $middlename . "','" . $contactNo . "','" . $address . "','" . $dateBirth . "','" . $gender . "','" . $role_type . "','" . $question1 . "','" . $answer1 . "','" . $question2 . "','" . $answer2 . "','" . $question3 . "','" . $answer3 . "', now(), now())";
	}

	if(!empty($sqlUser)){

		mysqli_query($conn, $sqlUser);
		$errNo  = mysqli_errno($conn);
		$errMSg = mysqli_error($conn);

		if(0 < $errNo){
			if($errNo == 1062)
				header('HTTP/1.0 500 Unable to add existing user.');
		else
				header('HTTP/1.0 500 DB Error (' . $errNo . ': ' . $errMSg. ').' );
		exit(0);
		}
		else {
			if(0 < $userId)
				echo "Successfully updated user!";
		else
				echo "Successfully registered user!";
		}
	}

	exit(0);

?>