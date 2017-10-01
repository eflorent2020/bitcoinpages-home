
const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config()

var connection = mysql.createPool({
  host: dotenv.config().parsed.MYSQL_HOST,
  user: dotenv.config().parsed.MYSQL_USER,
  password: dotenv.config().parsed.MYSQL_PASSWORD,
  database: dotenv.config().parsed.MYSQL_DB
})

module.exports = connection
