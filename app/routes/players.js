var express = require('express');
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])
var router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Visualizar datos del jugador
router.get('/:id', function (req, res) {
  db.players.find({ id: parseInt(req.params.id) }, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.render('player', { element: docs })
    }
  })
});

// Borrar datos del jugador
router.get('/remove/:id', function (req, res) {

  db.players.remove({ id: parseInt(req.params.id) }, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.render('form', {element: docs});
    }
  });
});

// Crear jugador
router.post('/add', function (req, res) {

  console.log(req.body)

  req.body.id = parseInt(req.body.id)
  req.body.teamId = parseInt(req.body.teamId)
  req.body.number = parseInt(req.body.number)
  req.body.leagueId = parseInt(req.body.leagueId)

  db.players.insert(req.body, (err, docs) => {
    if (err) {
      res.send(err)
    } else {
      res.render('player', { element: docs })
    }
  })
});

// Modificar datos del jugador
router.put('/edit', function (req, res) {

  req.body.id = parseInt(req.body.id)
  req.body.teamId = parseInt(req.body.teamId)
  req.body.number = parseInt(req.body.number)
  req.body.leagueId = parseInt(req.body.leagueId)

  db.players.findAndModify({
    query: { id: req.body.id },
    update: { $set: req.body }
  }, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.render('form', {element: docs});
    }
  })
});

module.exports = router;
