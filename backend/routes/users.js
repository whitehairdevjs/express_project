var express = require('express');
var router = express.Router();
const user = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource users');
});


router.post('/save', user.singUp);

router.post('/login', user.login);

module.exports = router;