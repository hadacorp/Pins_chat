var mysql = require("mysql");
require('dotenv').config();

var chatdb = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.CHAT_MYSQL_DATABASE,
  
});

var maindb = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MAIN_MYSQL_DATABASE,
  
});

chatdb.connect((err) => {
  if (err) throw err;
});
maindb.connect((err) => {
  if (err) throw err;
});

module.exports.chatdb = chatdb;
module.exports.maindb = maindb;