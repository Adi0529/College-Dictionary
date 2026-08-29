const SavedComparison =
    require("../models/SavedComparison");

const College =
    require("../models/College");


// =====================================
// SAVE COMPARISON
// =====================================

const saveComparison = async (req, res) => {

    try {

        const { ids } = req.body;


        if (!ids || !Array.isArray(ids)) {

            return res.status(400).json({

                success: false,

                message: "College IDs are required"

            });

        }


        if (ids.length < 2 || ids.length > 3) {

            return res.status(400).json({

                success: false,

                message:
                    "You can save comparison of 2 or 3 colleges only"

            });

        }


        // Check colleges exist

        const colleges =
            await College.find({

                _id: {
                    $in: ids
                }

            });


        if (colleges.length !== ids.length) {

            return res.status(404).json({

                success: false,

                message:
                    "One or more colleges not found"

            });

        }


        // Check duplicate comparison

        const existingComparison =
            await SavedComparison.findOne({

                user: req.user.id,

                colleges: {
                    $all: ids
                }

            });


        if (existingComparison) {

            return res.status(400).json({

                success: false,

                message:
                    "This comparison is already saved"

            });

        }


        const comparison =
            await SavedComparison.create({

                user: req.user.id,

                colleges: ids

            });


        const savedComparison =
            await SavedComparison.findById(
                comparison._id
            )
            .populate("colleges");


        res.status(201).json({

            success: true,

            message:
                "Comparison saved successfully",

            comparison: savedComparison

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
// GET SAVED COMPARISONS
// =====================================

const getSavedComparisons = async (req, res) => {

    try {

        const comparisons =
            await SavedComparison.find({

                user: req.user.id

            })
            .populate("colleges")
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            total: comparisons.length,

            comparisons

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
// GET SINGLE SAVED COMPARISON
// =====================================

const getSavedComparison = async (req, res) => {

    try {

        const { id } = req.params;


        const comparison =
            await SavedComparison.findOne({

                _id: id,

                user: req.user.id

            })
            .populate("colleges");


        if (!comparison) {

            return res.status(404).json({

                success: false,

                message:
                    "Saved comparison not found"

            });

        }


        res.status(200).json({

            success: true,

            comparison

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
// DELETE SAVED COMPARISON
// =====================================

const deleteSavedComparison = async (req, res) => {

    try {

        const { id } = req.params;


        const comparison =
            await SavedComparison.findOne({

                _id: id,

                user: req.user.id

            });


        if (!comparison) {

            return res.status(404).json({

                success: false,

                message:
                    "Saved comparison not found"

            });

        }


        await SavedComparison.findByIdAndDelete(id);


        res.status(200).json({

            success: true,

            message:
                "Saved comparison deleted successfully"

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

    saveComparison,

    getSavedComparisons,

    getSavedComparison,

    deleteSavedComparison

};