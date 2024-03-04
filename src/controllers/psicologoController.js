const { Psicologo } = require('../models');

const psicologoController = {
  async listar(req, res) {
    try {
      const psicologos = await Psicologo.find();

      res.status(200).send({ psicologos });
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao listar Psicologos!');
    }
  },

  async cadastrar(req, res) {
    try {
      const { nome, email, apresentacao} = req.body;
      const psicologoExiste = await Psicologo.findOne({ email });
      
      if(psicologoExiste) {
        console.log(`Psicologo já cadastrado!`);
        return res.status(400).send('Psicologo já cadastrado!');
      }
      
      await Psicologo.create({ nome, email, apresentacao });
      
      res.status(201).send(`Psicologo cadastrado com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao cadastrar Psicologo!');
    }
  },

  async atualizar(req, res) {
    try {
      
      const { id } = req.params;
      const { nome, email, apresentacao } = req.body;

      const psicologoExiste = await Psicologo.findById( id );

      if(!psicologoExiste){
        console.log(`Psicologo não encontrado!`);
        return res.status(400).send(`Psicologo não encontrado!`);
      }

      await Psicologo.findByIdAndUpdate(id, { nome, email, apresentacao });

      res.status(200).send(`Psicologo atualizado com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao autualizar Psicologo!');
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;
      const psicologoExiste = await Psicologo.findById( id );

      if(!psicologoExiste){
        console.log(`Psicologo não encontrado!`);
        return res.status(400).send(`Psicologo não encontrado!`);
      }

      await Psicologo.findByIdAndDelete( id );

      res.status(200).send(`Psicologo removido com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao remover Psicologo');
    }
  }
}

module.exports = psicologoController;