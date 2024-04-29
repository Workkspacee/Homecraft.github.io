const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth')


const app = express();

//connection to mongodb
const dbURI = 'mongodb+srv://workspace:workspace123@homecraft.mdiguvg.mongodb.net/Homecraft?retryWrites=true&w=majority&appName=Homecraft'
mongoose.connect(dbURI)
.then((result) => {
    app.listen(9362);
    console.log('connection established.')})
    .catch((err) => console.log(err));

// view engine dynamic data use karva ma help kare 
app.set('view engine','ejs');

//for linking static file(css/js files)
app.use(express.static('css'));
app.use(express.static('Script'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));


app.use('/', authRoutes);

//app.get('/', (req, res) => res.render('login'));
//app.get('/backend', (req, res) => res.render('backend'));
//app.get('/backend2', (req, res) => res.render('backend2'));
//app.get('/fiter', (req, res) => res.render('fiter'));
//app.get('/fiter2', (req, res) => res.render('fiter2'));
//app.get('/tailor', (req, res) => res.render('tailor'));
//app.get('/tailor2', (req, res) => res.render('tailor2'));
//app.get('/admin', (req, res) => res.render('admin'));
app.get('/quotation', (req, res) => res.render('Quotation'));

