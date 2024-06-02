// controller for register page at path '/register'

const User = require('../models/user');
const { hashPassword} = require('../helpers/auth.js')

// register user function
async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        // Check if fields are present? not sure if need since I'll add
        // a required attribute to the html input tag

        // Check for name
        if (!name) {
            return res.json({
                error: 'A username is required'
            })
        }

        // Check if password is good
        if (!password) {
            return res.json({
                error: 'Password should be at least 8 characters long'
            })
        }

        // Check for email
        const exist = await User.findOne({ email }); // finds a matching email in database
        if (exist) {
            return res.json({
                error: 'Email has already been registered'
            });
        }

        // hashes password
        const hashedPassword = await hashPassword(password)

        // Checks all passed, register user into database
        const user = await User.create({
            name, email, password: hashedPassword
        });

        return res.json(user);

        // IDK what to do LMAO
    } catch (err) {
        return res.json('An error occurred in registerController');
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