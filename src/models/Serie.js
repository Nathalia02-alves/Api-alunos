// Model que cuida da criação do objeto da nossa entidade
// validando as entradas

class Serie{
    constructor(titulo, descricao, turno){
        this.titulo = titulo
        this.descricao = descricao
        this.turno = this._validaTurno(turno)
        this.dataCriacao = new Date().toLocaleString()
    }

    _validaTurno = (turno)=>{
        const turnosPermitidos = ["Manhã", "Tarde"]
        if(turnosPermitidos.includes(turno)){
            return turno
        }
        else{
            throw new Error("turno não permitido. O turno deve ser: Manhã ou Tarde")
        }
    }        

}

export default Serie 