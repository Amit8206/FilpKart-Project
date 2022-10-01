const { check, validationResult } = require("express-validator")

exports.validateSignupRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('FirstName Is Required'),
    check('lastName')
    .notEmpty(),
    // .withMessage('LastName Is Required'),
    // check('username')
    // .notEmpty()
    // .withMessage('UserName Is Required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email Is Required'),
    check('password')
    .isLength({ min: 4 })
    .withMessage('Password Must Be Atleast 6 Caharecters')

];


exports.validateSigninRequest = [
    // check('firstname')
    // .notEmpty()
    // .withMessage('FirstName Is Required'),
    // check('lastname')
    // .notEmpty()
    // .withMessage('LastName Is Required'),
    // check('username')
    // .notEmpty()
    // .withMessage('UserName Is Required'),
    check('email')
    .isEmail()
    .withMessage('Valid Email Is Required'),
    check('password')
    .isLength({ min: 4 })
    .withMessage('Password Must Be Atleast 4 Caharecters')

];





exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
}