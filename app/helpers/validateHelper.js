const { validationResult } = require('express-validator')

const validateResult = (req,res,next) => {
    // try{
    //     validationResult(req)
    //     return next()
    // }catch(err){
    //     res.status(400)
    //     res.send({errors: err.array()})
    // }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }
}

module.exports = { validateResult }