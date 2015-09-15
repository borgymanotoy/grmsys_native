SELECT
  isl.id AS id,
  isd.item_id,
  isd.qty AS item_quantity,
  isd.unit_total,
  isd.remarks,
  isl.sales_date AS sales_date,
  isl.grand_total_amount,
  isl.member_id AS member_id,
  IF(isnull(isl.member_id), 'Anonymous', TRIM(concat(ifnull(m.firstname, ''), ' ', IF((m.middlename IS NOT NULL), concat(SUBSTR(m.middlename, 1, 1), '. '), ''), ifnull(m.lastname, '')))) AS customer_name,
  isl.user_id AS user_id
FROM item_sales isl
LEFT JOIN item_sales_details isd ON 
  isd.item_sales_id = isl.id
LEFT JOIN member m ON m.id = isl.member_id