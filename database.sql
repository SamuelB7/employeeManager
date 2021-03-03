CREATE DATABASE "employeeManager"

CREATE TABLE "employees" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "rg" text NOT NULL,
  "cpf" text NOT NULL,
  "phone" text NOT NULL,
  "email" text NOT NULL,
  "birth" timestamp,
  "company_id" int,
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

CREATE TABLE "company" (
	"id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "cnpj" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "employees" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id")
ALTER TABLE "employee_photos" ADD FOREIGN KEY ("photo_id") REFERENCES "photos" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "employee_photos" ADD FOREIGN KEY ("employee_id") REFERENCES "employees" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

--Tabela da sessão de usuário
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");