<?php
    require_once('libs/dbconnect.php');

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $answer1 = mysqli_real_escape_string($conn, $_POST['answer1']);
    $answer2 = mysqli_real_escape_string($conn, $_POST['answer2']);
    $answer3 = mysqli_real_escape_string($conn, $_POST['answer3']);

    // echo "[A]" . "<br>";

    if (!empty($username)){
        
        $sqlUsername = "SELECT * FROM vw_users WHERE username = '" . $username . "'";
        $result = mysqli_query($conn, $sqlUsername);
        $row = mysqli_fetch_assoc($result);

        if($username == $row['username']){
                echo "[C]";
            if($row['answer1'] == $answer1 && $row['answer2'] == $answer2 && $row['answer3'] == $answer3){
                header('Location:userProfile.php');
            }
            else{
                header('Location:index1.php');
            }
        }
    }
    else{
        header('Location:index1.php');
    }


?>