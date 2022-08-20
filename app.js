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
app.use(methodOverride('_method'));

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
});

app.put('/post/:id',async () =>{
    const post = await Post.findOne({_id:req.params.id});
    post.title=req.body.title;
    post.detail=req.body.detail;
    post.save();
    res.redirect(`/post/${req.params.id}`)
});

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

app.get('/post/edit/:id',async (req,res)=>{
    const post = await Post.findOne({_id:req.params.id});
    res.render('edit',{
        post
    });
});




app.listen(3000, () => {
    console.log("Sunucu başladı");
})


