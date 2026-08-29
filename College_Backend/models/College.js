const mongoose = require("mongoose");


const collegeSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        fees: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },

        thumbnail: {
            type: String,
            required: true
        },

        images: [
            {
                type: String
            }
        ],

        courses: [
            {
                type: String
            }
        ],

        placement: {

            averagePackage: {
                type: Number,
                default: 0
            },

            highestPackage: {
                type: Number,
                default: 0
            },

            placementPercentage: {
                type: Number,
                default: 0
            }

        }

    },

    {
        timestamps: true
    }

);


module.exports = mongoose.model("College", collegeSchema);