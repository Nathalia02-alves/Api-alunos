// A classe DAO é responsável por acessar nosso banco de dados
// Cada arquivo DAO é responsável por uma entidade

class AlunoDAO{

    constructor(db){
        this.db = db
    }

    // Metodo responsável pelo acesso aos bancos de dados
    // cada metodo será responsável por uma query de acordo com
    // o que ele deve retornar
    pegaTodosAlunos = ()=>{
        // Como estamos tratando de acesso a banco de dados, o processo é
        // assíncrono, por isso precisamos trabalhar com promises.
        // O método ira retornar a promise, que será excutada (com .then e .catch)
        // no controller
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM ALUNOS', (error, rows)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "aluno": rows,
                        "erro": false
                    })
                }
            })
        })
    }

    pegaUmAluno = (serie)=>{
        return new Promise((resolve, reject)=>{
            this.db.all('SELECT * FROM ALUNO WHERE SERIE = ?',
            serie,
            (error, rows)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "aluno": rows,
                        "erro": false
                    })
                }
            })
        })

    }

    insereAluno = (novoAluno) =>{

        return new Promise((resolve, reject)=>{
            // Query com ? para evitar SQL Injection
            // NUNCA DEVEMOS USAR COM TEMPLATE STRING
            // Nós inserimos os dados a serem substituidos depois da query
            // Ou separado por vírgula (QUERY, a,b,c, callback)
            // Ou em um array (QUERY, [a,b,c] , callback)
            this.db.run("INSERT INTO ALUNO(NOME, SERIE, NOTA) VALUES (?, ?, ?)",
                novoAluno.nome, novoAluno.serie, novoAluno.nota, 
                (error)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "mensagem": `Aluno ${novoAluno.nome} inserido com sucesso`,
                        "aluno": novoAluno,
                        "erro": false
                    })
                }
            })
        })

    }

    deletaAluno = (id)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('DELETE FROM ALUNOS WHERE ID = ?',
            id,
            (error)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "aluno": `Aluno de id ${id} deletado com sucesso`,
                        "erro": false
                    })
                }
            })
        })
    }

    atualizaAluno = (id, aluno)=>{
        return new Promise((resolve, reject)=>{
            this.db.run('UPDATE ALUNOS SET NOME = ?, TURMA = ?, NOTA = ? WHERE ID = ?',
            aluno.nome, aluno.turma, aluno.nota,
            id,
            (error)=>{
                if(error){
                    reject({
                        "mensagem": error.message,
                        "erro": true
                    })
                }else{
                    resolve({
                        "mensagem": `Aluno de id ${id} atualizado com sucesso`,
                        "aluno": aluno,
                        "erro": false
                    })
                }
            })
        })
    }

}

export default AlunoDAO