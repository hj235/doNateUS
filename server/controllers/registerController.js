// controller for register page at path '/register'

// register user function
function registerUser(req, res) {
    try {
        const {name, email, password} = req.body();
        // Check if fields are present? not sure if need since I'll add
        // a required attribute to the html input tag

        // Check if password is good
        if (!password || password.length < 8) {
            return res.json({
                error: 'Password should be at least 8 characters long.'
            })
        }

        // Check for email
        // TODO
    } catch (error) {
        
    }
}

module.exports = {
    registerUser
};