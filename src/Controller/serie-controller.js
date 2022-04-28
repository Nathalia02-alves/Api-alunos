import serieDAO from '../DAO/serieDAO.js'
import Serie from '../models/Serie.js'

const SerieController = (app, bd)=>{
    const serieDAO = new serieDAO(bd)

    app.get('/serie', (req, res)=>{
        // Buscando informações no banco de dados
        serieDAO.pegaTodasSeries()
        .then((resposta)=>{
            res.json(resposta)
        })
        .catch((erro)=>{
            res.json(erro)
        })
    })

    app.get('/serie/titulo/:titulo', (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const titulo = req.params.titulo

        // Pesquisa a tarefa no banco de dados
        serieDAO.pegaUmaSerie(titulo)
        .then((resposta)=>{
            res.json(resposta)
        })
        .catch((erro)=>{
            res.json(erro)
        })
    })

    app.post('/series',(req, res)=>{
        // Recebe o corpo da requisição
        const body = req.body

        // Como temos validações na nossa model, usamos o try/catch
        // para pegar esse erro e enviar como mensagem para nosso cliente
        try {
            // cria uma instancia de Tarefa com validação dos dados
            // apartir do corpo que foi recebido
            const novaSerie = new Serie(body.titulo, body.descricao, body.turno)

            // insere a instância da tarefa no banco de dados
            serieDAO.insereSerie(novaSerie)
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

    app.delete('/serie/id/:id', (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // remove a tarefa do banco de dados
        serieDAO.deletaSerie(id)
        .then((resposta)=>{
            res.json(resposta)
        })
        .catch((erro)=>{
            res.json(erro)
        })
    })

    app.put('/serie/id/:id', (req, res)=>{
        // Pegando parametro que sera utilizado para o filtro
        const id = req.params.id

        // Pegando o corpo da requisição com as informações
        // que serão atualizados
        const body = req.body

        try {
            // utiliza a classe para validação dos dados recebidos
            const SerieAtualizada = new Serie(body.titulo, body.descricao, body.turno)

            // Atualiza a tarefa no banco de dados
            serieDAO.atualizaSerie(id, serieAtualizada)
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

export default SerieController