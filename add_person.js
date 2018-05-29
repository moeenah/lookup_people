const settings = require("./settings");
var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.hostname,
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

knex('famous_people')
.insert([
  {first_name: process.argv[2],
   last_name: process.argv[3],
    birthdate: process.argv[4]}
    ])
.asCallback(function(error, rows) {
    knex.select('*').from('famous_people').asCallback(function(error, rows) {
    console.log(rows);
  });
});
