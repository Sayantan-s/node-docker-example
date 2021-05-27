require('dotenv').config();

const { PORT, DB_URI, ACCESS_SECRET, REFRESH_SECRET } = process.env;

module.exports = { PORT, DB_URI, ACCESS_SECRET, REFRESH_SECRET }