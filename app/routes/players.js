var express = require('express');
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])
var router = express.Router();


// Función para borrar
let remove = function (res, id) {
  db.footballdata.remove({ _id: mongojs.ObjectId(id) }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log(result);
    }
  });
}

// Visualizar datos del jugador
router.get('/:id', function (req, res) {
  db.footballdata.findOne({ id: req.params.id }, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      console.log(doc)
      res.render('player', { element: doc })
    }
  })
});

// Borrar datos del jugador
router.get('/remove/:id', function (req, res) {
  remove(res, req.params.id);
});

// Crear jugador
router.post('/add', function (req, res) {
  //AÑADIR A LA BD EL JUGADOR
  res.send('added');
});

// Modificar datos del jugador
router.put('/edit/:id', function (req, res) {
  res.send('respond with a resource');
});

module.exports = router;
