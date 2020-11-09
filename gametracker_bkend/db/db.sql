-- schema

-- CREATE DATABASE gametracker

-- \c gametracker

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    -- email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE (username)
);