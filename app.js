const express = require("express");
const mongoose = require('mongoose')
const ejs = require('ejs');
const Post = require('./models/Post')

const app = express();

//DB
mongoose.connect('mongodb://localhost/denyLogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//temp eng
app.set("view engine", "ejs");

//midwares
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//routes 
app.get('/', async (req, res) => {
    const posts = await Post.find({});
    res.render('index',{
        posts
    });
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/post/:id',async (req,res)=>{
    const post = await Post.findById(req.params.id);

    res.render('post',{post});
})

// app.get('/post', (req, res) => {
//     res.render('post');
// })

app.get('/add_post', (req, res) => {
    res.render('add_post');
})

app.post('/post',async (req,res)=>{
    await Post.create(req.body);
    res.redirect('/');
})

app.listen(3000, () => {
    console.log("Sunucu başladı");
})


