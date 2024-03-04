const express = require('express');
const cors = require('cors');
const connection = require('./database/connection');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
connection();

app.listen(3000, ()=> {
  console.log('✅ Servidor rondando!');
});

