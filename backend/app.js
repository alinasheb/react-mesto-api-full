const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const {
  login,
  createUser,
} = require('./controllers/users');
const {
  createUserValidation,
  loginValidation,
} = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const NotFound = require('./errors/NotFound');
const { PORT, DATABASE_URL } = require('./configs');

const { limiter } = require('./limiter/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// const { PORT = 3000} = process.env;
const app = express();

app.use(cors());

app.use(helmet());
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
});

app.use(errorLogger);

app.use(errors());

app.use(() => {
  throw new NotFound('Путь не найден');
});

app.use(error);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
