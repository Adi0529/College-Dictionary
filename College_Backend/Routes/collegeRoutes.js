const express = require("express");

const router = express.Router();

const collegeController =
    require("../Controllers/collegeController");

const {
    auth,
    admin
} = require("../middleware/auth");

const upload =
    require("../middleware/uploads");


// =====================================
// ADMIN ROUTES
// =====================================


// CREATE COLLEGE

router.post(
    "/create",
    auth,
    admin,
    upload.fields([
        {
            name: "thumbnail",
            maxCount: 1
        },
        {
            name: "images",
            maxCount: 10
        }
    ]),
    collegeController.createCollege
);


// UPDATE COLLEGE

router.put(
    "/update/:id",
    auth,
    admin,
    upload.fields([
        {
            name: "thumbnail",
            maxCount: 1
        },
        {
            name: "images",
            maxCount: 10
        }
    ]),
    collegeController.updateCollege
);


// DELETE COLLEGE

router.delete("/delete/:id",auth,admin,collegeController.deleteCollege);


// =====================================
// PUBLIC ROUTES
// =====================================


// GET ALL COLLEGES

router.get("/getall",collegeController.getAllColleges);


// GET COLLEGE BY ID

router.get("/get/:id",collegeController.getCollegeById);


// COMPARE COLLEGES

router.get("/compare",collegeController.compareColleges);


module.exports = router;