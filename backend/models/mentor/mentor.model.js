const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email:      { type: String, unique: true, required: true,index: true },
    name:       { type: String, required: true,index: true },
    address :   { type: String, required: true},
    phone:      { type: Number, required: true,index: true},
    tasks :     { type: Array, index: true},
    createdDate: { type: Date, default: Date.now }
})

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Mentor', schema);
