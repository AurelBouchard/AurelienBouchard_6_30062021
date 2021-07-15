const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
    // _id will be automatically added by mongoose
    userId: {type: String, required: true},         // sauce creator unique userId given by mongodb when first signup
    name: {type: String, required: true, unique: true},   // sauce name
    manufacturer: {type: String, required: true},   // sauce manufacturer
    description: {type: String, required: true},    // sauce description, no joke
    mainPepper: {type: String, required: true},     // main ingredient
    imageUrl: {type: String},                       // image file path
    heat: {type: Number,  required: true},          // how hot is the sauce 1: baby friendly, 10: spaceX ready
    likes: {type: Number},                          // how many people like this sauce
    dislikes: {type: Number},                       // how many people don't
    usersLiked: [Number],                           // array of userId of whom who like the sauce
    usersDisliked: [Number]                         // array of userId of whom who dont
});

module.exports = mongoose.model("Sauce", sauceSchema);
