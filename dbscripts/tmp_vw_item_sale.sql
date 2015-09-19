SELECT
  `isl`.`id` AS `id`,
  isd.item_sales_id,
  `isd`.`item_id` AS `item_id`,
  i.name AS item_name,
  `isd`.`qty` AS `item_quantity`,
  `isd`.`unit_total` AS `unit_total`,
  `isd`.`remarks` AS `remarks`,
  `isl`.`sales_date` AS `sales_date`,
  `isl`.`grand_total_amount` AS `grand_total_amount`,
  `isl`.`member_id` AS `member_id`,
  IF(ISNULL(`isl`.`member_id`), 'Anonymous', TRIM(CONCAT(IFNULL(`m`.`firstname`, ''), ' ', IF((`m`.`middlename` IS NOT NULL), CONCAT(SUBSTR(`m`.`middlename`, 1, 1), '. '), ''), IFNULL(`m`.`lastname`, '')))) AS `customer_name`,
  `isl`.`user_id` AS `user_id`
FROM `item_sales` `isl`
LEFT JOIN `item_sales_details` `isd` ON `isd`.`item_sales_id` = `isl`.`id`
LEFT JOIN item i ON i.id = isd.item_id
LEFT JOIN `member` `m` ON `m`.`id` = `isl`.`member_id`