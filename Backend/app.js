//ADD EXPRESS
const express = require('express');

//ADD HELMET (FOR SECURITY)
const helmet = require("helmet");

//ADD BODYPARSER
const bodyParser = require('body-parser');

//ADD MONGOOSE
const mongoose = require('mongoose');

//ADD DOTENV (FOR SECURITY)
require('dotenv').config()

//ROUTES
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/auth');

//CONNECT TO MONGOOSE
mongoose.connect(`mongodb+srv://PiiquanteAdmin:Admin123@piiquante.chceo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => console.log('Connection to MongoDB successful'))
    .catch(() => console.log('Connection to MongoDB failed'))

//CALL EXPRESS
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//CALL HELMET
app.use(helmet());

//CALL BODYPARSER
app.use(bodyParser.json());

//ADD STUFFROUTES
app.use('api/stuff', stuffRoutes);

// ---------------------------------------------------------

app.use(express.json());

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

app.use('/api/auth', userRoutes);

module.exports = app;
