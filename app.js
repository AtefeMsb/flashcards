const express = require('express');

// express function returns an express application 
const app = express();

// to create route
app.get('/', (request, response) => {
    response.send('I love Treehouse');
});

// run a server
app.listen(3000);

