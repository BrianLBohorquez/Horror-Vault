DROP TABLE IF EXISTS watchlist;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS subgenres;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text UNIQUE NOT NULL,
  password text NOT NULL
);

CREATE TABLE subgenres (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text NOT NULL,
  year integer,
  poster_url text,
  subgenre_id integer NOT NULL REFERENCES subgenres(id) ON DELETE CASCADE,
  rating decimal,
  review text,
  liked boolean NOT NULL DEFAULT false,
  date_logged date
);

CREATE TABLE watchlist (
  id serial PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  movie_id integer NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
  watched boolean NOT NULL DEFAULT false
);