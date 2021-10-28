//Filename: api-routes.js

// Initialise express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'Welcome to RESTful APIs'
    });
});

//Export API routes
module.exports = router;