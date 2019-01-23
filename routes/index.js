const express = require('express');
const router = express.Router();


// to create route
router.get('/', (req, res) => {
    const name = req.cookies.username;
    // ES6 object shorthhand: if key : value are the same, no need to use colomn syntax.
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    console.dir(req.body);
    // sends a cookie to browser after form was submitted
    res.cookie('username', req.body.username);
    res.redirect('/');

});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

module.exports = router;