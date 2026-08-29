const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
    try {

        const { name, email, password, mobile } = req.body;

        if (!name || !email || !password || !mobile) {
            return res.status(400).json({success: false,message: "All fields are required"});
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({success: false,message: "Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({name,email,
            password: hashedPassword,
            mobile,
            profileImage: req.file ? req.file.path : ""
        });

        res.status(201).json({success: true,message: "Registration Successful",user});

    } catch (error) {
        res.status(500).json({success: false,message: error.message});

    }
};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({success: false,message: "Email and Password are required"});
        }
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({success: false,message: "User not found"});
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({success: false,message: "Invalid Password"});

        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).json({success: true,user});
    } catch (error) {
        res.status(500).json({success: false,message: error.message});
    }
};
const updateProfile = async (req, res) => {

    try {
        const { name, email, mobile } = req.body;
        const updateData = {name,email,mobile};
        if (req.file) {
            updateData.profileImage = req.file.path;
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            updateData,
            {
                new: true
            }
        ).select("-password");

        res.status(200).json({ success: true,message: "Profile Updated",user});

    } catch (error) {
        res.status(500).json({success: false,message: error.message});
    }
};
const changePassword = async (req, res) => {

    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            return res.status(400).json({success: false,message: "Old Password Incorrect"});
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({success: true,message: "Password Changed Successfully"});

    } catch (error) {
        res.status(500).json({success: false,message: error.message});
    }

};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({success: true,users:users});
    } catch (error) {
        res.status(500).json({success: false,message: error.message});
    }
};
const deleteUser = async (req, res) => {
    try {

        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }


        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "User and all enrollments deleted successfully"
        });

    } catch (error) {
        res.status(500).json({success: false,message: error.message});
    }
};
module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    deleteUser
};