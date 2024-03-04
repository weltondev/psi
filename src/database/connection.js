const moongose = require('mongoose');

const connection = ()=> {
  try {
    moongose.connect(`mongodb+srv://admin:admin123@cluster0.ynfkprs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

    console.log(`✅ Banco de dados Conectado!`);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connection;