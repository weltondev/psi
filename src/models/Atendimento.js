const mongoose = require('mongoose');

const atendimentoSchema = new mongoose.Schema({
  paciente: {
    type: mongoose.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  },
  psicologo: {
    type: mongoose.Types.ObjectId,
    ref: 'Psicologo',
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  descricao: {
    type: String
  }
});

const Atendimento = mongoose.model('Atendimento', atendimentoSchema);

module.exports = Atendimento;