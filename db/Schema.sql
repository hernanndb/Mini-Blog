-- Borrar tablas si ya existían (en orden inverso por la Foreign Key)
DROP TABLE IF EXISTS comments;
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
  image_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Crear tabla de Comentarios , un Comentario es de un Usuario a un Post
CREATE TABLE Comments(
  id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  user_id INT,
  post_id INT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- 1. Insertar usuarios de prueba
INSERT INTO users (username, email, pass) VALUES
('demo', 'demo@miniblog.com', '$2b$10$4CL/zgmbN85ZTkHS9aoxFeOPV7w5XgNrvQKjbT.177PVR1G70Mp9e'),
('sofia_dev', 'sofia@miniblog.com', '$2b$10$4CL/zgmbN85ZTkHS9aoxFeOPV7w5XgNrvQKjbT.177PVR1G70Mp9e'),
('carlos_elBebote', 'carlosBBOT@miniblog.com', '$2b$10$Uo6BDM3hId7d1Ynj9cKxmum2fANpVo/nkWP4J7njVp8nYJyEjvlIy');

-- 2. Insertar publicaciones con imágenes (asumiendo IDs 1, 2 y 3)
INSERT INTO posts (user_id, title, content, image_url) VALUES
(1, 'Mi primer post en el Mini-Blog', 'Estoy probando cómo quedó el diseño con Flexbox y las nuevas tarjetas.', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'),
(2, 'Arquitectura en la nube con Aiven', 'Configurar MySQL en la nube fue mucho más fácil de lo que pensaba.', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'),
(3, 'Tips de testing para backend', 'Siempre es importante validar las entradas con librerías como Zod.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800');

-- 3. Insertar comentarios cruzados (relacionando user_id y post_id)
INSERT INTO Comments (user_id, post_id, content) VALUES
(2, 1, '¡Qué prolijo quedó el diseño, Hernán! Me encanta la tipografía.'),
(1, 2, 'Totalmente de acuerdo Sofía, te ahorra muchos dolores de cabeza locales.'),
(3, 1, 'Excelente proyecto para el portfolio, éxitos con eso.');