//ADD MONGOOSE
const mongoose = require('mongoose');

//CREATE THE MONGOOSE SCHEMA
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//EXPORT THE MODULE
module.exports = mongoose.model('Thing', thingSchema);