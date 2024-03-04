const { Atendimento } = require('../models');

const AtendimentoController = {
  async listar(req, res) {
    try {
      const atendimentos = await Atendimento.find().populate(['paciente', 'psicologo']);

      res.status(200).send({ atendimentos });
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao listar Atendimentos!');
    }
  },

  async cadastrar(req, res) {
    try {
      const { paciente, psicologo, data, descricao} = req.body;
      const atendimentoExiste = await Atendimento.findOne({ data });
      
      if(atendimentoExiste) {
        console.log(`Atendimento já cadastrado!`);
        return res.status(400).send('Data já reservada!');
      }
      
      await Atendimento.create({ paciente, psicologo, data, descricao });
      
      res.status(201).send(`Atendimento cadastrado com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao cadastrar Atendimento!');
    }
  },

  async atualizar(req, res) {
    try {
      
      const { id } = req.params;
      const { paciente, psicologo, data, descricao } = req.body;

      const AtendimentoExiste = await Atendimento.findById( id );

      if(!AtendimentoExiste){
        console.log(`Atendimento não encontrado!`);
        return res.status(400).send(`Atendimento não encontrado!`);
      }

      await Atendimento.findByIdAndUpdate(id, req.body );

      res.status(200).send(`Atendimento atualizado com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao autualizar Atendimento!');
    }
  },

  async remover(req, res) {
    try {
      const { id } = req.params;
      const AtendimentoExiste = await Atendimento.findById( id );

      if(!AtendimentoExiste){
        console.log(`Atendimento não encontrado!`);
        return res.status(400).send(`Atendimento não encontrado!`);
      }

      await Atendimento.findByIdAndDelete( id );

      res.status(200).send(`Atendimento removido com sucesso!`);
    } catch (error) {
      console.log(error);
      return res.status(400).send('Falha ao remover Atendimento');
    }
  }
}

module.exports = AtendimentoController;