const knex = require('knex');
const configuration = require('../../knexfile'); // Utilizamos o '../' para que voltemos um diretório

const connection = knex(configuration.development); //utilizaremos o perfil de dev que modificamos no knexfile

module.exports = connection;