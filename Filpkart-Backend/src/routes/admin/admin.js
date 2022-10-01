const express = require("express")
const { signup, signin, signout } = require("../../controller/admin/admin");
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require("../../validators/validator")
const {requiresignin, userMiddleware} = require("../../common-middleware/middleware")


const routes = express.Router();


routes.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
routes.post("/admin/signin", validateSigninRequest, isRequestValidated, signin);
routes.post("/admin/signout", requiresignin, signout);



module.exports = routes;