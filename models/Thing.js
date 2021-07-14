const mongoose = require("mongoose");

//const thingSchema = mongoose.Schema({
    //// _id will be automatically added by mongoose
    //title:      { type: String, required: true },
    //description: { type: String, required: true },
    //imageUrl:   { type: String, required: true },
    //userId:     { type: String, required: true },
    //price:      { type: Number, required: true }
//});

// CREATE SCHEMA UPON SO PECOCKO GUIDE LINES

module.exports = mongoose.model("Thing", thingSchema);
