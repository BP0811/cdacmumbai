// Import dependency modules
var express = require('express');
var session = require('express-session');
var parseurl = require('parseurl');
var path = require('path');
var bodyParser = require('body-parser');

// Initialize the Express app
var app = express();


// Set up session middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session Memory Configuration
var sessionOptions = {
    secret: "secret",
    resave: true,
    saveUninitialized: false
};

app.use(session(sessionOptions));

// Configure Interceptor for Session Management
app.use(function (req, res, next) {
    // Define session variables
    if (!req.session.views) {
        req.session.views = {};
        req.session.views.shoppingCart = [];
    }

    var pathname = parseurl(req).pathname;

    // Count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

    next();
});

// Serve Static Files
var staticFolder = express.static(path.join(__dirname, "public"));
app.use(staticFolder);


// Start the server
var PORT = 8000;
app.listen(PORT) 
    console.log(`Server is running on http://localhost:${PORT}`);

