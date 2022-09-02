require('dotenv').config();

const { PORT = 3000, JWT_SECRET = '3cb5e250b2e57c526b58ec45fde45a05751f0b0d47fbaafec6e1b3ef40588a1c' } = process.env;

const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';
const JWT_STORAGE_TIME = '7d';
const SALT_LENGTH = 10;

module.exports = {
  PORT,
  JWT_SECRET,
  DATABASE_URL,
  SALT_LENGTH,
  JWT_STORAGE_TIME,
};
