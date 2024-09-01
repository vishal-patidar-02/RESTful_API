use Blogpage;

CREATE TABLE user (
    id varchar(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    url varchar(300) UNIQUE,
    caption varchar(300) NOT NULL
);