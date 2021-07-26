class ClienteDao{
    constructor(db){
        this.db = db
    }


getClientes(){
    return new Promise((res, rej)=>{
        this.db.all('SELECT * FROM clientes', (err, rows)=>{
            if(err){
                rej(err)
            }else{
                res(rows)
            }
        })
    })
}


getCliente(CPF){
    return new Promise((res, rej)=>{
        this.db.all('SELECT * FROM clientes WHERE CPF = ?', CPF, (err, rows)=>{
            if(err){
                rej(err)
            }else{
                res(rows)
            }
        })
    })
}


createCliente(newCliente){
    return new Promise((res, rej)=>{
        this.db.run(`INSERT INTO clientes (nome, telefone, idade, CPF)
        VALUES (?,?,?,?)`, [newCliente.nome, newCliente.telefone, newCliente.idade,
        newCliente.CPF],
        (err)=>{
            if(err){
                rej(err)
            }else{
                res({'resultado': true})
            }
        })
    })
}


deleteCliente(CPF){
    return new Promise((resolve, reject)=>{
        this.db.run(`DELETE FROM clientes WHERE CPF = ?`, CPF,(err)=>{
            if(err){
                reject({"resultado" : 'Erro ao deletar'})
            }else{
                resolve({"resultado" : 'Cliente deletado'})
            }
        })
        })
    }


updateCliente(nome, telefone, idade, CPF, id){
    return new Promise((resolve, reject)=>{

    let mudanca = [];
    let params = [id];
    let query = "UPDATE clientes SET"

    if(nome != null){
        params.unshift(nome)
        mudanca.unshift(" NOME =?")
      
    }
    if(telefone != null){
        params.unshift(telefone)
        mudanca.unshift(" TELEFONE =?")
        
    }
    if(idade != null){
        params.unshift(idade)
        mudanca.unshift(" IDADE =?")
       
    }
    if(CPF != null){
        params.unshift(CPF)
        mudanca.unshift(" CPF =?")
        
    }

    query += mudanca.join(',') + " WHERE ID = ?"

    
        this.db.run(query, params, (err)=>{
            if(err){
                reject({"resultado" : err})
            }else{
                resolve({"resultado" : 'Alterações realizadas'})
            }
        })
        })
    }

}

module.exports = ClienteDao