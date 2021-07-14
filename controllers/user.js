const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signIn = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: "Le nouvel utilisateur a été créé !"}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};


exports.logIn = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) {return res.status(401).json({error: "Utilisateur non trouvé."})};

            bcrypt.compare(req.body.password, user.password)
                .then(valid =>{
                    if (!valid) {return res.status(401).json({error: "Mot de passe erroné."})};
                    res.status(200).json({
                        userId: user._id, // fournit par mongodb à la creation de l'utilisateur
                        token: jwt.sign(
                            {userId: user._id},
                            "Quelleestlacouleurduchevalblancd'Henri4?"
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));

        })
        .catch(error => res.status(500).json({error}));

};


exports.logOut = (res, req, next) => {
return 0;
};
