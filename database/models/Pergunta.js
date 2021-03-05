const Sequelize = require('sequelize');
const connection = require('../database.js');

const Pergunta = connection.define('pergunta', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});

//force:false caso já exista, ele não irá recriar a tabela.
Pergunta.sync( {force: false} ).then(() => {
  console.log('Tabela Pergunta criada com sucesso!')
}).catch((err) => {
  console.log(`Falha na criação da tabela Perguntas: ${err}'`)
})


module.exports = Pergunta;