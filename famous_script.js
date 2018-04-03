const pg = require("pg");
const settings = require("./settings");
const name = process.argv[2]

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching...')
    client.query(`SELECT * FROM famous_people WHERE first_name LIKE '%${name}%' OR last_name LIKE '%${name}%;';`, (err, result) => {
      if (err) throw err;
      const rows = result.rows
      console.log(`Found ${result.rowCount} person(s) by the name '${name}':`)
      for (let row of rows){
        let first_name = row.first_name
        let last_name = row.last_name
        let birthdate = row.birthdate.toISOString().slice(0,10)
        let num = (rows.indexOf(row)) + 1
        console.log(`-${num}: ${first_name} ${last_name}, born '${birthdate}'`)
      }
      client.end();
    });
  });
});