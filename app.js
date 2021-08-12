const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

// connect to database
const dbURL = 'mongodb+srv://netninja:test4321@nodetuts.tm0wj.mongodb.net/my-blogs?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(result => app.listen(3000)) // listen for request
        .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware for static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// Routes
// Home Page (index.ejs)
app.get('/', (req, res) => {
    Blog.find()
        .then(result => res.render('index', { title: 'Home', blogs: result }))
        .catch(err => console.log(err))
});

// About Page (about.ejs)
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Create Page (create.ejs)
app.get('/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
});

// Add New Blog to Home Page
app.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err)); 
});

// 404 Page (404.ejs)
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

