const mongoose = require("mongoose");


const savedComparisonSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        colleges: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "College",
                required: true
            }
        ]

    },

    {
        timestamps: true
    }
);


module.exports = mongoose.model(
    "SavedComparison",
    savedComparisonSchema
);