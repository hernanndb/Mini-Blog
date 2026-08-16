drop database if exists Postdata;
CREATE database Postdata ;

use Postdata;

CREATE Table users(
id int PRIMARY KEY auto_increment NOT NULL,
username VARCHAR(50),
email VARCHAR(60) UNIQUE,
pass VARCHAR(255),
created_at DATETIME default current_timestamp
);

CREATE Table posts(
id int PRIMARY KEY auto_increment NOT NULL,
user_id int,
FOREIGN KEY (user_id) REFERENCES users(id),
title VARCHAR(60),
content TEXT,
created_at DATETIME default current_timestamp
);