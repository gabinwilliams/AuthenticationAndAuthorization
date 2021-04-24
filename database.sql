
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

-- DB name 'front_to_back'

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (50) NOT NULL,
    "dev_type" VARCHAR (50) NOT NULL,
    "profile_image" VARCHAR (500),
    "bio" VARCHAR (1000) NOT NULL,
    "github" VARCHAR (500),
    "tech_one" VARCHAR (100) NOT NULL,
    "tech_two" VARCHAR (100) NOT NULL,
    "tech_three" VARCHAR (100) NOT NULL,
    "active" BOOLEAN DEFAULT FALSE
);

    
    CREATE TABLE "user_likes" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "liked" BOOLEAN DEFAULT FALSE,
    "liked_user_id" INT NOT NULL,
    "match" BOOLEAN DEFAULT FALSE
    
);