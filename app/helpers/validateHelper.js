const { validationResult } = require('express-validator')

const validateResult = (req,res,next) => {
    try{
        validationResult(req).throw()
        return next()
    }catch(err){
        res.status(400)
        res.send('<h3>Rellena todos los campos.</h3>')
    }

    // const errors = validationResult(req).throw();
    // console.log(errors)
    // if (!errors.isEmpty()) {
    //     return res.status(400).send({errors: errors.array()});
    // }else{
    //     next()
    // }
}

module.exports = { validateResult }