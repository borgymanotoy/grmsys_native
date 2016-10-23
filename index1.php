<?php
    //require_once('libs/common_functions.php');

    $success = $_REQUEST['success'];
    
    $statusMsg = null;
    
    if( !empty($success) ){
        $statusMsg = "wrong answer.";
    }

    include('pages/login.html');
?>