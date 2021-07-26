const express = require('express')
const app = express()
const port = 3003
const clienteControl = require('../src/controllers/cliente.controller');
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const caminho = path.resolve(__dirname, '../', 'database.db')
const bd = new sqlite3.Database(caminho);

//Middleware para "tradução" da resposta
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Rota ativada`)
  });

clienteControl(app, bd)

//Abrir o servidor 

app.listen(port)