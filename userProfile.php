<?php
    require_once('libs/dbconnect.php');

    session_start();

    $username = $_POST['username'];
    $userId = $_SESSION['user_id'];
    $roleType = $_SESSION['role_type'];

    if($roleType != "Administrator")
        $sqlUserProfile = "SELECT * FROM vw_users WHERE user_id = $userId";
    else
        $sqlUserProfile = "SELECT * FROM vw_administrators WHERE user_id = $userId";

    echo "[userId]: " . $userId;

    $rsUserProfile = mysqli_query($conn, $sqlUserProfile);
    //$row = mysqli_fetch_row($rsUserProfile);
    $row = mysqli_fetch_assoc($rsUserProfile);

    // $sqlUserProfileRole = "SELECT role_type FROM vw_users WHERE user_id = $userId";

    // $rsUserProfileRole = mysqli_query($conn, $sqlUserProfileRole);
    // $rowR = mysqli_fetch_row($rsUserProfileRole);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>(GRMSys): User Registration</title>
        <link type="text/css" rel="stylesheet" href="resources/css/home.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/commons.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/datepicker.css" />
        <link type="text/css" rel="stylesheet" href='resources/css/flat/red.css' media="screen">
        <link type="text/css" rel="stylesheet" href="resources/css/users.css" />
        <link type="text/css" rel="stylesheet" href='resources/css/homeStyleMenu.css'>
        <link type="text/css" rel="stylesheet" href="resources/css/jquery-ui.min.css" />
        <link type="text/css" rel="stylesheet" href="resources/css/jquery-ui.theme.min.css" />

        <script type='text/javascript' src='resources/js/jquery-1.11.1.min.js'></script>
        <script type='text/javascript' src='resources/js/jquery-ui.min.js'></script>
        <script type='text/javascript' src='resources/js/jquery.validate.min.js'></script>
        <script type='text/javascript' src='resources/js/zebra_datepicker.src.js'></script>
        <script type='text/javascript' src='resources/js/icheck.min.js'></script>
        <script type='text/javascript' src='resources/js/jquery.mask.min.js'></script>
        <script type='text/javascript' src='resources/js/common.js'></script>
        <script type='text/javascript' src='resources/js/userRegistration.js'></script>
        <script type="text/javascript">
            var roleType = "<?php echo $_SESSION['role_type']; ?>";
            var isActivated = "<?php echo $_SESSION['is_activated']; ?>";
            $(document).ready(function(){
                initUserComponents("<?php echo $row['role_type']; ?>");
                refreshUsersList();

                $('#hdnRoleType').val(roleType);
                $('#selRoleype').attr("disabled", true); 
                $('#selRoleype').on('change', function(){
                    $('#hdnRoleType').val($(this).val());
                });

                if('administrator' != roleType && 0 == isActivated){
                    $('#txtUserId, #txtFirstname, #txtLastname, #txtMiddlename, #txtContactNo, #txtAddress, #txtBirthdate, #txtQuestion1,#txtQuestion2,#txtQuestion3,#txtAnswer1,#txtAnswer2,#txtAnswer3').prop('readonly', true);
                    $('#txtPassword, #txtConfirmPassword').css("background-color","tomato");
                    $('#txtPassword').focus();
                }
                else if('administrator' != roleType){
                    $('#txtUserId, #txtFirstname, #txtLastname, #txtMiddlename, #txtContactNo, #txtAddress, #txtBirthdate,#txtQuestion1,#txtQuestion2,#txtQuestion3,#txtAnswer1,#txtAnswer2,#txtAnswer3').prop('readonly', true);
                    $('#txtPassword, #txtConfirmPassword').css("background-color","tomato");
                    $('#txtPassword').focus();
                }
            });
        </script>
    </head>
    <body>
        <div class="headerContainer" title="Return to home page">
            <div class="headerIconLabel">
                <img src="resources/images/icons/user.png" class="headerSmallImage" alt="Members" />
                <span>User Registration</span>
            </div>
            <div class="headerLogout" title="Logout">
                <a href="javascript:void(0);" onclick="location.href='logout.php'">
                    <span>Logout</span>
                    <img src="resources/images/icons/exit.png" class="headerMenuImage" alt="Logout" title="Logout" />
                </a>
            </div>
        </div>
        <?php include('pages/_home_menu.html'); ?>
        <div class="userPageContainer">
            <div class="userContainer">
                <span id="spanUserStatus" class="success"></span>
                <form id="formUser" name="formUser" method="post" action="">
                    <input type="hidden" id="hdnIsActivated" name="isActivated" value="<?php echo $row['is_activated']; ?>">
                    <div class="parentContainer">
                        <div class="userInfoContainer">
                            <p>
                                <label for="txtUserId">Identification No.:</label>
                                <input type="text" id="txtUserId" name="userId" value="<?php echo $row['user_id']; ?>" placeholder="0" title="User Identification" readonly="true" />
                            </p>  
                            <p>
                                <label for="txtFirstname">Firstname:</label>
                                <input type="text" id="txtFirstname" name="firstname" value="<?php echo $row['firstname']; ?>" placeholder="Juan" title="User Firstname" />
                            </p>
                            <p>
                                <label for="txtLastname">Lastname:</label>
                                <input type="text" id="txtLastname" name="lastname" value="<?php echo $row['lastname']; ?>" placeholder="Dela Cruz" title="User Lastname" />
                            </p>
                            <p>
                                <label for="txtMiddlename">Middlename:</label>
                                <input type="text" id="txtMiddlename" name="middlename" value="<?php echo $row['middlename']; ?>" placeholder="Dimaloko" title="User Middlename" />
                            </p>
                            <p>
                                <label for="txtContactNo">Contact Number:</label>
                                <input type="text" id="txtContactNo" name="contactNo" value="<?php echo $row['contactno']; ?>" class="contactno" placeholder="(918) 123-4567" title="User Contact Number" />
                            </p>
                            <p>
                                <label for="txtAddress">Address:</label>
                                <textarea id="txtAddress" name="address" cols="45" rows="5" placeholder="Address" title="User Address"><?php echo $row['address']; ?></textarea>
                            </p>
                            <p>
                                <label for="txtBirthdate">Birthday:</label>
                                <input type="text" id="txtBirthdate" name="birthday" value="<?php echo $row['birthdate']; ?>" class="dateField" placeholder="Select Date" title="User Birthday" />
                            </p>
                            <p>
                                <div class="genderContainer">
                                    <input type="radio" id="rdbGenderMale" name="gender" value="<?php echo $row['gender']; ?>" value="M" class="myRadioButtons" checked />
                                    <label for="rdbGenderMale" class="choiceLabel">Male:</label>
                                    <input type="radio" id="rdbGenderFemale" name="gender" value="<?php echo $row['gender']; ?>" value="F" class="myRadioButtons" />
                                    <label for="rdbGenderFemale" class="choiceLabel">Female:</label>
                                </div>
                            </p>
                            <p class="roleTypeContainer">
                                <input type="hidden" id="hdnRoleType" name="roleType" value="" />
                                <label for="selRoleype" class="selectLabel">Role Type:</label>
                                <select id="selRoleype" name="roleType"></select>
                            </p>
                            <div id="divSecurity">
                                <p>
                                    <label for="txtUsername" class="UserLabel">Username:</label>
                                    <input type="text" id="txtUsername" name="username" value="<?php echo $row['username']; ?>" placeholder="username" title="User Username" />
                                </p>
                                <p>
                                    <label for="txtPassword" class="UserLabel">Password:</label>
                                    <input type="password" id="txtPassword" name="password" title="User Password" />
                                </p>
                                <p>
                                    <label for="txtConfirmPassword" class="UserLabel">Confirm Password:</label>
                                    <input type="password" id="txtConfirmPassword" name="confirmpassword" title="Confirm Password" />
                                <!-- <?php echo "[SQL]: " . $roleType; ?> -->
                                </p>
                                <p>
                                    <label for="txtQuestion1" class="UserLabel">Question 1:</label>
                                    <input type="text" id="txtQuestion1" name="question1" title="Question 1" value="<?php echo $row['question1']; ?>"/>
                                </p>
                                <p>
                                    <label for="txtAnswer1" class="UserLabel">Answer 1:</label>
                                    <input type="text" id="txtAnswer1" name="answer1" title="Answer 1" value="<?php echo $row['answer1']; ?>" />
                                </p>
                                <p>
                                    <label for="txtQuestion2" class="UserLabel">Question 2:</label>
                                    <input type="text" id="txtQuestion2" name="question2" title="Question 2" value="<?php echo $row['question2']; ?>" />
                                </p>
                                <p>
                                    <label for="txtAnswer2" class="UserLabel">Answer 2:</label>
                                    <input type="text" id="txtAnswer2" name="answer2" title="Answer 2" value="<?php echo $row['answer2']; ?>"/>
                                </p>
                                <p>
                                    <label for="txtQuestion3" class="UserLabel">Question 3:</label>
                                    <input type="text" id="txtQuestion3" name="question3" title="Question 3" value="<?php echo $row['question3']; ?>" />
                                </p>
                                <p>
                                    <label for="txtAnswer3" class="UserLabel">Answer 3:</label>
                                    <input type="text" id="txtAnswer3" name="answer3" title="Answer 3" value="<?php echo $row['answer3']; ?>"/>
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="buttonContainer">
                    <button class="submitButton" onclick="addUpdateUser()">Save</button>
                </div>
            </div>
        </div>
        <div class="footerContainer3">
            <span class="footer left">Welcome <b><?php echo $_SESSION['name']; ?></b><?php echo $_SESSION['display_role_type']; ?> !</span>
            <span class="footer right"><b>Gym Records Management System (Version 0.0.1)</b></span>
        </div>
        <div id="dialog-box"></div>
    </body>
</html>
