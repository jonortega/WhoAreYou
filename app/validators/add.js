const { check } = require('express-validator')
const { validateResult } = require('../helpers/validateHelper')

const validateCreate = [
  check('id').not().isEmpty(),
  check('name').not().isEmpty(),
  check('birthdate').not().isEmpty(),
  check('nationality').not().isEmpty(),
  check('teamId').not().isEmpty(),
  check('position').not().isEmpty(),
  check('number').not().isEmpty(),
  check('leagueId').not().isEmpty()
  , (req, res, next) => {
    validateResult(req, res, next)
  }
]

module.exports = { validateCreate }