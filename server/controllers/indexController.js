// controller for index.js entrypoint at path '/'

// initial test function
const test = (req, res) => {
    res.json('test is working');
};

module.exports = {
    test
};