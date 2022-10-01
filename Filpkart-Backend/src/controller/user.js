const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const shortid = require('shortid')




exports.signup = (req, res) => {

    UserModel.findOne({ email: req.body.email })
        .exec(async (err, user) => {
            if (user) return res.status(400).json({
                message: "User Already exists !!!"
            });
            const {
                firstName,
                lastName,
                email,
                password
            } = req.body;
            const hash_password = await bcrypt.hash(password, 10);
            const _user = new UserModel({
                firstName,
                lastName,
                email,
                hash_password,
                username: shortid.generate()
            });
            _user.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        message: "Something Wrong !!!"
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: "User Created Successfully..."
                    });
                }
            });
        });
}

exports.signin = (req, res) => {

    UserModel.findOne({ email: req.body.email })
        .exec(async (err, user) => {
            if (err) return res.status(400).json({ err });
            if (user) {
                const isPassword = await user.authenticate(req.body.password)
                if ( isPassword && user.role === 'user') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRATE_TOKEN, { expiresIn: '1h' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                   
                    console.log(fullName)
                    res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            email,
                            role,
                            fullName
                        }
                    })

                } else {
                    return res.status(400).json({
                        message: "invalid Password !!!"
                    })
                }
            } else {
                return res.status(400).json({
                    message: "invalid Email !!!"
                })
            }
        })
}



exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({  message: 'Signout Successfully....' })
}

