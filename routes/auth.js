// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Data = require('../models/data');

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
    return res.render('admin', { username: req.session.user.username }, work_no);
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

//saving data in datadase
router.post('/details', async(req,res) => {
  try {
    const {work_no, date, d_date, p_no, add, f_type, f_status, w_status} = req.body;
    
    // Check if work order no already exists
    const existingno = await Data.findOne({ work_no });
    if (existingno) {
      return res.status(400).json({ message: 'Order number already exists' });
    }

    const data = new Data({work_no, date, d_date, p_no, add, f_type, f_status, w_status});
    await data.save()
    res.redirect('/dashboard');
  }
    catch (error) {
      console.log(err);
    }
});


router.get('/details', async(req,res) => {
  res.redirect('/dashboard');
});

router.post('/edit', (req,res) => {
  
});


module.exports = router;






// Quotation 
// signup limitation


// header ma vache username print karaviaa
//our team

// fiter page sarkhu nai lagtu suit nai thatu maybe background white nathi atle 
// add float label ?

//admin footer after data show
//fiter2(remaining) and quotation also remaining
