<?php 

    require_once('libs/dbconnect.php');

    session_start();

    $typeCode = mysqli_real_escape_string($conn, $_POST['typeCode']);
    $typeName = mysqli_real_escape_string($conn, $_POST['typeName']);
    $otherInfo = mysqli_real_escape_string($conn, $_POST['otherInfo']);
    $loginUserId = mysqli_real_escape_string($conn, $_SESSION['user_id']);

    $itemId = empty($itemId) ? -1 : $itemId;
    if(!empty($itemPrice)){
        $itemPrice = str_replace(',', '', $itemPrice);
    }
    $typeOccurenceCount = 0;
    $sqlCheckTypeExists = "SELECT * FROM role_type WHERE type_code = '" . $typeCode . "'";
    if ($result=mysqli_query($conn,$sqlCheckTypeExists)){
        $typeOccurenceCount = mysqli_num_rows($result);
    }

    if(0 < $typeOccurenceCount){
        $sqlRoleType = "UPDATE role_type SET type_name = '$typeName', remarks = '$otherInfo', last_modified_date=now() WHERE type_code = '$typeCode'";
    }
    else {
        $sqlRoleType = "INSERT INTO role_type (type_code, type_name, remarks, user_id, creation_date, last_modified_date) VALUES ('" . $typeCode . "','" . $typeName . "','" . $otherInfo . "','" . $loginUserId . "', now(), now())";
    }

    mysqli_query($conn, $sqlRoleType);
    $errNo  = mysqli_errno($conn);
    $errMSg = mysqli_error($conn);
    
    if(0 < $errNo){
        if($errNo == 1062)
            header('HTTP/1.0 500 Unable to add existing product(item).');
        else
            header('HTTP/1.0 500 DB Error (sql: ' . $sqlRoleType . ')' );
        exit(0);
    }
    else {
        if(0 < $userId)
            echo "Successfully updated item!";
        else
            echo "Successfully registered item!";
    }

    exit(0);
?>