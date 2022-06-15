if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const routes = require('./routes');
const app = express();
const port = 3001;
const flash = require('express-flash');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));
const passport = require('./lib/passport');
app.use(passport.initialize());

app.set('view engine', 'ejs');

app.use(routes);

app.listen(port, () => {
  console.log('server menyala');
});
