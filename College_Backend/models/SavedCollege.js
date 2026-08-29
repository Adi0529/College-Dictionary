const mongoose = require("mongoose");


const savedCollegeSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "College",
            required: true
        }

    },

    {
        timestamps: true
    }
);


// One user cannot save the same college twice

savedCollegeSchema.index(
    {
        user: 1,
        college: 1
    },
    {
        unique: true
    }
);


module.exports = mongoose.model(
    "SavedCollege",
    savedCollegeSchema
);