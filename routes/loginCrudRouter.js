const router = require('express').Router();
const loginCrud = require('../controllers/login');

router.get('/', loginCrud.index);
router.post('/', loginCrud.auth);

module.exports = router;
