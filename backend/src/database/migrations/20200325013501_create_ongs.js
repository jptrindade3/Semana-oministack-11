
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) { // Criamos aqui a nossa tabela chamada ongs
    table.string('id').primary(); // Elemento da tabela considerado primário
    table.string('name').notNullable(); // Not nullable quer dizer que esse campo não pode receber valores vazios
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); // Aquele 2 quer dizer que sabemos que a entreda terá só 2 caracteres
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs'); // Caso algo dê errado, é por conta disso que podemos apagar ou voltar atras com a migration
};
