
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

-- GET ALL USERS WITH "liked" = false
SELECT u.* -- Returns all columns from user table
FROM "user" as u -- Selects from user table, aliased as u
JOIN "user_likes" as likes ON u.id = likes.liked_user_id -- JOINS only LIKED USER
WHERE likes.liked = false OR -- Get everyone who wasn't "liked"
      likes.liked_user_id IS NULL OR -- Get everyone who isn't in the "user_likes" table
      u.id != 5 -- Exclude the loged-in user
GROUP BY u.id;

-- build list of users with liked = false
WITH unchosen as (
    SELECT u.*
    FROM "user" as u
    JOIN "user_likes" as liked ON liked.liked_user_id = u.id
    WHERE liked.liked = false AND liked.user_id = 12
    GROUP BY u.id
-- ), no_decision as ( -- build list of users no in user_liked table
--     SELECT u.*
--     FROM "user" as u
--     JOIN "user_likes" as liked ON liked.liked_user_id = u.id
--     WHERE liked.liked_user_id IS NULL and liked.user_id = 12
--     GROUP BY u.id
)

SELECT *
FROM "user" as u
WHERE u.id IN (SELECT id FROM unchosen) OR -- Iterates through unchosen and returns matching userIDs
    u.id IS NOT NULL
GROUP BY u.id -- Returns UNIQUE users. 
HAVING u.id NOT IN (SELECT "user_likes".liked_user_id from "user_likes" WHERE "user_likes".liked = true )


-- build list of users with liked = false
WITH unchosen as (
    SELECT u.*
    FROM "user" as u
    JOIN "user_likes" as liked ON liked.liked_user_id = u.id
    WHERE liked.liked = false AND liked.user_id = 12
    GROUP BY u.id
-- ), no_decision as ( -- build list of users no in user_liked table
--     SELECT u.*
--     FROM "user" as u
--     JOIN "user_likes" as liked ON liked.liked_user_id = u.id
--     WHERE liked.liked_user_id = u.id
--     GROUP BY u.id
)



-- Create a variable (table) with all users who
-- have a liked = false in the user_likes table
WITH unchosen as ( -- Create the variable and name it
    SELECT u.* -- Return every column from "user", aliased as u
    FROM "user" as u -- Add "user" table, alias as u
    JOIN "user_likes" as liked ON liked.liked_user_id = u.id -- JOIN "user_likes" aliased as liked
    WHERE liked.liked = false AND liked.user_id = 12 -- Replace 12 with req.user.id / $1
    -- filter by liked=false, not authenticated user.
    GROUP BY u.id -- returns distinct user ids.
)

-- Select all columns from user;
SELECT u.*
-- Add user table, give alias of u since user is a reserved word in Postgres
FROM "user" as u
-- Ensure each user in the unchose query above is returned
WHERE u.id IN (SELECT id FROM unchosen) OR 
    -- FILTER OUT users in the next query
    u.id NOT IN (
        -- Select everyone that has a "liked"=true and "liked" by the authenticated user
        SELECT "user_likes".liked_user_id
        from "user_likes"
        WHERE "user_likes".liked = true AND "user_likes".user_id = 12
        -- Group by liked_user_id to remove duplicate entries
        -- WHY? Saves time returning, because this is a small list
        -- It's easier to GROUP/SORT/COUNT/WHATEVER a small group
        -- Than do the same action on a very large table
        GROUP BY "user_likes".liked_user_id
    )
-- Clean up any duplicates in the list ... probably not any
-- Consider removing this line if output is the same
GROUP BY u.id -- Returns UNIQUE users.


SELECT "user".*
FROM "user"
JOIN "user_likes" ON "user_likes".liked_user_id = "user".id
HAVING COUNT("user_likes".liked_user_id) < 1