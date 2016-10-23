<?php 
	require_once('libs/dbconnect.php');
	require_once('libs/common_functions.php');

	session_start();

	$memberId = mysqli_real_escape_string($conn, $_POST['memberId']);
	$firstname = mysqli_real_escape_string($conn, $_POST['firstname']);
	$lastname = mysqli_real_escape_string($conn, $_POST['lastname']);
	$middlename = mysqli_real_escape_string($conn, $_POST['middlename']);
	$address = mysqli_real_escape_string($conn, $_POST['address']);
	$contactNo = mysqli_real_escape_string($conn, $_POST['contactNo']);

	$emergencyContactPerson = mysqli_real_escape_string($conn, $_POST['emergencyContactPerson']);
	$emergencyContactNumber = mysqli_real_escape_string($conn, $_POST['emergencyContactNumber']);
	$emergencyContactRelationship = mysqli_real_escape_string($conn, $_POST['emergencyContactRelationship']);

	$birthdate = mysqli_real_escape_string($conn, $_POST['birthdate']);
	$memberStart = mysqli_real_escape_string($conn, $_POST['memberStart']);
	$memberEnd = mysqli_real_escape_string($conn, $_POST['memberEnd']);
	
	$gender = mysqli_real_escape_string($conn, $_POST['gender']);
	$member_type = mysqli_real_escape_string($conn, $_POST['type']);
	$has_discount = mysqli_real_escape_string($conn, $_POST['discounted']);
	$service_type = mysqli_real_escape_string($conn, $_POST['serviceType']);

	$dateBirth = convertStringToDate($birthdate);
	$dateMStart = convertStringToDate($memberStart);
	$dateMEnd = convertStringToDate($memberEnd);

	$memberId = empty($memberId) ? -1 : $memberId;
	$loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);


	if (0 < $memberId) {
		$sqlMember = "UPDATE member SET firstname = '$firstname', lastname = '$lastname', middlename = '$middlename', contactno = '$contactNo', address = '$address'";
		if( isset($dateBirth) ){
			$sqlMember .= ", birthdate = '$birthdate'";
		}
		$sqlMember .= ", gender = '$gender', emergency_contact_person = '$emergencyContactPerson', emergency_contact_number = '$emergencyContactNumber', emergency_contact_relationship = '$emergencyContactRelationship', last_modified_date=now() WHERE id = $memberId";

		$sqlMemberType = " UPDATE membership_type SET type = '$member_type', discounted = '$has_discount', service_type = '$service_type'";
		$sqlMemberType .= ", last_modified_date=now() WHERE id = $memberId ";
		if ($member_type == 'Monthly' && !IS_NULL($dateMStart) && !IS_NULL($dateMEnd)){
			$sqlUpdateMemberType = "UPDATE membership_type SET monthly_startdate = '$dateMStart', monthly_enddate = '$dateMEnd', last_modified_date=now() WHERE id = $memberId";
		}
		else {
			$sqlUpdateMemberType = "UPDATE membership_type SET monthly_startdate=null, monthly_enddate=null, last_modified_date=now() WHERE id = $memberId";
		}

		if(!empty($sqlMember)){

			//Update Member
			mysqli_query($conn, $sqlMember);
			$errNo1  = mysqli_errno($conn);
			$errMSg1 = mysqli_error($conn);

			if(0 < $errNo1){
				header('HTTP/1.0 500 DB Error (' . $errNo1 . ': ' . $errMSg1. ').' );
				exit(0);
			}
			else {
				//Update Member Type 1
				mysqli_query($conn, $sqlMemberType);
				$errNo2  = mysqli_errno($conn);
				$errMSg2 = mysqli_error($conn);
				if(0 < $errNo2){
					header('HTTP/1.0 500 DB Error (' . $errNo2 . ': ' . $errMSg2. ').' );
					exit(0);
				}
				else{
					//Update Member Type 2
					mysqli_query($conn, $sqlUpdateMemberType);
					$errNo3  = mysqli_errno($conn);
					$errMSg3 = mysqli_error($conn);
					if(0 < $errNo3){
						header('HTTP/1.0 500 DB Error (' . $errNo3 . ': ' . $errMSg3 . ').' );
						exit(0);
					}
					else{
						echo "Successfully updated member!";
					}
				}


			}
		}

	}
	else {
		$sqlMember = "INSERT INTO member (firstname, lastname, middlename, contactno, address, birthdate";
		$sqlMember .= ", gender, emergency_contact_person, emergency_contact_number, emergency_contact_relationship, user_id, creation_date, last_modified_date";
		$sqlMember .= ") VALUES ('" . $firstname . "','" . $lastname . "','" . $middlename . "','" . $contactNo . "','" . $address . "', " . $dateBirth;
		$sqlMember .=" ,'" . $gender . "','" . $emergencyContactPerson . "','" . $emergencyContactNumber . "','" . $emergencyContactRelationship . "','" . $loginUserId . "', now(), now())";

		if(!empty($sqlMember)){

			//echo "[sql-member]: " . $sqlMember;

			mysqli_query($conn, $sqlMember);
			$errNo1  = mysqli_errno($conn);
			$errMSg1 = mysqli_error($conn);


			if(0 < $errNo1){
				if($errNo1 == 1062)
					header('HTTP/1.0 500 Unable to add existing member.');
				else
					header('HTTP/1.0 500 DB Error (' . $errNo1 . ': ' . $errMSg1. ').' );
				exit(0);
			}
			else {
				$memberId = mysqli_insert_id($conn);

				$sqlMemberType = "INSERT INTO membership_type (member_id, type, discounted, service_type";
				if ($member_type == 'Monthly' && !IS_NULL($dateMStart)){
					$sqlMemberType .= ", monthly_startdate";
				}
				if ($member_type == 'Monthly' && !IS_NULL($dateMEnd)){
					$sqlMemberType .= ", monthly_enddate";
				}

				$sqlMemberType .= ", user_id, creation_date, last_modified_date) VALUES ('" . $memberId . "'";
				$sqlMemberType .= ", '" . $member_type . "', '" . $has_discount . "', '" . $service_type . "'";
				if ($member_type == 'Monthly' && !IS_NULL($dateMStart)){
					$sqlMemberType .= ", " . $dateMStart;
				}
				if ($member_type == 'Monthly' && !IS_NULL($dateMEnd)){
					$sqlMemberType .= ", " . $dateMEnd;
				}
				$sqlMemberType .= ", '" . $loginUserId . "', now(), now())";

				//echo "[sql-member-type]: " . $sqlMemberType;

				mysqli_query($conn, $sqlMemberType);
				$errNo2  = mysqli_errno($conn);
				$errMSg2 = mysqli_error($conn);
				if(0 < $errNo2){
					if($errNo2 == 1062)
						header('HTTP/1.0 500 Unable to add existing member.');
					else
						header('HTTP/1.0 500 DB Error (' . $errNo2 . ': ' . $errMSg2. ').' );
					exit(0);
				}
				else{
					echo "Successfully registered member!";
				}
			}

		}
	}

	exit(0);
?>