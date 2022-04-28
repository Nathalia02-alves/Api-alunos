/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import sqlite3 from 'sqlite3'
sqlite3.verbose()
// Serve para fixar um caminho do meu database
import { dirname } from'path'
import { fileURLToPath } from 'url'
const filePath = dirname(fileURLToPath(import.meta.url)) + '/database.db'

// Criando o arquivo e/ou abrindo a "conexão" do meu database
const db = new sqlite3.Database('./database.db');

//==== Alunos
const ALUNOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "ALUNOS" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "NOME" varchar(64),
    "SERIE" varchar(64),
    "NOTA" varchar(64)
  );`;

const ADD_ALUNOS_DATA = `
INSERT INTO ALUNOS (ID, NOME, SERIE, NOTA)
VALUES 
    (1, 'Maria da Silva', 'Ensino Fundamental', '6,9'),
    (2, 'Olívia Mattos', 'Ensino Médio', '8,5'),
    (3, 'Mirtes Faria Lima', 'Ensino Infantil', '10')
`

function criaTabelaAluno() {
    db.run(ALUNOS_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de alunos");
    });
}


function populaTabelaAluno() {
    db.run(ADD_ALUNOS_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de alunos");
    });
}


//==== Series
const SERIES_SCHEMA = `
CREATE TABLE IF NOT EXISTS SERIES (
    ID INTEGER PRIMARY KEY AUTOINCREMENT, 
    TITULO VARCHAR(64),
    DESCRICAO TEXT,
    TURNO VARCHAR(32),
    DATACRIACAO VARCHAR(32),
    ID_ALUNO INTEGER,
    FOREIGN KEY(ID_SERIE) REFERENCES SERIE(ID)
);`;

const ADD_SERIES_DATA = `INSERT INTO SERIE (TITULO, DESCRICAO, TURNO, DATACRIACAO, ID_ALUNO)
VALUES 
       ('Ensino Médio', 'Alunos', 'Manhã', '2021-04-28', 2),
       ('Ensino Fundamental', 'Alunos', 'Tarde', '2021-04-28', 1),
       ('Ensino Infantil', 'Alunos', 'Manhã', '2021-04-28', 4),
       ('Ensino Médio', 'Alunos', 'Tarde', '2021-04-28', 3),
       ('Ensino Infantil', 'Alunos', 'Manhã', '2021-04-28', 5),
       ('Ensino Fundamental', 'Alunos', 'Tarde', '2021-04-28', 6),
       ('Ensino Médio', 'Alunos', 'Manhã', '2021-04-28', 7),
`

function criaTabelaSeries() {
    db.run(SERIES_SCHEMA, (error)=> {
        if(error) console.log("Erro ao criar tabela de Series");
    });
}


function populaTabelaSeries() {
    db.run(ADD_SERIES_DATA, (error)=> {
       if (error) console.log("Erro ao popular tabela de Series");
    });
}

db.serialize( ()=> {
    criaTabelaAluno();
    populaTabelaAluno();
    criaTabelaSeries();
    populaTabelaSeries();
});