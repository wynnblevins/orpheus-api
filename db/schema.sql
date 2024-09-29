CREATE DATABASE orpheus;

CREATE TABLE public.user (
  id varchar(255) GENERATED ALWAYS AS IDENTITY PRIMARY key,
  username varchar(255),
  password varchar(255)
);

CREATE TABLE public.playlist (
  id varchar(255) GENERATED ALWAYS AS IDENTITY PRIMARY key,
  FOREIGN KEY (id) REFERENCES public.user(id),
  name varchar(255)
);

CREATE TABLE public.song (
  id varchar(255) GENERATED ALWAYS AS IDENTITY PRIMARY key,
  FOREIGN KEY (id) REFERENCES public.artist(id),
  title varchar(255),
  storage_location varchar(510)
);
