const crypto = require('crypto'); // Biblioteca de encriptação
const connection = require('../database/connection');

module.exports = {
    async index(request, response) { // Listagem de ongs
        const ongs = await connection('ongs').select('*'); //Queremos selecionar todos os campos de todos os rgistros dentro da tabela ongs, isso qu o '*' quer dizer

        return response.json(ongs);
    },

    async create(request, response){ // Cadastro de ongs
        const {name, email, whatsapp, city, uf } = request.body; // Aqui quebramos a váriável em várias para garantir que recebemos o que esperamos

    const id = crypto.randomBytes(4).toString('HEX'); // Criando string de 4 bites no formato hexadecimal

    await connection('ongs').insert({ // Fazendo a inserção dos dados no nosso banco
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    return response.json({ id });
    }
}