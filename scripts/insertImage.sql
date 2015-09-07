INSERT INTO "Images"(location, "createdAt", "updatedAt", "SectionId")
  SELECT 'http://cdn.pastemagazine.com/www/articles/HarryPotter1.jpg', clock_timestamp(), clock_timestamp(), id
  FROM "Sections"
  WHERE title = 'Chapter 1: The Boy Who Lived';
