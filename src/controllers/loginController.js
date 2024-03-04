const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const secret = "univesp";

const loginController = {
  async login(req, res) {
    try {

      const { email, senha } = req.body;
      
      const usuario = await Usuario.findOne({ email });

      if(!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
        return res.status(400).send(`Credenciais inválidas`);
      }

      const token = jwt.sign({
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }, 'univesp', { expiresIn: '1h' });
      
      res.status(200).json(token);
    } catch (error) {
      console.log(error);
      res.status(400).send(`Falha ao realizar login ${error}`);
    }
  }
}

module.exports = loginController