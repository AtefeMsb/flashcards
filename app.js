const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// express function returns an express application 
const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes'); // this going to run index.js in routes folder.
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
// add path as first argument to mount those routes to
app.use('/cards', cardRoutes); //cardroutes variable

// Not Found page
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