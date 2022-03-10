//ADD MONGOOSE 
const mongoose = require('mongoose');
require('mongoose-type-email');

//ADD PLUGIN
const uniqueValidator = require('mongoose-unique-validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');

//CREATE A SCHEMA OF DATA FOR USER
const userSchema = mongoose.Schema({
  email: { type: String, required: [true, 'Veuillez entrer votre adresse email'], unique: true,
  match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"]},
  password: { type: String, required: [true, 'Veuillez choisir un mot de passe']}
});

//CALL THE PLUGIN AND PASS THE UNIQUEVALIDATOR
userSchema.plugin(uniqueValidator);
//CALL THE PLUGIN AND PASS THE SANITIZERPLUGIN
userSchema.plugin(sanitizerPlugin);

////EXPORT THE MODULE
module.exports = mongoose.model('User', userSchema);