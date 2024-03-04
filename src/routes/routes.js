const express = require('express');
const verificaToken = require('../middleware/verifcaToken');
const { 
        pacienteController,
        atendimentoController,
        usuarioController,
        psicologoController,
        loginController
      } = require('../controllers/');


const routes = express.Router();

// Login
routes.post('/login', loginController.login); // Login 

// Rotas Pacientes
routes.get('/pacientes', pacienteController.listar);  // Listar pacientes
routes.post('/pacientes', pacienteController.cadastrar); // Cadastrar pacientes
routes.put('/pacientes/:id', pacienteController.atualizar); // Atualizar pacientes
routes.delete('/pacientes/:id', pacienteController.remover); // Remover pacientes

// Rotas Psicologos
routes.get('/psicologos', psicologoController.listar); // Listar psicologos
routes.post('/psicologos', psicologoController.cadastrar); // Cadastrar psicologos
routes.put('/psicologos/:id', psicologoController.atualizar); // Atualizar psicologos
routes.delete('/psicologos/:id', psicologoController.remover); // Remover psicologos

// Rotas Atendimentos
routes.get('/atendimentos', atendimentoController.listar); // Listar atendimentos
routes.post('/atendimentos', atendimentoController.cadastrar); // Cadastrar atendimentos
routes.put('/atendimentos/:id', atendimentoController.atualizar); // Atualizar atendimentos
routes.delete('/atendimentos/:id', atendimentoController.remover); // Remover atendimentos

// Rotas Usuarios
routes.get('/usuarios', usuarioController.listar); // Listar usuarios
routes.post('/usuarios', usuarioController.cadastrar); // Cadastrar usuarios
routes.put('/usuarios/:id', usuarioController.atualizar); // Atualizar usuarios
routes.delete('/usuarios/:id', usuarioController.remover); // Remover usuarios

module.exports = routes;
