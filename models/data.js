const { text } = require('express');
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    work_no: { type: String, required: true, unique: true },
    date: { type: Date},
    d_date: { type: Date},
    p_no: { type: Number, required: true},
    add: { type: String},
    f_type: { type: String},
    f_status: { type: String, enum: ['order pending','delivery pending', 'delivered'], default: 'pending'},
    w_status: { type: String, enum: ['details pending', 'measurement pending', 'given for stiching', 'delivery pending', 'order delivered'], default: 'pending'},
});

const Data = mongoose.model('Data', dataSchema);
module.exports = Data;