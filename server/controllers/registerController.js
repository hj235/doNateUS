// controller for register page at path '/register'

const User = require('../models/user');
const { hashPassword} = require('../helpers/auth');
const { createToken } = require('../helpers/token');

// register user function
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        // Check if fields are present? not sure if need since I'll add
        // a required attribute to the html input tag

        // Check for name
        const nameExist = await User.findOne({ name }); // finds a matching name in database
        if (!name || nameExist) {
            return res.json({
                error: 'Username is invalid or already in use'
            })
        }

        // Check if password is good
        if (!password/* || password.length < 8*/) {
            return res.json({
                error: 'Password should be at least 8 characters long'
            })
        }

        // Check for email
        const exist = await User.findOne({ email }); // finds a matching email in database
        if (!name || exist) {
            return res.json({
                error: 'Email is invalid or already registered'
            });
        }

        // hashes password
        const hashedPassword = await hashPassword(password)

        // Checks all passed, register user into database
        const user = await User.create({
            name, email, password: hashedPassword
        });

        // Create a login token
        const token = createToken(user._id);

        res.status(200).json({ user, token });

        // IDK what to do LMAO
    } catch (err) {
        res.status(400).json({
            description: 'An error occurred in registerController',
            error: err.message
        });
    }
}



// Test: successfully creates entry in mongoDB collection
// async function registerUser(req, res) {
//     const user = await User.create({
//         name: 'test',
//         email: 'test',
//         password: 'test'
//     });

//     return res.json(user);
// }

module.exports = {
    registerUser
};