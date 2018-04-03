const settings = require("./settings");
const name = process.argv[2]

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

knex.select('*').from('famous_people').where(`first_name`, `like` ,`%${name}%`)
  .asCallback((err, res) =>{
    if (err) throw err
    console.log(`Found ${res.length} person(s) by the name '${name}':`)
    for (person of res){
      let first_name = person.first_name
      let last_name = person.last_name
      let birthdate = person.birthdate.toISOString().slice(0,10)
      console.log(`-${res.indexOf(person) + 1}: ${first_name} ${last_name}, born '${birthdate}'`)
    }
  });