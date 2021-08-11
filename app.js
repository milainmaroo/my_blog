const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// connect to database
const dbURL = 'mongodb+srv://netninja:test4321@nodetuts.tm0wj.mongodb.net/my-blogs?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(result => app.listen(3000)) // listen for request
        .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

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

