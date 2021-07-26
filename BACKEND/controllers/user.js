const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signUp = (req, res) => {
    if (!isPswOk(req.body.password)) {
        res.status(400).json({message: "Mot de passe trop faible"});
        return 0}
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save( ) // handle here the duplicate email :function (err) {console.log(err);}
                // https://www.npmjs.com/package/mongoose-unique-validator
                .then(() => res.status(201).json({message: "Le nouvel utilisateur a été créé !"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};


exports.logIn = (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {return res.status(401).json({error: "Utilisateur non trouvé."});}

            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if (!valid) {return res.status(401).json({error: "Mot de passe erroné."});}
                    res.status(200).json({
                        userId: user._id, // fourni par mongodb à la creation de l'utilisateur
                        token:
                            jwt.sign(
                            {userId: user._id},
                                process.env.JWT_PASS_PHRASE,
                            {expiresIn: '8h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));

};


exports.unsubscribe = (req, res) => {
    // this endpoint is not handled by frontend by now
    // in the future it will must provide a DELETE request from an authenticated and logged user

    User.deleteOne({_id: req.params.id})
        .then(()=> res.status(200).json({message:"Utilisateur supprimé"}))
        .catch(error => res.status(400).json({ error }));

};


function isPswOk(password) {
    // use regex : ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})
    // (?=.*[a-z]) => must includes lowercase
    // (?=.*[A-Z]) => must includes uppercase
    // (?=.*[0-9]) => must includes numbers
    // (?=.*[?!@#$%^&*=|£²³`"'ø§€]) => must includes special char
    // (?=.{8,}) => must be at least 8 chars long
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[?!@#$%^&*=|£²³`"'ø§€])(?=.{8,})/;
    return pattern.test(password);
}