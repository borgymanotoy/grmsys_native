<?php
    require_once('libs/dbconnect.php');

    $typeCode= mysqli_real_escape_string($conn, $_REQUEST['typeCode']);

    $sqlQuery  = " select st.* from role_type st where st.type_code = '$typeCode'";

    if ($result = mysqli_query($conn, $sqlQuery) or die("Query fail: " . $sqlQuery)) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
?>