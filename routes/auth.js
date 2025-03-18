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
      const workNumbers = await Data.find({}, 'work_no name'); // Fetch all work_no
      res.render('admin', { username: req.session.user.username, workNumbers, searchedWork: null});
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


// For opening measurement page with saving details and showing that details 
router.post('/measure', async(req,res) => {
  try {
    const {work_no, name, date, d_date, p_no, add, f_type, f_status, w_status} = req.body;
    
    // Check if work order no already exists
    const existingno = await Data.findOne({ work_no });
    if (existingno) {
      return res.status(400).json({ message: 'Order number already exists' });
    }

    const data = new Data({work_no, name, date, d_date, p_no, add, f_type, f_status, w_status});
    await data.save()
    
    const no = await Data.findOne({ work_no });
    res.render('measurement',{ no });
  }
    catch (error) {
      console.log(err);
    }
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

// Find workno and open measurement for it in backend
router.post('/mea', async(req,res) => {
  const { work_no } = req.body;

  try {
    const no = await Data.findOne({ work_no });
    if (!no) {
      return res.status(404).send('Work order not found');
    }
    res.render('measurement', { no });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Find workno and open quotation for it in backend
router.post('/quota', async(req,res) => {
  const { work_no } = req.body;

  try {
    const no = await Data.findOne({ work_no });
    if (!no) {
      return res.status(404).send('Work order not found');
    }
    res.render('Quotation', { no });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
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

// Measurement page ma data save karva and edit karva 
router.post('/measure-save', async(req,res) => {
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
    res.render('measurement', { no });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order');
  }
});

//link to quotation page on measurement page 
router.post('/measure-quotation', async(req,res) => {
  const { work_no } = req.body;

  try {
    const no = await Data.findOne({ work_no });
    if (!no) {
      return res.status(404).send('Work order not found');
    }
    res.render('Quotation', { no });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
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
    res.render('measurefitter', { no });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// for resubmit the quotation page 

router.post('/page2', async(req,res) => {
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

//to delete the order from admin page
router.delete('/delete/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const deletedWork = await Data.findByIdAndDelete(id);
      if (!deletedWork) {
          return res.status(404).json({ success: false, message: "Work order not found" });
      }
      res.json({ success: true });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
  }
});

//to search order
router.post('/admin/search', async (req, res) => {
  try {
      const { work_no } = req.body;
      const work = await Data.findOne({ work_no });

      const workNumbers = await Data.find({}, 'work_no name'); // Fetch all work orders

      res.render('admin', { 
          searchedWork: work || null, 
          workNumbers,  // Ensure the work list is still displayed
          username: req.session.user.username // Pass username
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

//to get dropdown list for the suggestion 
router.get('/admin/suggestions', async (req, res) => {
  try {
      const query = req.query.query;
      const suggestions = await Data.find({ work_no: new RegExp(query, 'i') }).limit(5);

      res.json(suggestions);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
}); 








router.get('/bill', (req,res) =>{
  res.render('bill');
});

router.get('/bill2', (req,res) =>{
  res.render('bill2');
});
module.exports = router;




//fiter ma work status done
//Bill page 2 che kayu saru che aa joi leje
//bill ma tax type valu table ma entry ni khbr nai atle atiyare same paste karyu che
//fiter 2 ma fabric b upper ni details ma print karavu che ?? 
//reason: k backend pse aa loko fabric kayu use karvu aa lakhvse to fitter ne khbr hovi joia already
// bcz backend pelaj order kari dese ne ?? or else home craft ma puchvanu che k backend karse k fiter aj ??

// Quotation 
// signup limitation


// header ma vache username print karaviaa
//our team

// add float label ?

//dynamic table dynamic variable for data.js , table


