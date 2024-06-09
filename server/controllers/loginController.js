// controller for login page at path '/login'

const User = require('../models/user');
const {comparePassword} = require('../helpers/auth');
const { createToken } = require('../helpers/token');

// login user function
async function loginUser(req, res) {
    try {
        const {name, password} = req.body;

        // check if user exists
        const user = await User.findOne({name});
        if (!user) {
            return res.json({
                error: 'User not found'
            })
        }

        // check if password match
        const match = await comparePassword(password, user.password)
        if(match) {
            // Create a login token
            const token = createToken(user._id);

            // json the user for development purposes, but later should remove for confidentiality
            return res.json({ user, token });
        } else {
            return res.json({error: 'Incorrect password'})
        }
    } catch (error) {
        console.log(error)
    }
}
    
module.exports = {
    loginUser
};