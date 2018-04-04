
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('milestones', function(table){
      table.integer('add_famous_id').references('id').inTable('famous_people');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('add_famous_id')
  ])
};
