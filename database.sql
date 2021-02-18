CREATE DATABASE "employeeManager"

CREATE TABLE "employees" (
    "id" SERIAL PRIMARY KEY,
    "name" text NOT NULL,
    "rg" text NOT NULL,
    "cpf" text NOT NULL,
    "phone" text NOT NULL,
    "email" text NOT NULL,
  	"birth" timestamp,
    "photo_id" int,
    "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "photos" (
    "id" SERIAL PRIMARY KEY,
    "path" text NOT NULL
);

ALTER TABLE "employees" ADD FOREIGN KEY ("photo_id") REFERENCES "photos" ("id") ON DELETE CASCADE ON UPDATE CASCADE;