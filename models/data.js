const { text } = require('express');
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    work_no: { type: String, required: true, unique: true },
    date: { type: Date},
    d_date: { type: Date},
    p_no: { type: Number},
    add: { type: String},
    f_type: { type: String},
    f_status: { type: String, enum: ['Order Pending','Delivery Pending', 'Delivered']},
    w_status: { type: String, enum: ['Details Pending', 'Measurement Pending', 'Given for Stiching', 'Delivery Pending', 'Order Delivered']},
    room_number1: { type: Number},
    room_name1: { type: String},
    window_number1: { type: Number},
    width1: { type: Number},
    height1: { type: Number},
    curtain1: { type: String},
    fabric1: { type: String},
    fabric_req1: { type: Number},
    blackout1: { type: String},
    blackout_req1: { type: String}
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;