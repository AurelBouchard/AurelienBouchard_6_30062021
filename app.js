// Author : AurelBouchard
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const stuffRoutes = require('./routes/stuff');
//const userRoutes = require('./routes/user');
const path = require("path");

const app = express();

// mongoose.connect need to be updated with P6 cluster
mongoose.connect('mongodb+srv://AurelBouchard:kPriHjpPR92Sv9A@cluster0.aosfi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use("/api/stuff", stuffRoutes);
//app.use("/api/auth", userRoutes);

module.exports = app;
