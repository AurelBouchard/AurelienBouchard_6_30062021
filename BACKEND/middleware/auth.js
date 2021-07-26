const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "Quelleestlacouleurduchevalblancd'Henri4?");
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid ID";
        } else {
            next();
        }

    } catch (error) {
        console.log("Authentication error :");
        console.log(error);
        res.status(403).json({error: error | "Requête non authentifiée !"});
    }
};