

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


