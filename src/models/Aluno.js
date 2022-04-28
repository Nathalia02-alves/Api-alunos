// Model que cuida da criação do objeto da nossa entidade
// validando as entradas

import AlunoDAO from "../DAO/alunoDAO.js"

class Aluno{
    constructor(nome, serie, nota){
        this.nome = nome
        this.serie = serie
        this.nota = nota
    }

}
export default Aluno