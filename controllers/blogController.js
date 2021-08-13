const Blog = require('../models/blog');

// Home Page (index.ejs)
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('index', { title: 'Home', blogs: result }))
        .catch(err => console.log(err))
}

// About Page
const blog_about = (req, res) => {
    res.render('about', { title: 'About' });
}

// Create Page (create.ejs)
const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create New Blog' });
}

// Add New Blog to Home Page
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => res.redirect('/'))
        .catch(err => console.log(err)); 
}

// Get a single blog
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details '});
        })
        .catch(err => res.status(404).render('404', { title: 'Page Not Found' }));
}


// Delete a single blog
const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => res.json({ redirect: '/' }))
        .catch(err => console.log(err));
}


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_about
}