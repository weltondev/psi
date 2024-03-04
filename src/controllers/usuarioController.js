const { Usuario } = require('../models/index');
const bcrypt = require('bcrypt');

const usuarioController = {
  async listar(req, res) {
    try {
      const usuarios = await Usuario.find({}, '-senha');

      res.status(200).send({ usuarios });
    } catch (error) {
      console.log(error.message);
      res.status(400).send(`Falha ao listar os usuarios!`);
    }
  },

  async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const UsuarioExiste = await Usuario.findOne({ email });

      if(UsuarioExiste){
        console.log('Usuario já cadastrado!');
        return res.status(400).send('Usuario já cadastrado!');
      }

      const senhaCripto = bcrypt.hashSync(senha, 12);

      await Usuario.create({ nome, email, senha: senhaCripto });

      res.status(201).send(`Usuario cadastrado com sucesso!`);
      
    } catch (error) {
      console.log(error.message);
      res.status(400).send('Falha ao cadastrar Usuario!');
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      const UsuarioExiste = await Usuario.findById( id );

      if(!UsuarioExiste){
        console.log(`Usuario não encontrado!`);
        return res.status(400).send(`Usuario não encontrado!`);
      }

      await Usuario.findByIdAndUpdate(id, { nome, email, senha });

      res.status(200).send(`Usuario atualizado com sucesso!`);
      
    } catch (error) {
      console.log(error.message);
      return res.status(400).send('Falha ao atualizar Usuario! Por favor tente novamente.');
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;
      const UsuarioExiste = await Usuario.findById( id );

      if(!UsuarioExiste){
        console.log(`Usuario não encontrado!`);
        return res.status(400).send(`Usuario não encontrado!`);
      }

      await Usuario.findByIdAndDelete( id );

      res.status(200).send(`Usuario removido com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao remover Usuario');
    }
  }
}

module.exports = usuarioController;