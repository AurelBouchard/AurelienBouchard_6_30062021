const Sauce = require('../models/Sauce');
//const ObjectId = require('mongoose').Types.ObjectId; // help @ 44:30


exports.create = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce); //JSON.parse
    delete req.body._id;    // will be replaced by the mongodb one
    let sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};


exports.getAll = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};


exports.findById = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};


//exports.modifyStuff = (req, res, next) => {
    //const thingObject = req.file ?
        //{
            //...JSON.parse(req.body.thing),
            //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        //} : {...req.body};
    //Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        //.then(() => res.status(200).json({ message: 'Objet modifié !'}))
        //.catch(error => res.status(400).json({ error }));
//};


exports.remove = (req, res) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(()=> res.status(200).json({message:"Sauce supprimée "}))
        .catch(error => res.status(400).json({ error }));
};
