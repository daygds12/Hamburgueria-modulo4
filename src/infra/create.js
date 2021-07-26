const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const caminho = path.resolve(__dirname, '../', '../', 'database.db')
const bd = new sqlite3.Database(caminho);

const CLIENTES_SCHEMA = `
CREATE TABLE 'clientes' (
    "Id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(50),
    "telefone" int,
    "idade" int,
    "CPF" int
  );`;

const ADD_CLIENTE = `
INSERT INTO clientes(Id, nome, telefone, idade, CPF)
VALUES
    (1, 'Andre Luiz', 11965458748, 25, 3805547895),
    (2, 'Joao Jose', 11978745808, 48, 48524758802),
    (3, 'Josefa Maria', 11968741187, 60, 45087921408)
`  

function criaTabela(){
    bd.run(CLIENTES_SCHEMA, (err)=>{
        if(err){
            console.log(err)
        }
    })
}

function addTabela(){
    bd.run(ADD_CLIENTE, (err)=>{
        if(err){
            console.log(err)
        }
    })
}

bd.serialize(()=>{
    criaTabela();
    addTabela();
});