const { text } = require('express');
const mongoose = require('mongoose');

// Define a schema for each row in the measurement table
const rowSchema = new mongoose.Schema({
    room_number: { type: Number, default: null },
    room_name: String,
    window_number: { type: Number, default: null },
    curtain: { type: String, enum: ['American', 'Ring', 'Roman', 'Roller'] },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    fabric: String,
    fabric_req: { type: Number, default: null },
    blackout: { type: Number, default: null },
    blackout_req: { type: Number, default: null },
    rate: { type: Number, default: null },
    hsn: { type: Number, default: null },
    gst: { type: Number, default: null },
    fabric_received: { type: String, enum: ['Yes', 'No', ''], default: '' }
});

const quotationSchema = new mongoose.Schema({
  material: String,
  qty: Number,
  q_rate: Number,
  discount: Number,
  sub_total: Number,
  q_gst: Number,
  grand_total: Number,
  q_hsn: String
});

// Main schema
const dataSchema = new mongoose.Schema({
    work_no: { type: String, required: true, unique: true },
    name: { type: String },
    date: { type: Date },  
    d_date: { type: Date },  
    p_no: { type: Number },
    add: { type: String },
    s_add: { type: String },
    map_link: { type: String, default: '' },
    f_status: { type: String, enum: ['Order Pending', 'Delivery Pending', 'Delivered'] },
    w_status: { type: String, enum: ['Details Completed', 'Measurement Done', 'Quotation approved' , 'Stiching Done', 'Order Delivered'] },
    roman: { type: Number, default: null  },
    american: { type: Number, default: null  },
    ring: { type: Number, default: null  },
    roller: { type: Number, default: null  },
    aluminum: { type: Number, default: null  },
    ri_2: { type: Number, default: null  },
    total_fab_req: { type: Number, default: null  },
    total_black_req: { type: Number, default: null  },
    state: { type: String, default: '' },
    driver_name: { type: String },
    v_no: { type: String },
    loc: { type: String },
    lr_no: { type: String }, 
    supply_place: { type: String },
    due_date: { type: Date },
    // Infinite rows stored as array of objects
    rows: [rowSchema],
    quotation: [quotationSchema],
    total_grand_total: Number
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
