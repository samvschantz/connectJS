const settings = require("./settings");
const first_name = process.argv[2]
const last_name = process.argv[3]
const birthday = process.argv[4]

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex('famous_people').insert({
  first_name: first_name,
  last_name: last_name,
  birthdate: birthday
}).asCallback((err, res) =>{
    if (err) throw err
    knex.destroy()
  });
