// Author : AurelBouchard
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

// mongoose.connect : Aurelien have restricted admin rights !!
mongoose.connect('mongodb+srv://Aurelien:iSx37QpbdjWSE2Y@hotsauces.fpxp5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(bodyParser.json()); // DOES NOT HANDLE MULTIPART BODIES !!

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);    // / + /:id + /:id/like
app.use('/api/auth', userRoutes);       // /api/auth/signup  +   /api/auth/login

module.exports = app;
