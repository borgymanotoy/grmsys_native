UPDATE user set password=MD5('helloworld') WHERE id = 1;
COMMIT;