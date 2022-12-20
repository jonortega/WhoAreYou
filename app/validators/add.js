const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

const validateCreate = [
    check('id').custom((value) => {
        console.log(value)
        db.players.find({ id: parseInt(value) }, (err, docs) => {
            if (err) {
              res.send(err);
            } else {
                if(docs[0]){
                    console.log(docs[0])
                    return Promise.reject('Id already taken')
                }else {
                    console.log(docs)
                    return true
                }
            }
        })
    }), (req,res,next) => {
      validateResult(req,res,next)
    }
]

module.exports = { validateCreate }