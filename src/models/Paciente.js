const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowecarse: true,
  },
  idade: {
    type: Number,
    required: true,
  }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;