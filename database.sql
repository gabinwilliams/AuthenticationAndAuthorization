

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

CREATE TABLE "messages" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "liked_user_id" INT NOT NULL,
    "message" VARCHAR (1000) NOT NULL,
    "date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "match" BOOLEAN DEFAULT FALSE
);


CREATE TABLE "current_chat" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT NOT NULL,
    "liked_user_id" INT NOT NULL,
    "name" VARCHAR (100) NOT NULL,
    "profile_image" VARCHAR (100) NOT NULL,
    "match" BOOLEAN DEFAULT FALSE
);


-- BIG SORTING QUERY to make sure profiles that the user has liked, will not show up in the users feed

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
        WHERE "user_likes".liked = true AND "user_likes".user_id = 12 -- Replace 12 with req.user.id / $1
        -- Group by liked_user_id to remove duplicate entries
        -- WHY? Saves time returning, because this is a small list
        -- It's easier to GROUP/SORT/COUNT/WHATEVER a small group
        -- Than do the same action on a very large table
        -- GROUP BY "user_likes".liked_user_id
    )



