const { Pool } = require("pg");

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}:${process.env.DB_URL}:${process.env.DB_PORT}:${process.env.DB_DATABASE}`
const connectionString = `postgresql://${process.env.DB_USER}@${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const isProduction = process.env.NODE_ENV === "production"

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

//ex 
// callback
// client.query('SELECT NOW() as now', (err, res) => {
//     if (err) {
//       console.log(err.stack)
//     } else {
//       console.log(res.rows[0])
//     }
//   })
// promise
//   client
//     .query('SELECT NOW() as now')
//     .then(res => console.log(res.rows[0]))
//     .catch(e => console.error(e.stack))