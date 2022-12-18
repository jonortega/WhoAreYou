var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    let element = { "id": "", "name": "", "birthdate": "", "nationality": "", "teamId": "", "position": "", "number": "", "leagueId": ""}
    res.render('form', {element: element});
});

module.exports = router;
