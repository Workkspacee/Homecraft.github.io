const express = require('express');

const app = express();

// view engine dynamic data use karva ma help kare 
app.set('view engine','ejs');

//for linking static file(css files)
app.use(express.static('css'));
app.use(express.static('Script'));

app.listen(9362);

app.get('/',(req, res) => {
    res.render('login');
});