// controller for login page at path '/login'

const User = require('../models/user');
const {comparePassword} = require('../helpers/auth')

// login user function
async function loginUser(req, res) {
    try {
        const {name, password} = req.body;

        // check if user exists
        const user = await User.findOne({name});
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // check if password match
        const match = await comparePassword(password, user.password)
        if(match) {
            res.json('password match')
        } else {
            res.json('incorrect password')
        }
    } catch (error) {
        console.log(error)
    }
}
    
module.exports = {
    loginUser
};