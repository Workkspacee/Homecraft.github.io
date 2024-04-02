const express = require('express');

const app = express();

// view engine dynamic data use karva ma help kare 
app.set('view engine','ejs');

app.listen(9362);

app.get('/',(req, res) => {
    res.render('login');
});