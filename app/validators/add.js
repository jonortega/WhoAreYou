const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')
const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

const validateCreate = [
    check('id').not().isEmpty()
        // .custom((value, {req}) => {
        //     console.log(value)
        //     db.players.find({ id: parseInt(value) }, (err, docs) => {
        //         if (err) {
        //             res.send(err);
        //         } else {
        //             if(docs[0]){
        //                 console.log("Mal")
        //                 throw new Error('Id already taken')
        //             }
        //             console.log("Bien")
        //             req = {}
        //             return true
        //         }
        //     })
        // })
    ,check('name').not().isEmpty(),
    check('birthdate').not().isEmpty(),
    check('nationality').not().isEmpty(),
    check('teamId').not().isEmpty(),
    check('position').not().isEmpty(),
    check('number').not().isEmpty(),
    check('leagueId').not().isEmpty()
    , (req,res,next) => {
      validateResult(req,res,next)
    }
]

module.exports = { validateCreate }