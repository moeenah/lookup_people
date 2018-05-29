let search = process.argv[2];

const pg = require("pg");
const settings = require("./settings");

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

  function lastname() {
       client.query(`SELECT * FROM famous_people WHERE last_name = '${search}';`, (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      let num_people = result.rows.length;
      console.log(`\nSearching...\nFound ${num_people} person(s) by the name '${search}'`);

      const result_arr = result.rows;
      (result_arr).forEach(function(query) {
        console.log(`- ${(result_arr).indexOf(query) + 1}: ${query.first_name} ${query.last_name}, born '${query.birthdate}' `);
      })
      client.end();
    });
  }

  client.query(`SELECT * FROM famous_people WHERE first_name = '${search}';`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let num_people = result.rows.length;
    if (num_people === 0) {
      lastname();
    } else {
      console.log(`\nSearching...\nFound ${num_people} person(s) by the name '${search}'`);

      const result_arr = result.rows;
      (result_arr).forEach(function(query) {
        console.log(`- ${(result_arr).indexOf(query) + 1}: ${query.first_name} ${query.last_name}, born '${(query.birthdate).toDateString()}' `);
      })
      client.end();
    }
  });
});

