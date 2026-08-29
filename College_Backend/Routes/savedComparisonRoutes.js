const express = require("express");

const router = express.Router();


const savedComparisonController =
    require("../Controllers/savedComparisonController");


const { auth } =
    require("../middleware/auth");


// =====================================
// SAVE COMPARISON
// =====================================

router.post(
    "/add",
    auth,
    savedComparisonController.saveComparison
);


// =====================================
// GET ALL SAVED COMPARISONS
// =====================================

router.get(
    "/get",
    auth,
    savedComparisonController.getSavedComparisons
);


// =====================================
// GET SINGLE SAVED COMPARISON
// =====================================

router.get(
    "/get/:id",
    auth,
    savedComparisonController.getSavedComparison
);


// =====================================
// DELETE SAVED COMPARISON
// =====================================

router.delete(
    "/delete/:id",
    auth,
    savedComparisonController.deleteSavedComparison
);


module.exports = router;