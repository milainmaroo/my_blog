const http = require('http');
const fs = require('fs');

// create a server
const server = http.createServer((req, res) => {
    //console.log(req.url);
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.setHeader('Location', '/about');
            res.statusCode = 301;
            break;
        case '/create':
            path += 'create.html';
            res.statusCode = 200;
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // send relevant html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    })
});


// listen for request
server.listen(3000, 'localhost', () => {
    console.log('listen for request');
});