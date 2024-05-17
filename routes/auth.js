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
    return res.redirect('/admin');
  } else if (role === 'backend') {
    return res.redirect('/backend');
  } else if (role === 'fiter') {
    return res.redirect('/fiter');
  } else if (role === 'tailor') {
    return res.redirect('/tailor');
  }
});

router.get('/admin', async (req, res) => {
  if (req.session.user && req.session.user.role === 'admin') {
    try {
      const workNumbers = await Data.find({}, 'work_no'); // Fetch all work_no
      res.render('admin', { username: req.session.user.username, workNumbers });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  } else {
    return res.redirect('/login');
  }
});

// Similarly, add routes for 'backend', 'fiter', and 'tailor'
router.get('/backend', (req, res) => {
  if (req.session.user && req.session.user.role === 'backend') {
    return res.render('backend', { username: req.session.user.username });
  } else {
    return res.redirect('/login');
  }
});

router.get('/fiter', (req, res) => {
  if (req.session.user && req.session.user.role === 'fiter') {
    return res.render('fiter', { username: req.session.user.username });
  } else {
    return res.redirect('/login');
  }
});

router.get('/tailor', (req, res) => {
  if (req.session.user && req.session.user.role === 'tailor') {
    return res.render('tailor', { username: req.session.user.username });
  } else {
    return res.redirect('/login');
  }
});



router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

//saving data in datadase from backend
router.post('/details', async(req,res) => {
  try {
    const {work_no, name, date, d_date, p_no, add, f_type, f_status, w_status} = req.body;
    
    // Check if work order no already exists
    const existingno = await Data.findOne({ work_no });
    if (existingno) {
      return res.status(400).json({ message: 'Order number already exists' });
    }

    const data = new Data({work_no, name, date, d_date, p_no, add, f_type, f_status, w_status});
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

//searching data from work_no in backend
router.post('/edit', async(req,res) => {
  const { work_no } = req.body;

  try {
    const no = await Data.findOne({ work_no });
    if (!no) {
      return res.status(404).send('Work order not found');
    }
    res.render('backend2', { no });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/edit', async(req,res) =>{
  res.redirect('backend2');
});

// backend 2 ma aavela data edit karva
router.post('/update-edit', async (req, res) => {
  try {
    const { work_no, name, date, d_date, p_no, add, f_type, f_status, w_status } = req.body;

    // Find the document by work_no and update it
    const updatedData = await Data.findOneAndUpdate(
      { work_no: work_no },
      { date: date, name: name, d_date: d_date, p_no: p_no, add: add, f_type: f_type, f_status: f_status, w_status: w_status },
      { new: true }
    );

    if (!updatedData) {
      // If the document with the specified work_no is not found, return an error
      return res.status(404).send('Order not found');
    }

    // Redirect to a success page after the update
    res.render('backend');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order');
  }
});

//  tailor ma work no nakhvathi eni details aave

router.post('/tai', async(req,res) => {
  const { work_no } = req.body;

  try {
    const no = await Data.findOne({ work_no });
    if (!no) {
      return res.status(404).send('Work order not found');
    }
    res.render('tailor2', { no });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/tai', async(req,res) =>{
  res.redirect('tailor2');
});

//w_status edit karva
router.post('/edit-tai', async (req, res) => {
  try {
    const { work_no, w_status } = req.body;

    // Find the document by work_no and update it
    const updatedData = await Data.findOneAndUpdate(
      { work_no: work_no },
      { w_status: w_status },
      { new: true }
    );

    // Redirect to a success page after the update
    res.render('tailor');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order');
  }
});

// for fiter order details from database
router.post('/fit', async(req,res) => {
  const { work_no } = req.body;

  try {
    const no = await Data.findOne({ work_no });
    if (!no) {
      return res.status(404).send('Work order not found');
    }
    res.render('fiter2', { no });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//fitter add room 
router.post('/addroom', async(req,res) => {
  try{
    const {work_no} = req.body;
    const body = req.body;

    const updatedData = await Data.findOneAndUpdate(
      { work_no: work_no },
        body ,
      { new: true }
    );

    const no = await Data.findOne({ work_no });
    if (!no) {
      return res.status(404).send('Work order not found');
    }
    res.render('Quotation', { no });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order');
  }
});


//for geting details with their id.
router.get('/admin/:id',async (req,res)=>{            
       const id = req.params.id;

        try {
        const no = await Data.findById(id);
        if (!no) {
          return res.status(404).send('id not found');
        }
        res.render('detail', { no });
    
        } catch (err) {
            console.error(err);
        }
});

router.delete('/:id', (req,res)=>{
     const id = req.params.id;
  
     Blog.findByIdAndDelete(id)
         .then(result =>{
             res.json({ redirect: '/blogs' })
         })
         .catch(err =>{
            console.log(err);
         })
});
  
  









module.exports = router;






//fiter 2 ma fabric b upper ni details ma print karavu che ?? 
//reason: k backend pse aa loko fabric kayu use karvu aa lakhvse to fitter ne khbr hovi joia already
// bcz backend pelaj order kari dese ne ?? or else home craft ma puchvanu che k backend karse k fiter aj ??

// Quotation 
// signup limitation


// header ma vache username print karaviaa
//our team

// add float label ?


