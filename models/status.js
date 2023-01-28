const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true,
        unique: true
    },
    status : [{datePosted: String, media: String}]
});

module.exports = mongoose.model("Status", statusSchema);

/*
    statuses : {
        media,
        datePosted
    }
*/