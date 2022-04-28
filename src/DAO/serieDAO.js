// A classe DAO é responsável por acessar nosso banco de dados
// Cada arquivo DAO é responsável por uma entidade

class SerieDAO{

    constructor(db){
        this.db = db
    }

    // Metodo responsável pelo acesso aos bancos de dados
    // cada metodo será responsável por uma query de acordo com
    // o que ele deve retornar
    pegaTodasSeries = ()=>{
        // Como estamos tratando de acesso a banco de dados, o processo é
        // assíncrono, por isso precisamos trabalhar com promises.
        // O método ira retornar a promise, que será excutada (com .then e .catch)
        // no controller
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM SERIES', (error, rows)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "series": rows,
                        "erro": false
                    })
                }
            })
        })
    }

    pegaUmaTarefa = (titulo)=>{
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM SERIES WHERE TITULO = ?',
            titulo,
            (error, rows)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "series": rows,
                        "erro": false
                    })
                }
            })
        })

    }

    insereSerie = (novaSerie) =>{
        return new Promise((resolve, reject)=>{
            // Query com ? para evitar SQL Injection
            // NUNCA DEVEMOS USAR COM TEMPLATE STRING
            // Nós inserimos os dados a serem substituidos depois da query
            // Ou separado por vírgula (QUERY, a,b,c, callback)
            // Ou em um array (QUERY, [a,b,c] , callback)
            this.db.run("INSERT INTO SERIES(TITULO, DESCRICAO, TURNO, DATACRIACAO, ID_ALUNO) VALUES (?, ?, ?, ?, ?)",
            novaSerie.titulo, novaSerie.descricao, novaSerie.turno, novaSerie.dataCriacao, novaSerie.idAluno,
                (error)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "mensagem": `Tarefa ${novaSerie.titulo} inserida com sucesso`,
                        "serie": novaSerie,
                        "erro": false
                    })
                }
            })
        })

    }

    deletaSerie = (id)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('DELETE FROM SERIE WHERE ID = ?',
            id,
            (error)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "serie": `Série de id ${id} deletada com sucesso`,
                        "erro": false
                    })
                }
            })
        })
    }

    atualizaSérie = (id, serie)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('UPDATE SERIE SET TITULO = ?, DESCRICAO = ?, TURNO = ?, ID_ALUNO = ? WHERE ID = ?',
            serie.titulo, serie.descricao, serie.turno, serie.idAluno,
            id,
            (error)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "mensagem": `Serie de id ${id} atualizada com sucesso`,
                        "tarefa": tarefa,
                        "erro": false
                    })
                }
            })
        })
    }

}

export default SerieDAO