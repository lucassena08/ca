CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  authors TEXT NOT NULL,
  thematic_area TEXT NOT NULL,
  editor TEXT NOT NULL,
  pages TEXT NOT NULL
);

INSERT INTO book (name, subtitle, authors, thematic_area, editor, pages)
VALUES ('nome do livro', 'subtitulo', 'autores', 'area tematica', 'editora', '300');

DROP TABLE book;