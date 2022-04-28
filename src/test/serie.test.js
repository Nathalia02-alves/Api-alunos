// importa o framework que faz a requisição
// para testar nossa requisição
import request from 'supertest'
// importa o app para ter acesso as rotas
import app from '../app.js'

// O describe serve para agrupar varios test e deixar mais
// organizado
describe('GET /serie', ()=>{
    test('Se o status é 200', ()=>{
        // Faz uma requisição para rota get /tarefa
        // como o retorno é uma promise, precisamos
        // executar com .then. A resposta vem com 
        // todos os itens de uma requisição HTTP
        // status, header, body.
        // Caso queira saber o que tem, da um console.log
        return request(app).get('/serie')
        .then((response)=>{
            console.log(response)
            expect(response.statusCode).toBe(200)
        })
    })
})

describe('POST /serie', ()=>{
    test('Se o body existe', ()=>{
        // No teste de uma rota post é possivel enviar um body
        // com o .send().
        return request(app).post('/serie')
        .send({
            "titulo" : "titulo",
            "descricao" : "descricao",
            "turno" : "Manhã",
            "idUsuario": 1
        })
        .then((response)=>{
            console.log(response.body)
            expect(response.body.mensagem).toBeTruthy()
        })   
    })

    test('Turno invalido', ()=>{
        return request(app).post('/serie')
        .send({
            "titulo" : "titulo",
            "descricao" : "descricao",
            "turno" : "turno errado",
            "idUsuario": 1
        })
        .then((response)=>{
            console.log(response.body)
            expect(response.body.erro).toBeTruthy()
        }) 
    })

})