const express = require("express");

const router = express.Router();

const reviewController =require("../Controllers/reviewController");

const { auth } =require("../middleware/auth");


// =====================================
// ADD REVIEW
// =====================================

router.post("/add/:collegeId",auth,reviewController.addReview);


// =====================================
// GET COLLEGE REVIEWS
// =====================================

router.get("/college/:collegeId",reviewController.getCollegeReviews);


// =====================================
// UPDATE REVIEW
// =====================================

router.put("/update/:id",auth,reviewController.updateReview);


// =====================================
// DELETE REVIEW
// =====================================

router.delete("/delete/:id",auth,reviewController.deleteReview);


module.exports = router;