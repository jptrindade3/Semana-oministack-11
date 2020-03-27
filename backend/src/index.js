const express = require('express'); //Estamos importando o express pra dento desse arquivo
const routes = require('./routes'); //importando o modulo de rotas que criamos
const cors = require('cors'); // Modulo de segurança do sistema

const app = express(); //Habilitamos as rotas pra trabalhar com express no objeto "app"

app.use(cors());
app.use(express.json()); //Função que prepara as rotas para lidar com o arquivos JSON
app.use(routes); //Utilizando a partir daqui as rotas importadas

app.listen(3333); //Define a porta do localhost ao qual o backend estará ouvindo