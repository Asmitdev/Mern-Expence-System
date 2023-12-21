const userModel = require('../models/userModel');


// login 

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password })
        if (!user) {
            res.status(404).send({
                message: 'User not found'
            })

        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}




// register
const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            newUser
        })


    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}


module.exports = { loginController, registerController }