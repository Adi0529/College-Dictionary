const express = require("express");

const router = express.Router();

const savedCollegeController =require("../Controllers/savedCollegeController");

const { auth } =require("../middleware/auth");


// =====================================
// SAVE COLLEGE
// =====================================

router.post("/add/:collegeId",auth,savedCollegeController.saveCollege);


// =====================================
// GET SAVED COLLEGES
// =====================================

router.get("/get",auth,savedCollegeController.getSavedColleges);


// =====================================
// REMOVE SAVED COLLEGE
// =====================================

router.delete(
    "/remove/:collegeId",
    auth,
    savedCollegeController.removeSavedCollege
);


// =====================================
// CHECK SAVED COLLEGE
// =====================================

router.get(
    "/check/:collegeId",
    auth,
    savedCollegeController.checkSavedCollege
);


module.exports = router;