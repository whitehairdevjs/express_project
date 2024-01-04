const pgp = require('pg-promise')(/* initialization options */);

const initOptions = {
  query(e) {
    console.log('QUERY:', e.query);
  },
};

const connection = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '7418',
};

const db = pgp(connection);

module.exports = {
  initOptions,
  db,
};
