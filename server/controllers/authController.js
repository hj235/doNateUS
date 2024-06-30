// controller for register page at path '/register'

const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
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

        res.status(200).json({ ...user._doc, token });

        // IDK what to do LMAO
    } catch (err) {
        res.status(400).json({
            description: 'An error occurred in registerController',
            error: err.message
        });
    }
}

async function loginUser(req, res) {
    try {
        const { name, password } = req.body;

        // check if user exists
        const user = await User.findOne({ name });
        if (!user) {
            return res.json({
                error: 'User not found'
            })
        }

        // check if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            // Create a login token
            const token = createToken(user._id);

            // json the user for development purposes, but later should remove for confidentiality
            return res.json({ ...user._doc, token });
        } else {
            return res.json({ error: 'Incorrect password' })
        }
    } catch (error) {
        console.log(error)
    }
}

// TODO
async function logoutUser(req, res) {
    try {
        const { name, password } = req.body;

        // check if user exists
        const user = await User.findOne({ name });
        if (!user) {
            return res.json({
                error: 'User not found'
            })
        }

        // check if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            // Create a login token
            const token = createToken(user._id);

            // json the user for development purposes, but later should remove for confidentiality
            return res.json({ ...user._doc, token });
        } else {
            return res.json({ error: 'Incorrect password' })
        }
    } catch (error) {
        console.log(error)
    }
}

async function editUser(req, res) {
    try {
        const { id } = req.params;
        const update = req.body;

        // check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.json({
                error: 'User could not be found. Please log in again.'
            });
        } else {
            // Check for name
            const { name, email } = update;
            const nameExist = await User.findOne({ name });
            if (nameExist && nameExist._id != id) {
                return res.json({
                    error: 'Username is invalid or already in use'
                })
            }
 
            // Check for email
            const emailExist = await User.findOne({ email });
            if (emailExist && emailExist._id != id) {
                return res.json({
                    error: 'Email is invalid or already registered'
                });
            }

            // Prevent password from being altered
            if (update.password) {
                delete update.password;
            }

            const newUser = await User.findByIdAndUpdate(user._id, { ...update });
            res.json({newUser});
        }
    } catch (error) {
        console.log(error);
    }
}

async function getUser(req, res) {
    try {
        const { id } = req.params;

        // check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.json({
                error: 'User not found'
            });
        }
        delete user.password;
        return res.json(user);
    } catch (error) {
        console.log(error);
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
    registerUser,
    loginUser,
    logoutUser,
    editUser,
    getUser,
};