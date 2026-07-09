const errorStrings = require('../../constants/errorStrings');
const { registerUser, loginUser } = require('../../model/user/methods');

exports.saveUser = async (req, res) => {    
    try {
        const data = req.body;

        if (!data.name) {
            throw new Error(errorStrings.NAME_REQUIRED)
        }
        if (!data.email) {
            throw new Error(errorStrings.EMAIL_REQUIRED)
        }
        if (!data.password) {
            throw new Error(errorStrings.PASSWORD_REQUIRED)
        }

        const saveUserData = await registerUser(data);

        res.status(201).send({message: "User Registered Successfully", data: saveUserData}) 
    } catch (e) {
        res.status(400).send({ error: e.message})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const data = req.body;

        if (!data.email) {
            throw new Error(errorStrings.EMAIL_REQUIRED)
        }
        if (!data.password) {
            throw new Error(errorStrings.PASSWORD_REQUIRED)
        }

        const loginUserData = await loginUser(data);

        if (!loginUserData) {
            throw new Error(loginUserData)
        }

        res.status(201).send({message: "User Logged In Successfully", data: loginUserData})
    }
    catch (e) {
        res.status(400).send({ error: e.message})
    }
}