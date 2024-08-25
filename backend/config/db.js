const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '2055',
  database: process.env.DB_DATABASE || 'event_booking',
  connectTimeout: 10000,
  acquireTimeout: 10000,
  connectionLimit: 10,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);
  connection.release();
});

module.exports = db;