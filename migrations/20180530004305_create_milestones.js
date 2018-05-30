
exports.up = function(knex, Promise) {
   return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id').unsigned().primary();
      table.string('description');
      table.dateTime('date_achieved');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
