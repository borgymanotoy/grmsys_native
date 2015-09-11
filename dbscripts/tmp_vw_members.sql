SELECT
  m.id AS member_id,
  m.firstname AS firstname,
  m.lastname AS lastname,
  m.middlename AS middlename,
  TRIM(CONCAT(IFNULL(m.firstname, ''), ' ', IF((m.middlename IS NOT NULL), CONCAT(SUBSTR(m.middlename, 1, 1), '. '), ''), IFNULL(m.lastname, ''))) AS member_name,
  m.contactno AS contactno,
  m.address AS address,
  m.birthdate AS birthdate,
  m.gender AS gender,
  m.emergency_contact_person AS emergency_contact_person,
  m.emergency_contact_number AS emergency_contact_number,
  m.emergency_contact_relationship AS emergency_contact_relationship,
  st.type_code AS service_type_code,
  st.type_name AS service_type,
  mt.monthly_startdate AS monthly_startdate,
  mt.monthly_enddate AS monthly_enddate,
  IF(NOW() BETWEEN mt.monthly_startdate AND mt.monthly_enddate, 'Month', 'Daily') AS member_type,
  IF(mt.discounted, 'Yes', 'No') AS has_discount,
  IF(NOW() BETWEEN mt.monthly_startdate AND mt.monthly_enddate, IF(NOW() BETWEEN mt.monthly_startdate AND mt.monthly_enddate, 0, IF(mt.discounted AND !ISNULL(st.price_monthly_discounted), st.price_monthly_discounted, st.price_monthly)), IF(mt.discounted AND !ISNULL(st.price_daily_discounted), st.price_daily_discounted, st.price_daily)) AS amount_due
FROM member m
INNER JOIN membership_type mt ON
    mt.member_id = m.id
LEFT JOIN service_type st ON
  st.type_code = mt.service_type
ORDER BY mt.type