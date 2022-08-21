const express = require("express");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const Post = require('./models/Post');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    methodOverride("_method", {
      methods: ["POST", "GET"],
    })
  );

//routes 
app.get('/',postController.getPosts);

app.get('/about', pageController.getAbout)

app.get('/post/:id',postController.getPost);

app.put('/post/:id', postController.putPost);

app.get('/add_post', pageController.getAddPost);

app.post('/post', postController.postPost);

app.get('/post/edit/:id', postController.editPost);

app.delete('/post/:id',postController.delPost);


app.listen(3000, () => {
    console.log("Sunucu başladı");
})


