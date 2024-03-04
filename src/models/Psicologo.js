const mongoose = require('mongoose');

const psicologoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  apresentacao: {
    type: String,
  }
});

const Psicologo = mongoose.model('Psicologo', psicologoSchema);

module.exports = Psicologo;