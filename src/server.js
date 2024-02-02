const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./models');
const { errorHandler } = require('./middleware/errorHandler');
const { requestLogger, errorLogger } = require('./middleware/logger');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const todoRoute = require('./routes/todo');
const pagesRoute = require('./routes/pages');

const { PORT } = process.env;
dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(requestLogger);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app use router
// app.use('/api', authRoute);
// app.use('/api', userRoute);
// app.use('/api', todoRoute);

// app use pages
// app.use('/js', express.static(path.join(dirname, 'src', 'public', 'js')));
// app.use('/css', express.static(path.join(dirname, 'src', 'public', 'css')));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src', 'views'));
// app.use('/', pagesRoute);

// app use seeders if there is available

app.use(errorLogger);
app.use(errorHandler);

db.sequelize.authenticate().then(() => {
  try {
    const HOST = process.env.HOST || 'localhost';
    app.listen(PORT, HOST, () => {
      console.log(`Server running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
});