// Importando o framework
import express from "express";

// Importando o CORS
import cors from 'cors'

// importanto os controllers
import alunoController from "./controller/aluno-controller.js";
import serieController from "./controller/serie-controller.js";

// importando os middlewares
import generalMiddleware from "./middleware/general-middleware.js";

// banco de dados do sqlite
import database from './database/sqlite-db.js'

// Instanciando/criando servidor
const app = express()


// Middleware necessario para fazer o parser do 
// JSON recebido do body em objeto
app.use(express.json())
// Incluindo o CORS
app.use(cors())

// Chamada dos Middlewares especificos das rotas
generalMiddleware(app) // vai ser rodados em todas as rotas

// chamando os controllers passando o servidor (app) 
// e o banco de dados (bd) como parâmetro
alunoController(app, database)
serieController(app, database)

// exporta o app para ser usado em outros arquivos
export default app