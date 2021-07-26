const moment = require('moment')


class Cliente{
    constructor(nome, telefone, idade, CPF){
        if(nome.length > 2){
            this.nome = nome
        }else{
            throw new Error('Nome inválido.')
        }

        if(typeof telefone == 'number' ){
            this.telefone = telefone
        }else{
            throw new Error('Telefone inválido.')
        }

        if(typeof idade == 'number' && idade > 0){
            this.idade = idade
        }else{
            throw new Error('Idade inválida.')
        }

        if(CPF.toString().length == 11){
            this.CPF = CPF
        }else{
            throw new Error('CPF inválido.')
        }

        
    }
}


//Export
module.exports = Cliente