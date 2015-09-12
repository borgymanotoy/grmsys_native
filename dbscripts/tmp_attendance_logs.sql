-- SELECT vwsd.* FROM vw_workout_sales_details vwsd;

SELECT * FROM (
    SELECT 
      ws.id, 
      TRIM(CONCAT(IFNULL(m.firstname, ''), ' ', IF((m.middlename IS NOT NULL), CONCAT(SUBSTR(m.middlename, 1, 1), '. '), ''), IFNULL(m.lastname, ''))) AS member_name,
      st.type_name service_type_name, 
      mt.type membership_type, 
      ws.rendered_amount,
      DATE_FORMAT(ws.creation_date, '%r') AS workout_time
    FROM workout_sales ws
    INNER JOIN service_type st ON st.type_code = ws.service_type
    INNER JOIN `member` m ON m.id = ws.member_id
    INNER JOIN `membership_type` `mt` ON ws.`member_id` = `mt`.member_id
) A
ORDER BY A.workout_time ASC
 