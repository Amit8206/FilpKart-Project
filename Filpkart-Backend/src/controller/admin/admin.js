const UserModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');



exports.signup = (req, res) => {

    UserModel.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (user) return res.status(400).json({
                message: "Admin Already exists !!!"
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
                role: 'admin',
                username: Math.random().toString()
            });
            _user.save((error, data) => {
                if (error) {
                    return res.status(401).json({
                        message: "Something Wrong !!!"
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: "Admin Created Successfully..."
                    });
                }
            });
        });
}





exports.signin = (req, res) => {

    UserModel.findOne({ email: req.body.email })
        .exec(async (error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                const isPassword = await user.authenticate(req.body.password)

                if ( isPassword && user.role === 'admin') {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRATE_TOKEN, { expiresIn: '5d' });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.cookie('token', token, { expiresIn: '5d' });
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
                    return res.status(400).json({   message: "invalid Password !!!" })
                }
            } else {
                return res.status(400).json({   message: "invalid Email !!!"    })
            }
        })
}




exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({  message: 'Signout Successfully....' })
}