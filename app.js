const express = require('express');
const mongoose = require('mongoose');
const blogController = require('./controllers/blogController');

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
app.get('/', blogController.blog_index);

app.get('/about', blogController.blog_about);

app.get('/create', blogController.blog_create_get);

app.post('/', blogController.blog_create_post);

app.get('/:id', blogController.blog_details);

app.delete('/:id', blogController.blog_delete);

