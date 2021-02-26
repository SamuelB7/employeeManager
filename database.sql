CREATE DATABASE "employeeManager"

CREATE TABLE "employees" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "rg" text NOT NULL,
  "cpf" text NOT NULL,
  "phone" text NOT NULL,
  "email" text NOT NULL,
  "birth" timestamp,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "photos" (
  "id" SERIAL PRIMARY KEY,
  "path" text NOT NULL
);

CREATE TABLE "employee_photos" (
  "employee_id" int,
  "photo_id" int
);

ALTER TABLE "employee_photos" ADD FOREIGN KEY ("photo_id") REFERENCES "photos" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "employee_photos" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE;