const { Paciente } = require('../models/index');

const pacienteController = {
  async listar(req, res) {
    try {
      const pacientes = await Paciente.find();

      res.status(200).send({ pacientes });
    } catch (error) {
      console.log(error.message);
      res.status(400).send(`Falha ao listar os pacientes!`);
    }
  },

  async cadastrar(req, res) {
    try {
      const { nome, email, idade } = req.body;
      const pacienteExiste = await Paciente.findOne({ email });

      if(pacienteExiste){
        console.log('Paciente já cadastrado!');
        return res.status(400).send('Paciente já cadastrado!');
      }

      await Paciente.create({ nome, email, idade });

      res.status(201).send(`Paciente cadastrado com sucesso!`);
      
    } catch (error) {
      console.log(error.message);
      res.status(400).send('Falha ao cadastrar paciente!');
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, idade } = req.body;

      const pacienteExiste = await Paciente.findById( id );

      if(!pacienteExiste){
        console.log(`Paciente não encontrado!`);
        return res.status(400).send(`Paciente não encontrado!`);
      }

      await Paciente.findByIdAndUpdate(id, { nome, email, idade });

      res.status(200).send(`Paciente atualizado com sucesso!`);
      
    } catch (error) {
      console.log(error.message);
      return res.status(400).send('Falha ao atualizar paciente! Por favor tente novamente.');
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;
      const pacienteExiste = await Paciente.findById( id );

      if(!pacienteExiste){
        console.log(`Paciente não encontrado!`);
        return res.status(400).send(`Paciente não encontrado!`);
      }

      await Paciente.findByIdAndDelete( id );

      res.status(200).send(`Paciente removido com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao remover paciente');
    }
  }
}

module.exports = pacienteController;