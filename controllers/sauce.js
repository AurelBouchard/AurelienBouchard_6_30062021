const Sauce = require('../models/Sauce');
const ObjectId = require('mongoose').Types.ObjectId; // help @ 44:30


//exports.createThing = (req, res, next) => {
    //const thingObject = JSON.parse(req.body.thing);
    //delete req.body._id;
    //const thing = new Thing({
        //...thingObject,
        //imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    //});

    //thing.save()
        //.then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        //.catch(error => res.status(400).json({ error }));
//};


//exports.getAllStuff = (req, res, next) => {
    //Thing.find()
        //.then(things => res.status(200).json(things))
        //.catch(error => res.status(400).json({ error }));
//};


//exports.findStuff = (req, res, next) => {
    //Thing.findOne({ _id: req.params.id })
        //.then(thing => res.status(200).json(thing))
        //.catch(error => res.status(404).json({ error }));
//};


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


//exports.removeStuff = (req, res, next) => {
    //Thing.deleteOne({_id: req.params.id})
        //.then(()=> res.status(200).json({message:"objet supprimé"}))
        //.catch(error => res.status(400).json({ error }));
//};
