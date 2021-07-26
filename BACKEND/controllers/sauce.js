const Sauce = require('../models/Sauce');


exports.create = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete req.body._id;    // will be replaced by the mongodb one
    let sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });

    sauce.save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée !"}))
        .catch(error => res.status(400).json({ error }));
};


exports.like = (req, res) => {
    const opinion = req.body.like;  // 1 = like, 0 = unquote, -1 = dislike
    switch(opinion) {
        case 1:     // sauce is liked
            Sauce.updateOne({ _id: req.params.id },
                {
                    // increment N of likers
                    $inc: { likes: 1},

                    // add userId in list of likers
                    $push: { usersLiked: req.body.userId}
                })
                .then( res.status(200).json({message: "sauce liked"}) )
                .catch(error => res.status(404).json({ error }));
            break;

        case 0:     // sauce is not liked or disliked
            Sauce.findOne({ _id: req.params.id })
                .then( sauce =>
                    {   // check if sauce were liked or disliked
                        try {   // if sauce were liked
                            if(sauce.usersLiked.includes(req.body.userId)) {
                                sauce.updateOne(
                                    // decrement N of likers then remove userId in list of likers
                                    { $inc: { likes: -1}, $pull: { usersLiked: req.body.userId} })
                                    .then( res.status(200).json({message: "sauce is not liked anymore"}) )
                                    .catch(error => res.status(404).json({ error }));
                            }
                        } catch (err) {console.log(err | "this sauce is not liked")}

                        try {  // if sauce were disliked
                            if(sauce.usersDisliked.includes(req.body.userId)) {
                                sauce.updateOne(
                                    // decrement N of dislikers then remove userId in list of dislikers
                                    { $inc: { dislikes: -1}, $pull: { usersDisliked: req.body.userId} })
                                    .then( res.status(200).json({message: "sauce is not disliked anymore"}) )
                                    .catch(error => res.status(404).json({ error }));
                            }
                        } catch (err) {console.log(err | "this sauce is not disliked")}
                    }
                )
                .catch(error => res.status(404).json({ error }));
            break;

        case -1:    // sauce is disliked
            Sauce.updateOne({ _id: req.params.id },
                {
                    // increment N of dislikers
                    $inc: { dislikes: 1},

                    // add userId in list of dislikers
                    $push: { usersDisliked: req.body.userId}
                })
                .then( res.status(200).json({message: "sauce disliked"}) )
                .catch(error => res.status(404).json({ error }));
            break;
    }

};


exports.getAll = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};


exports.findById = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};


exports.modify = (req, res) => {
    const updatedSauce = req.file ?
        {...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : {...req.body};

    Sauce.updateOne({ _id: req.params.id }, { ...updatedSauce, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce modifiée !"}))
        .catch(error => res.status(400).json({ error }));
};


exports.remove = (req, res) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(()=> res.status(200).json({message:"Sauce supprimée "}))
        .catch(error => res.status(400).json({ error }));
};
