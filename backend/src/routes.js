const express = require('express');

const ongController = require('./controllers/ongController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();// Aqui estamos desacoplando as rotas em uma variável que utilizaremos para criar as rotas a partir de agora.

/*
Métodos HTTP
*GET -> Buscar uma informação no back
*POST -> Criar uma informação no back
*PUT -> Alterar uma informação no back
*DELETE -> Deletar uma informação no back
*/

/*
Query Params: Parâmetros nomeados enviados na rota após "?" (filtros, paginação) -> .query
Route Params: Parâmetros utilizados para identificar recursos -> .params
Request Body: Corpo da requisição, utilizado para criar ou alterar recursos -> .body
*/

routes.post('/sessions', sessionController.create);// Login da ong

routes.get('/ongs', ongController.index);  // listagem de ongs
routes.post('/ongs', ongController.create);  // Cadastro de ongs

routes.get('/profile', profileController.index); // Listando casos específicos de uma ong

routes.get('/incidents', incidentController.index); // Listagem de casos
routes.post('/incidents', incidentController.create); // Criando casos
routes.delete('/incidents/:id', incidentController.delete); //Deletando casos

module.exports = routes; //Agora, utilizamos esse comando para exportar esse arquivo como recurso para onde quisermos, como um modulo qualquer, mas que nós criamos