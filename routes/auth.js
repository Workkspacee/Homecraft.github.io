// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/login', (req, res) => {
    res.render('login');
  });

router.get('/signup', (req, res) => {
  res.render('login');
});

router.post('/signup', async (req, res) => {
  try {
    const { username, password, conpassword, role} = req.body;
    
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if passwords match
    if (password !== conpassword) {
      return res.status(400).send("Passwords don't match");
    }

    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User name is not matched' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password is wrong' });
    }
    req.session.user = { id: user._id, username: user.username, role: user.role };
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  const { role } = req.session.user;
  if (role === 'admin') {
    return res.render('admin', { username: req.session.user.username });
  } else if (role === 'backend') {
    return res.render('backend', { username: req.session.user.username });
  } else if (role === 'fiter') {
    return res.render('fiter', { username: req.session.user.username });
  } else if (role === 'tailor') {
    return res.render('tailor', { username: req.session.user.username });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;





// Quotation 
// signup limitation
// work order status in all 

// add footer and header add karvu che? 
// homecraft and their logo in headder and logout button ?
// footer ma nice corner par made with love by @ names
// auto genreated motivation quotes ? header uper ?
// header ma vache username prine karaviaa
//our team

// fiter page sarkhu nai lagtu suit nai thatu maybe background white nathi atle 
//add float label ?

//back back2 header footer done and is perfect
//tailor and tailor2 h & f done perfectly and tailor.ejs ma br tag comment kareli che aa rakhvi k ni aa jovanu che
//admin footer done but ek vaar joi karvanu brbr nathi lagtu mane
//fiter done but brbr nai avtun and fiter2(remaining) and quotation also remaining
// difference shu che backend and bija pages ma aa jovanu che atle khbr pde k footer nd haeder km different ave che