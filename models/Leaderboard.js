const mongoose = require("mongoose");

const cumulativeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regNumber: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
},{ timestamps: true });

const Cumulative = mongoose.model("Cumulative", cumulativeSchema);

module.exports = Cumulative;