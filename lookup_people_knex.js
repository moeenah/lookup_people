const settings = require("./settings");
const knex = require('knex')({
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

knex('famous_people').where('first_name', process.argv[2]).orWhere('last_name', process.argv[2]).asCallback(function(error, rows) {
  if (error) {
      return console.error("error running query", error);
  } else {
    console.log(`\nSearching...\n\nFound ${rows.length} person(s) by the name '${process.argv[2]}'`);
    (rows).forEach(function(query) {
      console.log(`- ${(rows).indexOf(query) + 1}: ${query.first_name} ${query.last_name}, born '${query.birthdate.toDateString()}' `);
    });
    //on search completion, exits program
    process.on("exit", function() {
      console.log("\nExiting..");
    });
    process.exit();
  }

});