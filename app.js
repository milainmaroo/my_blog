const express = require('express');
const morgan = require('morgan');

const app = express();

// register view engine
app.set('view engine', 'ejs');

// listen for request
app.listen(3000);

// create middleware
//app.use(morgan('dev'));

// middleware for static files
app.use(express.static('public'));

// make a request and send a response
app.get('/', (req, res) => {
    const blogs = [
        {title:'Title A', snippet: 'This is about A'},
        {title:'Title B', snippet: 'This is about B'},
        {title:'Title C', snippet: 'This is about C'},
    ];
    res.render('index', { title: 'Home', blogs});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
});

app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

