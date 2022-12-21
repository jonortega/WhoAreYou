var express = require('express');
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])
var router = express.Router();
const { validateCreate } = require('../validators/add')

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Visualizar datos del jugador
router.get('/:id', function (req, res) {
  db.players.find({ id: parseInt(req.params.id) }, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      if(docs[0]){
        res.render('form', { element: docs[0] })
      }else{
        res.send("<h3>No existe un jugador con esa id.</h3>")
      }
    }
  })
});

// Borrar datos del jugador
router.get('/remove/:id', function (req, res) {

  db.players.remove({ id: parseInt(req.params.id) }, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send("<h3>Jugador eliminado.</h3>");
    }
  });
});

// Crear jugador
router.post('/add', validateCreate, function (req, res) {

  console.log(req.body)

  req.body.id = parseInt(req.body.id)
  req.body.teamId = parseInt(req.body.teamId)
  req.body.number = parseInt(req.body.number)
  req.body.leagueId = parseInt(req.body.leagueId)

  let meter

  db.players.find({id: req.body.id }, (err, docs) => {
    if (err) {
      res.send(err)
    } else {
      if(docs.length == 0){
        console.log("Camino correcto")
        db.players.insert(req.body, (err, docs) => {
          if (err) {
            res.send(err)
          } else {
            res.send("<h3>Nuevo jugador añadido.</h3>")
          }
        })
      }else{
        res.send("<h3>Existe un jugador con esa id.</h3>")
      }
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
      res.send("<h3>Juador modificado.</h3>");
    }
  })
});

module.exports = router;
