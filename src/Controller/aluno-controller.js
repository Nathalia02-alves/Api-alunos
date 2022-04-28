import Aluno from '../models/Aluno.js'
import alunoDAO from '../DAO/alunoDAO.js'

const alunoController = (app, bd)=>{
    const alunoDAO = new alunoDAO(bd)

    app.get('/aluno', (req, res)=>{
        alunoDAO.pegaTodosAlunos()
        .then((resposta)=>{
            res.status(200).json(resposta)
        })
        .catch((erro)=>{
            res.status(400).json(erro)
        })
    })

    app.get('/aluno/serie/:serie', (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const serie = req.params.serie

        // Pesquisa o usuario no banco de dados
        alunoDAO.pegaUmAluno(serie)
        .then((resposta)=>{
            res.json(resposta)
        })
        .catch((erro)=>{
            res.json(erro)
        })
    })

    app.post('/aluno',(req, res)=>{
        // Recebe o corpo da requisição
        const body = req.body

        // Como temos validações na nossa model, usamos o try/catch
        // para pegar esse erro e enviar como mensagem para nosso cliente
        try {
            // cria uma instancia de Usuario com validação dos dados
            // apartir do corpo que foi recebido
            const novoAluno = new Aluno(body.nome, body.serie, body.nota, body.id_aluno)

            // insere a instância do usuario no banco de dados
            alunoDAO.insereAluno(novoAluno)
            .then((resposta)=>{
                res.status(201).json(resposta)
            })
            .catch((erro)=>{
                res.status(400).json(erro)
            })

        } catch (error) {
            // Envia o erro, caso exista
            res.status(400).json({
                "msg": error.message,
                "erro": true
            })
        }  
    })

    app.delete('/aluno/id/:id', (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // remove o usuário do banco de dados
        alunoDAO.deletaAluno(id)
        .then((resposta)=>{
            res.json(resposta)
        })
        .catch((erro)=>{
            res.json(erro)
        })
    })

    app.put('/aluno/id/:id', (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // Pegando o corpo da requisição com as informações
        // que serão atualizados
        const body = req.body

        try {
            // utiliza a classe para validação dos dados recebidos
            const alunoAtualizado = new Aluno(body.nome, body.serie, body.nota, body.id_aluno)

            // Atualiza o usuario no banco de dados
            alunoDAO.atualizaAluno(id, alunoAtualizado)
            .then((resposta)=>{
                res.json(resposta)
            })
            .catch((erro)=>{
                res.json(erro)
            })

        } catch (error) {
            // Envia o erro, caso exista
            res.json({
                "msg": error.message,
                "erro": true
            })
        }
    })

}

export default alunoController