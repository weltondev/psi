const jwt = require('jsonwebtoken');

const verificaToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
}

  jwt.verify(token, 'univesp', (error, decodificacao) => {
    if(error) {
      return res.status(401).send(`Token inválido!`);
    }

    req.nome = decodificacao.nome,

    next();
  })

}

module.exports = verificaToken;