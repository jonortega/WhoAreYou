const { validationResult } = require('express-validator')

const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        return next()
      }catch(err){
        res.status(400)
        res.send("<h3>Existe un jugador con esa id</h3>")
      }
}

module.exports = { validateResult }