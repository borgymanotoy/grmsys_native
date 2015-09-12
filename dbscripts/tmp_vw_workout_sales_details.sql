SELECT
  ws.id AS id,
  ws.workout_date AS workout_date,
  ws.member_id AS member_id,
  m.firstname,
  m.lastname,
  m.middlename,
  TRIM(CONCAT(IFNULL(m.firstname, ''), ' ', IF((m.middlename IS NOT NULL), CONCAT(SUBSTR(m.middlename, 1, 1), '. '), ''), IFNULL(m.lastname, ''))) AS member_name,
  m.contactno,
  m.address,
  m.birthdate, 
  m.gender,
  ws.service_type AS service_type,
  st.type_name AS service_type_name,
  IF((NOW() BETWEEN mt.monthly_startdate AND mt.monthly_enddate), 'Monthly', 'Daily') AS member_type,
  IF(mt.discounted, 'Yes', 'No') AS has_discount,
  mt.monthly_startdate AS monthly_startdate,
  mt.monthly_enddate AS monthly_enddate,
  ws.rendered_amount AS rendered_amount,
  ws.other_info,
  ws.paid,
  ws.user_id AS user_id
FROM workout_sales ws
INNER JOIN member m ON m.id = ws.member_id
INNER JOIN membership_type mt ON mt.member_id = m.id
INNER JOIN user u ON u.id = ws.user_id
INNER JOIN service_type st ON st.type_code = ws.service_type