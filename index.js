if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const routes = require('./routes');
const flash = require('express-flash');
const passport = require('./lib/passport');
const { port = 3001 } = process.env;
const morgan = require('morgan');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());

app.set('view engine', 'ejs');

app.use(routes);
app.use(morgan('dev'));

app.use(flash());

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
