const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {id} = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('name') // Selecionamos esse conteúdo da tabela ao dar match
        .first();

        if(!ong){ // notação quer dizer "se esse parâmetro não existir"
            return response.status(404).json({ error: 'No ONG found with this ID'}); // Status code 400 quer dizer 'bad request', ou seja, mandamos algo errado.
        }

        return response.json(ong);
    },
}