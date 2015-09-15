<?php
	require_once('libs/dbconnect.php');

	/* prevent direct access to this page */
	$isAjax = isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND
	strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
	if(!$isAjax) {
	$user_error = 'Access denied - direct call is not allowed...';
	trigger_error($user_error, E_USER_ERROR);
	}
	ini_set('display_errors',1);

	// if the 'term' variable is not sent with the request, exit
	if ( !isset($_REQUEST['term']) ) exit;

	/* retrieve the search term that autocomplete sends */
	$term = trim(strip_tags($_GET['term'])); 

	/* replace multiple spaces with one */
	$term = preg_replace('/\s+/', ' ', $term);
	$data = array();

	$a_json_invalid = array(array("id" => "#", "value" => $term, "label" => "Only letters and digits are permitted..."));
	$json_invalid = json_encode($a_json_invalid);
	
	/* SECURITY HOLE *************************************************************** */
	/* allow space, any unicode letter and digit, underscore and dash                */
	if(preg_match("/[^\040\pL\pN_-]/u", $term)) {
		print $json_invalid;
		exit;
	}
	/* ***************************************************************************** */

	$sqlQuery = " SELECT vi.item_id, vi.item_name FROM vw_items vi WHERE CONCAT(vi.item_id, ' ', vi.item_name) LIKE '%$term%' order by vi.item_name";
	if($rs = mysqli_query($conn, $sqlQuery)){
		while($row = mysqli_fetch_array($rs)){
			$itemId = htmlentities(stripslashes($row['item_id']));
			$itemName = htmlentities(stripslashes($row['item_name']));
			
			$data[] = array(
				'label' => $itemName,
				'value' => $itemId
			);
		}
		
		// jQuery wants JSON data
		echo json_encode($data);
		flush();
		
		mysqli_close($conn);
	}
?>