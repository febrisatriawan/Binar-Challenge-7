if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const routes = require('./routes');
const app = express();
const { port = 3000 } = process.env;
const flash = require('express-flash');
const session = require('express-session');
const passport = require('./lib/passport');
const morgan = require('morgan');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(routes);
app.use(morgan('dev'));
app.use(session());
app.use(flash());

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
