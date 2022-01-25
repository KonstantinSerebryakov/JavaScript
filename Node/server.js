const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const router = require('./router');

app.use(function logMethodAndUrl(request, response, next) {
    console.log(`${request.method} ${request.url}`)
    next()
})

app.use(bodyParser.json({type: "application/json"}));

app.get('/', (req, res) => {
    res.end('This is a simple request');
});

app.get('/health-check', (req, res) => {
    res.json({
        date: new Date,
        message: 'Server is running'
    });
})

app.use('/', router);

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Server is listening on ${port}`)
})

module.exports = app;
