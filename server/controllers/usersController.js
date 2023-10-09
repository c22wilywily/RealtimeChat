const brcypt = require("bcrypt");
const userModel = require("../model/userModel");


module.exports.register = async (req, res, next) => {
    console.log(req.body);

    try {
        const { username, email, password } = req.body;
        const usernameCheck = await userModel.findOne({ username })
        const emailCheck = await userModel.findOne({ email })
        const hashedPassword = await brcypt.hash(password, 10);
        if (usernameCheck) {
            return res.json({ msg: "User name already used", status: false });
        }
        if (emailCheck) {
            return res.json({ msg: "Email already used", status: false });
        }
        const user = await userModel.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user })
    } catch (e) {
        next(e)
    }
}

module.exports.login = async (req, res, next) => {
    console.log(req.body);
    try {
        âlalalala
        const { username, password } = req.body;
        const user_name = await userModel.findOne({ username })
        if (!user_name) {
            console.log("object")
            return res.json({ msg: "Incorrect username or password", status: false });
        }
        const isPasswordVaild = await brcypt.compare(password, user_name.password)
        if (!isPasswordVaild) {
            return res.json({ msg: "Incorrect username or password", status: false });
        }
        delete user_name.password;
        return res.json({ status: true, user_name })
    } catch (e) {
        next(e)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({
            _id: {
                $ne: req.params.id
            }
        }).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(users);
    } catch (e) {
        next(e)
    }
}