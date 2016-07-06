CREATE TABLE "GEO1" (
  "Name" text,
  "Room" numeric,
  "Affiliation" text,
  "ID" serial NOT NULL PRIMARY KEY,
  "Type" character(1)
);

CREATE TABLE "LoggedData"
(
  "ID" serial NOT NULL PRIMARY KEY,
  "Logging" text
);
