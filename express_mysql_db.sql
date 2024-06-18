-- create database
DROP DATABASE IF EXISTS express_mysql_db;
CREATE DATABASE express_mysql_db;

USE express_mysql_db;

-- create user table
CREATE TABLE `users` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(60) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- create tasks table
CREATE TABLE `tasks` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- add test data
INSERT INTO `users` (`email`, `password`) VALUES ('u1@mail.com', 'pass1');
INSERT INTO `users` (`email`, `password`) VALUES ('u2@mail.com', 'pass2');
INSERT INTO `users` (`email`, `password`) VALUES ('u3@mail.com', 'pass3');


INSERT INTO `tasks` (`user_id`, `title`, `description`) VALUES (1, 'water the flowers', 'they need water and care');
INSERT INTO `tasks` (`user_id`, `title`, `description`) VALUES (2, 'write report', 'due tomorrow');
INSERT INTO `tasks` (`user_id`, `title`, `description`) VALUES (3, 'meeting prep', 'prepare slides');

-- source C:\Users\dell\Desktop\taskapp\express_mysql_db.sql
-- source C:/Users/dell/Desktop/taskapp/express_mysql_db.sql
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';