const Blog = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Blogs', blogs: result })
        })
        .catch(err => console.log(err))
}

const blog_details = (req, res) => {
    // id should be the same with :id
    Blog.findById(req.params.id)
        .then(result => {
            res.render('blogs/blog', {
                blog: result,
                title: result.title
            })
        })
        .catch(err => {
            res.status(404).render('404', {
                title: '404',
                content: 'Blog'
            })
        })
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', {
        title: 'Create a Blog'
    })
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => res.redirect('/blogs'))
        .catch(err => console.log(err))
}

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json({ redirect: '/blogs' })
        })
        .catch(err => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}