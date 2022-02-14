const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const { render } = require('ejs')
const port = 3000
const blogRoutes = require('./routes/blogRoutes')
const Blog = require('./models/blog')
const { db } = require('./models/blog')
const { title } = require('process')


//connecting to the mongoDB database

const dbURI = 'mongodb+srv://emash90:Classic105.@nodetut.mmtu1.mongodb.net/nodetutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result) => app.listen(port))
.catch((err) => console.log(err)) 


app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use('/images', express.static('images'))
app.use(express.urlencoded({ extended: true}))

//mongoose and mongo sandbox routes

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'welcome to my first blog again',
//         snippet: 'first mongodb assignment',
//         body: 'mongoDB noSQL database tutorial'

//     })
//     blog.save()
//     .then((result) =>{
//         res.send(result)
//     })
//     .catch( (err) =>{
//         console.log(err)
//     })
// })
// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err)
//     }) 
// })

/*app.get('', (req, res) => {

   
   })*/


app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/blogs'})
    })
    .catch(err => {console.log(err)})
})
app.patch('/blogs/:id', (req, res) => {
    const { id } = req.params.id
    const updateObject = req.body
    Blog.findByIdAndUpdate(id, updateObject, {$set: updateObject})
    .then(result => {
        res.json({ redirect: '/blogs/:id'})
    })
    .catch(err => {console.log(err)})
})






app.get('/', (req, res) => {
    const blogs = 
    res.redirect('/blogs')
})


//blog routes
app.use('/blogs', blogRoutes)

app.get('/about', (req, res) => {
    res.render('about', {title: 'about'})
})



app.get('/create', (req, res) => {
    res.render('create', {title: 'new blog'})
})

//404 page


app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})