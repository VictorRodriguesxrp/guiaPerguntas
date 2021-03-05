const Sequelize = require('sequelize');

//                                nome banco      usuario senha  ambos do mysql
const connection = new Sequelize('guiaperguntas', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});


module.exports = connection;