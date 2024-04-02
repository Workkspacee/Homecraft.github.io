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

app.get('/backend',(req, res) => {
    res.render('backend');
});

app.get('/backend2',(req, res) => {
    res.render('backend2');
});

app.get('/fiter',(req, res) => {
    res.render('fiter');
});

app.get('/tailor',(req, res) => {
    res.render('tailor');
});