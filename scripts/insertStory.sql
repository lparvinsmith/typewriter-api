INSERT INTO "Stories"(title, "createdAt", "updatedAt", "UserId")
  SELECT 'Harry Potter', clock_timestamp(), clock_timestamp(), id
  FROM "Users"
  WHERE email = 'lara@ljp.com';
