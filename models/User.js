const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},   // should be hashed
    password: { type: String, required: true}              // must be Bcrypted
    //created:{type: String, default: Date.now.toDateString}  // not needed
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
