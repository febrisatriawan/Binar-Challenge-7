const router = require('express').Router();
const users = require('../controllers/users');

router.get('/', users.index);
router.get('/create', users.create);
router.post('/', users.new);
router.get('/:id', users.detail);

router.get('/delete/:id', users.destruct);
router.get('/update/:id', users.formupdate);
router.post('/update/:id', users.makeupdate);

module.exports = router;
