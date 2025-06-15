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
router.post('/measure-save', async (req, res) => {
  try {
    const { redirect_to = 'measurement' } = req.body;
    const {
      work_no,
      name,
      date,
      d_date,
      p_no,
      add,
      f_type,
      f_status,
      w_status,
      roman = 0,
      american = 0,
      ring = 0,
      total_fab_req,
      total_black_req,
      // measurement fields
      room_number = [],
      room_name = [],
      window_number = [],
      curtain = [],
      width = [],
      height = [],
      fabric = [],
      fabric_req = [],
      blackout = [],
      blackout_req = [],
      rate = [],
      hsn = [],
      gst = [],
      // quotation fields
      material = [],
      qty = [],
      q_rate = [],
      discount = [],
      sub_total = [],
      q_gst = [],
      grand_total = [],
      q_hsn = [],
      totalQuotationGrand = 0
    } = req.body;

    // ✅ Measurement Rows (filtered properly)
    const rows = [];
    
    for (let i = 0; i < room_number.length; i++) {
      const isRowFilled =
        room_number[i]?.trim?.() ||
        room_name[i]?.trim?.() ||
        window_number[i]?.trim?.() ||
        curtain[i]?.trim?.() ||
        width[i]?.trim?.() ||
        height[i]?.trim?.() ||
        fabric[i]?.trim?.() ||
        fabric_req[i]?.trim?.() ||
        blackout[i]?.trim?.() ||
        blackout_req[i]?.trim?.() ||
        rate[i]?.trim?.() ||
        hsn[i]?.trim?.() ||
        gst[i]?.trim?.();

      if (isRowFilled) {
        rows.push({
          room_number: room_number[i] !== "" ? Number(room_number[i]) : null,
          room_name: room_name[i] || '',
          window_number: window_number[i] !== "" ? Number(window_number[i]) : null,
          curtain: curtain[i] || '',
          width: width[i] !== "" ? Number(width[i]) : null,
          height: height[i] !== "" ? Number(height[i]) : null,
          fabric: fabric[i] || '',
          fabric_req: fabric_req[i] !== "" ? Number(fabric_req[i]) : null,
          blackout: blackout[i] || '',
          blackout_req: blackout_req[i] !== "" ? Number(blackout_req[i]) : null,
          rate: rate[i] !== "" ? Number(rate[i]) : null,
          hsn: hsn[i] !== "" ? Number(hsn[i]) : null,
          gst: gst[i] !== "" ? Number(gst[i]) : null
        });
      }
    }

    // ✅ Quotation Rows
    const quotation = [];
    for (let i = 0; i < material.length; i++) {
      const isFilled =
        material[i]?.trim?.() ||
        qty[i]?.trim?.() ||
        q_rate[i]?.trim?.() ||
        discount[i]?.trim?.() ||
        sub_total[i]?.trim?.() ||
        q_gst[i]?.trim?.() ||
        grand_total[i]?.trim?.() ||
        q_hsn[i]?.trim?.();

      if (isFilled) {
        quotation.push({
          material: material[i] || '',
          qty: parseFloat(qty[i]) || 0,
          q_rate: parseFloat(q_rate[i]) || 0,
          discount: parseFloat(discount[i]) || 0,
          sub_total: parseFloat(sub_total[i]) || 0,
          q_gst: parseFloat(q_gst[i]) || 0,
          grand_total: parseFloat(grand_total[i]) || 0,
          q_hsn: q_hsn[i] || ""
        });
      }
    }

    // ✅ Full Update Object (single save)
    const updateObject = {
      work_no,
      name,
      date,
      d_date,
      p_no,
      add,
      f_type,
      f_status,
      w_status,
      roman: roman !== "" ? Number(roman) : null,
      american: american !== "" ? Number(american) : null,
      ring: ring !== "" ? Number(ring) : null,
      total_fab_req: total_fab_req !== "" ? Number(total_fab_req) : null,
      total_black_req: total_black_req !== "" ? Number(total_black_req) : null,
      rows,
      quotation,
      total_grand_total: parseFloat(totalQuotationGrand) || 0
    };

    // ✅ Save once
    const updatedData = await Data.findOneAndUpdate(
      { work_no },
      updateObject,
      { new: true, upsert: true }
    );

    res.render(redirect_to, {
      no: updatedData,
      quotation: updatedData.quotation || []
    });


  } catch (error) {
    console.error('Error in /measure-save:', error);
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

router.post('/fitter-save', async (req, res) => {
  try {
    const {
      work_no,
      name,
      date,
      d_date,
      p_no,
      add,
      room_number = [],
      room_name = [],
      window_number = [],
      curtain = [],
      width = [],
      height = [],
      fabric = [],
      fabric_req = [],
      blackout = [],
      blackout_req = [],
      rate = [],
      hsn = [],
      gst = [],
      roman,
      american,
      ring,
      total_fab_req,
      total_black_req
    } = req.body;

    const rows = [];

    for (let i = 0; i < room_name.length; i++) {
      if (room_name[i] || fabric[i]) {
        rows.push({
          room_number: Number(room_number[i]) || null,
          room_name: room_name[i] || '',
          window_number: Number(window_number[i]) || null,
          curtain: curtain[i] || '',
          width: Number(width[i]) || null,
          height: Number(height[i]) || null,
          fabric: fabric[i] || '',
          fabric_req: Number(fabric_req[i]) || null,
          blackout: Number(blackout[i]) || null,
          blackout_req: Number(blackout_req[i]) || null,
          rate: Number(rate[i]) || null,
          hsn: Number(hsn[i]) || null,
          gst: Number(gst[i]) || null,
        });
      }
    }

    const updateObject = {
      name,
      date,
      d_date,
      p_no,
      add,
      rows,
      roman: Number(roman) || 0,
      american: Number(american) || 0,
      ring: Number(ring) || 0,
      total_fab_req: Number(total_fab_req) || 0,
      total_black_req: Number(total_black_req) || 0
    };

    // ✅ Await inside async function
    const updatedData = await Data.findOneAndUpdate(
      { work_no },
      updateObject,
      { new: true, upsert: true }
    );

    res.render('measurefitter', {
      no: updatedData,
      quotation: updatedData.quotation || []
    });

  } catch (err) {
    console.error('Error in /fitter-save:', err);
    res.status(500).send('Failed to update measurement');
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

//to get dropdown list for the suggestion 
router.get('/admin/suggestions', async (req, res) => {
  try {
    const query = req.query.query || '';
    const suggestions = await Data.find({
      $or: [
        { work_no: { $regex: `^${query}`, $options: 'i' } },
        { name: { $regex: `^${query}`, $options: 'i' } }
      ]
    })
    .select('work_no name')
    .limit(5);

    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/admin/all-suggestions', async (req, res) => {
    try {
        const allWorks = await Data.find({}, 'work_no name'); // Adjust collection name
        res.json(allWorks);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

//for geting details with their id.
router.get('/admin/:id', async (req, res) => {
    try {
        const no = await Data.findById(req.params.id);
        if (!no) return res.status(404).send('ID not found');
        res.render('detail', { no }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//to delete the order from admin page
router.delete('/admin/delete/:id', async (req, res) => {
    try {
        const deleted = await Data.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

//to search order
// Search by work_no OR name
router.post('/admin/search', async (req, res) => {
  try {
    const searchQuery = req.body.work_no?.trim();
    const workNumbers = await Data.find().sort({ createdAt: -1 });

    const searchedWork = await Data.find({
      $or: [
        { work_no: searchQuery },
        { name: { $regex: new RegExp(searchQuery, 'i') } }
      ]
    });

    res.render('admin', { workNumbers, searchedWork });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



//For updating and saving data in detail page (admin)


router.post('/bill', async(req,res) => {
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
    res.render('bill', { no });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating order');
  }
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


