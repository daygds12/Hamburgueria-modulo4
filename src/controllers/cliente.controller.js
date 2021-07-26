//Requisição 
const Cliente = require('../models/cliente.model');
const ClienteDao = require('../DAO/clienteDao');


function cliente(app, bd){
    let cliDAO = new ClienteDao(bd);
    app.get('/clientes', async (req, res) => {

      try{
        let rows = await cliDAO.getClientes()
        res.json({'result': rows})
      }
      catch(e){
        res.json({'erro': e.message})
      }
      })

    app.get('/clientes/:CPF', async (req, res) => {

        try{
          let CPF = req.params.CPF;
          let rows = await cliDAO.getCliente(CPF)
          res.json({'result': rows})
        }
        catch(e){
          res.json({'erro': e.message})
        }
        })

    app.post('/clientes', async (req, res, next) => {
      try{
        let {nome, telefone, idade, CPF} = req.body
        let newCliente = new Cliente(nome, telefone, idade, CPF)
        let rows = await cliDAO.createCliente(newCliente)
        res.json({
          'message': 'cliente adicionado',
          'result': rows})
      }
      catch(e){
        res.json({'erro': e.message})
      }
      })
    app.delete('/clientes/:CPF', async (req, res)=>{
      try{
        let CPF = req.params.CPF
        let rows = await cliDAO.deleteCliente(CPF)
        res.json({
          'message': 'cliente deletado',
        'result': rows})
      }
      catch(e){
        res.json({'erro': e.message})
      }
      })

    app.put('/clientes/:id', async (req, res)=>{
      try{
        let id = req.params.id
        let {nome, telefone, idade, CPF} = req.body
        let rows = await cliDAO.updateCliente(nome, telefone, idade, CPF, id)
        res.json({
          'message': 'cliente atualizado',
          'result': rows})
      }
      catch(e){
        res.json({'erro': e.message})
      }
    })
}


module.exports = cliente