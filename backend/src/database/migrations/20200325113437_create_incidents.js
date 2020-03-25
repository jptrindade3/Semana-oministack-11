
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments(); //Faz o incremento do número de incidents

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable(); // Diferente dos outros valores, aqui queremos um float

        table.string('ong_id').notNullable(); // Aqui receberemos o id da ong dona do caso
        
        table.foreign('ong_id').references('id').inTable('ongs'); // Buscamos correspondência do id da  ong na tabela ongs

      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
