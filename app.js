const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// express function returns an express application 
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(function (req, res, next) {
    req.context = {
        coder: 'atefe',
        site: 'USA'
    };
    next && next();
});

app.use((req, res, next) => {
    // using property to send message between middlewares
    req.message = 'This message made it';
    next();
});

app.use((req, res, next) => {
    console.log('message from previous middleware: ', req.message);
    next();
});


const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
];

app.set('view engine', 'pug');

// to create route
app.get('/', (req, res) => {
    console.log("req.context", req.context);
    const name = req.cookies.username;
    // ES6 object shorthhand: if key : value are the same, no need to use colomn syntax.
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant'a tomb?", colors, hint: "some hint to help you"});
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    console.dir(req.body);
    // sends a cookie to browser after form was submitted
    res.cookie('username', req.body.username);
    res.redirect('/');

});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Middleware
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// run a server on the specified port
app.listen(3000, () => {
    console.log('The application is running on local host! 3000');
});

