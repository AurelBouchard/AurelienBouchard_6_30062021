const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "random_token_secret");
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid ID";
        } else {
            next();
        }

    } catch (error) {
        res.status(401).json({error: error | "Requête non authentifiée !"});
        console.log("bug auth :");
        console.log(error);
    }
};