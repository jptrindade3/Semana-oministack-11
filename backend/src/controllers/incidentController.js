const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count(); // Conta o total de casos existentes

        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id') // Queremos trazer também os dados da ong dona desse caso
            .limit(5) // Limita a 5 casos por vez
            .offset((page-1) * 5) // Indica de onde começar a pegar os casos dependendo da página
            .select([ // Fazemos isso para que selecionemos todos os campos para serem mostrados, inclusive o ong_id que é igual ao id.
                'incidents.*', 
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']); // Envia pro cabeçalho da responde quantos casos existem

        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },
    
    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization; // Precisamos conferir se o caso sendo deletado pertence a ong logada

        const incident = await connection('incidents')// Buscando incidente de dentro da tabela incidents
            .where('id', id) // queremos um incidente de id na tabela igual ao que recebemos de parâmetro
            .select('ong_id') // camos selecionar apenas a coluna referente a ong_id
            .first(); // como só existem um registro com esse id, podemos pegar o primeiro que aparecer

        if (incident.ong_id != ong_id){ //Conferindo se o id da ong logada é o mesmo da id da ong cujo cadastro pertence
            return response.status(401).json({ error: 'Operation not permitted'}); // Status code HTTP de não autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); // Status code HTTP de sucesso, mas sem conteúdo para ser retornado, e o send é para enviar a resposta sem corpo nenhum
    },
};