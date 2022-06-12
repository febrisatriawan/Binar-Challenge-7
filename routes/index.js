const router = require('express').Router();
const home = require('../controllers/home');
const game = require('../controllers/game');
const loginCrudRouter = require('./loginCrudRouter');
const userRouter = require('./userRouter');
const authPostmanRouter = require('./authPostmanRouter');
const roomRouter = require('./roomRouter');
const authentication = require('../middlewares/authentication');
const onlySuperAdmin = require('../middlewares/onlySuperAdmin');

router.get('/', home.index);
router.get('/game', game.index);
router.use('/login', loginCrudRouter);

router.use('/api/v1/auth/', authPostmanRouter);

router.use(authentication);
router.use('/users', onlySuperAdmin, userRouter);

router.use('/room', roomRouter);

module.exports = router;
