// controller for login page at path '/login'

const User = require('../models/user');
const { hashPassword, comparePassword} = require('../helper/auth')

// login user function
const loginUser = (req, res) => {
    
}
    
module.exports = {
    loginUser
};