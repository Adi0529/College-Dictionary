const Review = require("../models/Review");
const College = require("../models/College");


// =====================================
// ADD REVIEW
// =====================================

const addReview = async (req, res) => {

    try {

        const { collegeId } = req.params;

        const { rating, comment } = req.body;


        if (!rating || !comment) {

            return res.status(400).json({

                success: false,

                message: "Rating and comment are required"

            });

        }


        if (rating < 1 || rating > 5) {

            return res.status(400).json({

                success: false,

                message: "Rating must be between 1 and 5"

            });

        }


        const college =
            await College.findById(collegeId);


        if (!college) {

            return res.status(404).json({

                success: false,

                message: "College not found"

            });

        }


        // Check if user already reviewed

        const existingReview =
            await Review.findOne({

                college: collegeId,

                user: req.user.id

            });


        if (existingReview) {

            return res.status(400).json({

                success: false,

                message: "You have already reviewed this college"

            });

        }


        const review =
            await Review.create({

                college: collegeId,

                user: req.user.id,

                rating,

                comment

            });


        await updateCollegeRating(collegeId);


        const populatedReview =
            await Review.findById(review._id)
                .populate("user", "name profileImage");


        res.status(201).json({

            success: true,

            message: "Review added successfully",

            review: populatedReview

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
// GET COLLEGE REVIEWS
// =====================================

const getCollegeReviews = async (req, res) => {

    try {

        const { collegeId } = req.params;


        const college =
            await College.findById(collegeId);


        if (!college) {

            return res.status(404).json({

                success: false,

                message: "College not found"

            });

        }


        const reviews =
            await Review.find({
                college: collegeId
            })
            .populate(
                "user",
                "name profileImage"
            )
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            total: reviews.length,

            reviews

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
// UPDATE REVIEW
// =====================================

const updateReview = async (req, res) => {

    try {

        const { id } = req.params;

        const { rating, comment } = req.body;


        const review =
            await Review.findById(id);


        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found"

            });

        }


        // Only review owner can update

        if (
            review.user.toString() !==
            req.user.id
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can update only your own review"

            });

        }


        if (rating) {

            if (rating < 1 || rating > 5) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Rating must be between 1 and 5"

                });

            }

            review.rating = rating;

        }


        if (comment) {

            review.comment = comment;

        }


        await review.save();


        await updateCollegeRating(
            review.college
        );


        const updatedReview =
            await Review.findById(id)
                .populate(
                    "user",
                    "name profileImage"
                );


        res.status(200).json({

            success: true,

            message: "Review updated successfully",

            review: updatedReview

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
// DELETE REVIEW
// =====================================

const deleteReview = async (req, res) => {

    try {

        const { id } = req.params;


        const review =
            await Review.findById(id);


        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found"

            });

        }


        // User can delete own review
        // Admin can delete any review

        if (
            review.user.toString() !==
            req.user.id &&
            req.user.role !== "Admin"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "You can delete only your own review"

            });

        }


        const collegeId =
            review.college;


        await Review.findByIdAndDelete(id);


        await updateCollegeRating(collegeId);


        res.status(200).json({

            success: true,

            message: "Review deleted successfully"

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
// UPDATE COLLEGE AVERAGE RATING
// =====================================

const updateCollegeRating = async (collegeId) => {

    const reviews =
        await Review.find({
            college: collegeId
        });


    if (reviews.length === 0) {

        await College.findByIdAndUpdate(
            collegeId,
            {
                rating: 0
            }
        );

        return;

    }


    let totalRating = 0;


    reviews.forEach((review) => {

        totalRating += review.rating;

    });


    const averageRating =
        totalRating / reviews.length;


    const roundedRating =
        Number(averageRating.toFixed(1));


    await College.findByIdAndUpdate(

        collegeId,

        {
            rating: roundedRating
        }

    );

};


module.exports = {

    addReview,

    getCollegeReviews,

    updateReview,

    deleteReview

};