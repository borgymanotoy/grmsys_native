INSERT INTO member(id, firstname, lastname, emergency_contact_person, emergency_contact_number, emergency_contact_relationship, creation_date, last_modified_date, user_id)
  VALUES (1, 'Member', 'Anonymous', 'n/a', 'n/a', 'n/a', NOW(), NOW(), 1);

INSERT INTO membership_type(member_id, creation_date, user_id) VALUES(1, NOW(), 1);
  COMMIT;