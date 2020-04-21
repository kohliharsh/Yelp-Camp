const mongoose = require("mongoose");


const yelpSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    comment: [String],
    description:String
});

module.exports = new mongoose.model("camps",yelpSchema);