-- Borrar tablas si ya existían (en orden inverso por la Foreign Key)
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

-- Crear tabla de usuarios
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50),
  email VARCHAR(60) UNIQUE,
  pass VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de publicaciones
CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  title VARCHAR(60),
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);