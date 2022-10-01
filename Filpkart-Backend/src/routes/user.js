const express = require("express")
const UserModel = require("../models/userModel");
const { signup, signin, signout } = require("../controller/user");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../validators/validator");
const { adminMiddleware, requiresignin } = require("../common-middleware/middleware");


const routes = express.Router();


routes.post("/signup", validateSignupRequest, isRequestValidated, signup);
routes.post("/signin", validateSigninRequest, isRequestValidated, signin);
routes.post("/signout", requiresignin, signout);





// routes.post("/profile", requiresignin, (req, res) => {
//     res.status(200).json({
//         message: "Token received..."
//     })
// })




module.exports = routes;