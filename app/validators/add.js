const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreate = [
    check('id').isMongoId(), 
    (req,res,next) => {
      validateResult(req,res,next)
    }
]

module.exports = { validateCreate }