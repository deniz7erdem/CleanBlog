const express = require("express");

const app = express();

app.get('/', (req, res) => {
    const post = { id: 1, title: "Blog title", description: "Blog description" }
    res.send(post);
})

app.listen(3000, () => {
    console.log("Sunucu başladı");
})