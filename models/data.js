const { text } = require('express');
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    work_no: { type: String, required: true, unique: true },
    name: { type: String},
    date: { type: Date},
    d_date: { type: Date},
    p_no: { type: Number},
    add: { type: String},
    f_type: { type: String},
    f_status: { type: String, enum: ['Order Pending','Delivery Pending', 'Delivered']},
    w_status: { type: String, enum: ['Details Pending', 'Measurement Pending', 'Given for Stiching', 'Delivery Pending', 'Order Delivered']},
    roman: { type: Number, default: 0},
    american: { type: Number, default: 0},
    ring: { type: Number, default: 0},
    total_fab_req: { type: Number, default: 0},
    total_black_req: { type: Number, default: 0},
//});

//for (let i = 1; i <= 20; i++) {
  //  dataSchema.add({
   //     ['room_number' + i]: { type: Number },
   //     ['room_name' + i]: { type: String },
    //    ['window_number' + i]: { type: Number },
    //    ['width' + i]: { type: Number },
    //    ['height' + i]: { type: Number },
    //    ['curtain' + i]: { type: String, enum: ['American','Ring', 'Roman']},
    //    ['fabric' + i]: { type: String },
    //    ['fabric_req' + i]: { type: Number },
    //    ['blackout' + i]: { type: Number },
    //    ['blackout_req' + i]: { type: Number },
    //    ['rate' + i]: { type: Number },
    //    ['hsn' + i]: { type: Number },
    //    ['gst' + i]: { type: Number }
    //});
//}
},
{ strict: false } // This allows saving **any extra keys** like room_number21, rate53, etc.
);

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;