const express = require('express');
const router = express.Router();
const userController=require("../Controllers/userController")
const {auth,admin}=require('../middleware/auth')

const uploadImage = require("../middleware/uploads");

// Public Routes
router.post("/register", uploadImage.single("profileImage"), userController.register);
router.post("/", userController.login);

// User Routes
router.get("/profile", auth, userController.getProfile);
router.put("/update", auth, uploadImage.single("profileImage"), userController.updateProfile);
router.put("/change-password", auth, userController.changePassword);

// Admin Routes
router.get("/", auth, admin, userController.getAllUsers);
router.delete("/:id", auth, admin, userController.deleteUser);

module.exports = router;