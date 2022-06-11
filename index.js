const express = require('express');
const app = express();
const { UserGame, UserGameBiodata } = require('./models');
const users = require('./data/user.json');
const router = require('./routing/router');
const morgan = require('morgan');
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(router);
app.use(morgan('dev'));

// LOGIN
app.get('/login', (req, res) => {
  res.render('login');
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  for (user of users) {
    if (username === user.username && password === user.password) {
      return res.redirect('/users');
    }
  }

  res
    .status(400)
    .send(
      '<h1>Invalid!, Email or Password.<br>Try Again</h1>'
    );
});

// HOMEPAGE
app.get('/', (req, res) => {
  res.render('home');
});

// CREATE
app.get('/users/create', (req, res) => {
  res.render('create_user');
});
app.post('/users/create', (req, res) => {
  const { email, username, password, name } = req.body;

  UserGame.create({ email, username, password }).then((newUser) => {
    UserGameBiodata.create({
      name,
      user_id: newUser.id,
    });
    res.status(201).catch((error) => {
      res.status(422).json("Can't create user", error);
    });
  });
});

// READ
app.get('/users', (req, res) => {
  UserGame.findAll({
    include: UserGameBiodata,
  })
    .then((data) => {
      res.render('users', { data });
    })
    .catch((error) => {
      console.log('something wrong!', error);
    });
});

// UPDATE
app.get('/users/update/:id', (req, res) => {
  UserGame.findOne({
    where: { id: req.params.id },
    include: UserGameBiodata,
  }).then((user) => {
    res.render('update_user', { user });
  });
});
app.post('/users/update/:id', (req, res) => {
  const { email, username, password, name } = req.body;

  UserGame.update(
    { email, username, password },
    { where: { id: req.params.id }, returning: true }
  )
    .then((user) => {
      UserGame.findOne({
        where: { id: req.params.id },
        include: UserGameBiodata,
      }).then((user1) => {
        UserGameBiodata.update(
          {
            name,
          },
          { where: { id: user1.UserGameBiodatum.id } }
        );
        res.status(201);
      });
    })
    .catch((error) => {
      res.status(400).json("Can't update user", error);
    });
});

// DELETE
app.get('/users/delete/:id', (req, res) => {
  UserGame.destroy({ where: { id: req.params.id }, returning: true }).then(
    (_) => {
      res.redirect('/users');
    }
  );
});

//erorr handling internal server erorr handler
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).json({
        status: 'fail',
        erorr: err.message
    });
});

// 404 handler
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
