var express = require('express');
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])
var router = express.Router();
const { body, validationResult } = require('express-validator')

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// Visualizar datos del jugador
router.get('/:id', function (req, res) {
  db.players.find({ id: parseInt(req.params.id) }, (err, docs) => {
    if (err) {
      res.send(err);
    } else {
      console.log(docs[0])
      res.render('form', { element: docs[0] })
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

function validacion(req, res, next){
  const errors = validationResult(req)
  if(!errors.isEmpty){
    return res.status(400).json({errors: errors.array()})
  }

  db.players.find({id: parseInt(req.params.id)}, (err,docs) => {
    if(err){
      console.log(err)
    }else{
      if(docs[0]){
        res.send("<h3>Ya existe un jugador con esa id</h3>")
      }else{
        next()
      }
    }
  })

}

// Crear jugador
router.post('/add', validacion, function (req, res) {

  body('id').isLength({min: 1}).withMessage('El id no puede estar vacio.')

  console.log(req.body)

  req.body.id = parseInt(req.body.id)
  req.body.teamId = parseInt(req.body.teamId)
  req.body.number = parseInt(req.body.number)
  req.body.leagueId = parseInt(req.body.leagueId)

  db.players.insert(req.body, (err, docs) => {
    if (err) {
      res.send(err)
    } else {
      res.send("<h3>Nuevo jugador añadido.</h3>")
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
