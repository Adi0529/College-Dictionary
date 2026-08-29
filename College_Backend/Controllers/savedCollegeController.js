const SavedCollege = require("../models/SavedCollege");
const College = require("../models/College");


// =====================================
// SAVE COLLEGE
// =====================================

const saveCollege = async (req, res) => {

    try {

        const { collegeId } = req.params;


        // Check college

        const college =
            await College.findById(collegeId);


        if (!college) {

            return res.status(404).json({

                success: false,

                message: "College not found"

            });

        }


        // Check already saved

        const existingSavedCollege =
            await SavedCollege.findOne({

                user: req.user.id,

                college: collegeId

            });


        if (existingSavedCollege) {

            return res.status(400).json({

                success: false,

                message: "College already saved"

            });

        }


        const savedCollege =
            await SavedCollege.create({

                user: req.user.id,

                college: collegeId

            });


        res.status(201).json({

            success: true,

            message: "College saved successfully",

            savedCollege

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================
// GET SAVED COLLEGES
// =====================================

const getSavedColleges = async (req, res) => {

    try {

        const savedColleges =
            await SavedCollege.find({

                user: req.user.id

            })
            .populate("college")
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            total: savedColleges.length,

            savedColleges

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================
// REMOVE SAVED COLLEGE
// =====================================

const removeSavedCollege = async (req, res) => {

    try {

        const { collegeId } = req.params;


        const savedCollege =
            await SavedCollege.findOne({

                user: req.user.id,

                college: collegeId

            });


        if (!savedCollege) {

            return res.status(404).json({

                success: false,

                message: "College is not saved"

            });

        }


        await SavedCollege.findByIdAndDelete(
            savedCollege._id
        );


        res.status(200).json({

            success: true,

            message: "College removed from saved colleges"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =====================================
// CHECK SAVED COLLEGE
// =====================================

const checkSavedCollege = async (req, res) => {

    try {

        const { collegeId } = req.params;


        const savedCollege =
            await SavedCollege.findOne({

                user: req.user.id,

                college: collegeId

            });


        res.status(200).json({

            success: true,

            saved: savedCollege
                ? true
                : false

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {

    saveCollege,

    getSavedColleges,

    removeSavedCollege,

    checkSavedCollege

};