const express = require("express");

const app = express();

const ejs = require('ejs');
app.set("view engine", "ejs");

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/post', (req, res) => {
    res.render('post');
})

app.get('/add_post', (req, res) => {
    res.render('add_post');
})

app.listen(3000, () => {
    console.log("Sunucu başladı");
})