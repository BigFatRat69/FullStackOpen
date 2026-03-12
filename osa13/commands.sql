CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
('Robert Martin', 'https://blog.cleancoder.com', 'Clean Code', 10),
('Martin Fowler', 'https://martinfowler.com', 'Refactoring', 5);