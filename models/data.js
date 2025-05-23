const { text } = require('express');
const mongoose = require('mongoose');

// Define a schema for each row in the measurement table
const rowSchema = new mongoose.Schema({
    room_number: { type: Number, default: null },
    room_name: String,
    window_number: { type: Number, default: null },
    curtain: { type: String, enum: ['American', 'Ring', 'Roman'] },
    width: { type: Number, default: null },
    height: { type: Number, default: null },
    fabric: String,
    fabric_req: { type: Number, default: null },
    blackout: { type: Number, default: null },
    blackout_req: { type: Number, default: null },
    rate: { type: Number, default: null },
    hsn: { type: Number, default: null },
    gst: { type: Number, default: null }
});

// Main schema
const dataSchema = new mongoose.Schema({
    work_no: { type: String, required: true, unique: true },
    name: { type: String },
    date: { type: Date },
    d_date: { type: Date },
    p_no: { type: Number },
    add: { type: String },
    f_type: { type: String },
    f_status: { type: String, enum: ['Order Pending', 'Delivery Pending', 'Delivered'] },
    w_status: { type: String, enum: ['Details Pending', 'Measurement Pending', 'Given for Stiching', 'Delivery Pending', 'Order Delivered'] },
    roman: { type: Number, default: null  },
    american: { type: Number, default: null  },
    ring: { type: Number, default: null  },
    total_fab_req: { type: Number, default: null  },
    total_black_req: { type: Number, default: null  },

    // Infinite rows stored as array of objects
    rows: [rowSchema]
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;
