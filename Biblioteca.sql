CREATE DATABASE Biblioteca;

USE Biblioteca;


CREATE TABLE Autor (
    id_autor INT PRIMARY KEY,
    nome VARCHAR(100),
    nacionalidade VARCHAR(100)
);

CREATE TABLE Livro (
    id_livro INT PRIMARY KEY,
    titulo VARCHAR(255),
    ano_publicacao INT,
    id_autor INT,
    FOREIGN KEY (id_autor) REFERENCES Autor(id_autor)
);

CREATE TABLE Leitor (
    id_leitor INT PRIMARY KEY,
    nome VARCHAR(100),
    endereco VARCHAR(255),
    telefone VARCHAR(20)
);

CREATE TABLE Funcionario (
    id_funcionario INT PRIMARY KEY,
    nome VARCHAR(100),
    cargo VARCHAR(50)
);

CREATE TABLE Emprestimo (
    id_emprestimo INT PRIMARY KEY,
    data_emprestimo DATE,
    data_devolucao DATE,
    id_leitor INT,
    id_funcionario INT,
    FOREIGN KEY (id_leitor) REFERENCES Leitor(id_leitor),
    FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario)
);

CREATE TABLE Inclui (
    id_inclui INT PRIMARY KEY,
    id_emprestimo INT,
    id_livro INT,
    FOREIGN KEY (id_emprestimo) REFERENCES Emprestimo(id_emprestimo),
    FOREIGN KEY (id_livro) REFERENCES Livro(id_livro)
);


#INCLUINDO OS DADOS NO BAGUI

INSERT INTO Autor (id_autor, nome, nacionalidade)
VALUES (1, 'Sun Tzu', 'Chinês'),
       (2, 'J.K. Rowling', 'Britânica'),
       (3, 'Machado de Assis', 'Brasileiro');

INSERT INTO Livro (id_livro, titulo, ano_publicacao, id_autor)
VALUES (1, 'A Arte da Guerra', 500, 1),
       (2, 'Harry Potter e a Pedra Filosofal', 1997, 2),
       (3, 'Dom Casmurro', 1899, 3);

INSERT INTO Leitor (id_leitor, nome, endereco, telefone)
VALUES (1, 'Marcelo', 'Rua A, 123', '1111-1111'),
       (2, 'Milton', 'Rua B, 456', '2222-2222');

INSERT INTO Funcionario (id_funcionario, nome, cargo)
VALUES (1, 'João Almeida', 'Atendente'),
       (2, 'Ana Costa', 'Bibliotecária');

INSERT INTO Emprestimo (id_emprestimo, data_emprestimo, data_devolucao, id_leitor, id_funcionario)
VALUES (1, '2024-10-01', '2024-10-15', 1, 1),
       (2, '2024-10-05', '2024-10-19', 2, 2);


INSERT INTO Inclui (id_inclui, id_emprestimo, id_livro)
VALUES (1, 1, 1),  
       (2, 1, 3),  
       (3, 2, 2);  
       
       
       
SELECT a.nome AS autor, l.titulo AS livro
FROM Autor a
JOIN Livro l ON a.id_autor = l.id_autor; #Autores e livros 

SELECT e.id_emprestimo, e.data_emprestimo, e.data_devolucao, l.nome AS leitor, f.nome AS funcionario
FROM Emprestimo e
JOIN Leitor l ON e.id_leitor = l.id_leitor
JOIN Funcionario f ON e.id_funcionario = f.id_funcionario; #Emprestimo e quem hipoteticamente leu 

 
SELECT i.id_emprestimo, lv.titulo AS livro
FROM Inclui i
JOIN Livro lv ON i.id_livro = lv.id_livro
WHERE i.id_emprestimo = 1;  -- Lista todos os livros incluídos no empréstimo 1

SELECT f.nome AS funcionario, e.id_emprestimo, e.data_emprestimo
FROM Funcionario f
JOIN Emprestimo e ON f.id_funcionario = e.id_funcionario; # Lista us livru e uskara que liberaram
