
const mongoose = require('mongoose');

const Admingroceryschema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{type:String},
  rating: { type: Number, min: 0, max: 5 },
  address: { type: String, required: true },
  location: { type: String },  
  description: { type: String },
  products: { type: String },  
  phone: { type: String },
  openingHours: { type: String },  
});

module.exports = Admingroceryschema;
