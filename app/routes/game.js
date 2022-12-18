var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // res.render('login');
    res.send("Aqui iria el juego WhoAreYou")
});

module.exports = router;
