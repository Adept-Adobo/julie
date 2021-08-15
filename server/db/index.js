const { Pool, Client } = require('pg');
const {
  host, user, database, password, port,
} = require('../../config');

// Create a pool instance and pass in our config, which we set in our env vars
// const pool = new Pool({
//   host,
//   user,
//   database,
//   password,
//   port,
// });

const client = new Client({
  host,
  user,
  database,
  password,
  port,
});

client.connect();

module.exports = client;
