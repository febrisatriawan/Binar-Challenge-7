const router = require('express').Router();
const room = require('../controllers/room');
const onlyPlayerUser = require('../middlewares/onlyPlayerUser');

router.post('/create', onlyPlayerUser, room.create);
router.post('/fight/:id', onlyPlayerUser, room.fight);
router.get('/', room.index);
router.get('/delete/:id', room.destruct);

module.exports = router;
