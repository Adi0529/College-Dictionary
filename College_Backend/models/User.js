const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        mobile: {
            type: String,
            required: true,
            match: /^[0-9]{10}$/,
        },

        profileImage: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["Admin", "User"],
            default: "User",
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);