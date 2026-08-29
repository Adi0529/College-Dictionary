const College = require("../models/College");


// ===============================
// CREATE COLLEGE
// ===============================

const createCollege = async (req, res) => {

    try {

        const {
            name,
            location,
            city,
            state,
            description,
            fees,
            rating,
            courses,
            averagePackage,
            highestPackage,
            placementPercentage
        } = req.body;


        if (
            !name ||
            !location ||
            !city ||
            !state ||
            !description ||
            !fees
        ) {

            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });

        }


        if (!req.files || !req.files.thumbnail) {

            return res.status(400).json({
                success: false,
                message: "College thumbnail is required"
            });

        }


        const thumbnail =
            req.files.thumbnail[0].path;


        let images = [];


        if (req.files.images) {

            images = req.files.images.map(
                (file) => file.path
            );

        }


        let courseList = [];

        if (courses) {

            try {

                courseList = JSON.parse(courses);

            } catch (error) {

                courseList = courses
                    .split(",")
                    .map(course => course.trim());

            }

        }


        const college = await College.create({

            name,
            location,
            city,
            state,
            description,
            fees,
            rating: rating || 0,

            thumbnail,

            images,

            courses: courseList,

            placement: {

                averagePackage:
                    averagePackage || 0,

                highestPackage:
                    highestPackage || 0,

                placementPercentage:
                    placementPercentage || 0

            }

        });


        res.status(201).json({

            success: true,

            message: "College created successfully",

            college

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// GET ALL COLLEGES
// ===============================

const getAllColleges = async (req, res) => {

    try {

        const {
            search,
            city,
            state,
            minFees,
            maxFees,
            minRating,
            sort,
            page = 1,
            limit = 10
        } = req.query;


        let filter = {};


        // SEARCH

        if (search) {

            filter.$or = [

                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    location: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    city: {
                        $regex: search,
                        $options: "i"
                    }
                },

                {
                    state: {
                        $regex: search,
                        $options: "i"
                    }
                }

            ];

        }


        // CITY FILTER

        if (city) {

            filter.city = {
                $regex: city,
                $options: "i"
            };

        }


        // STATE FILTER

        if (state) {

            filter.state = {
                $regex: state,
                $options: "i"
            };

        }


        // FEES FILTER

        if (minFees || maxFees) {

            filter.fees = {};

            if (minFees) {

                filter.fees.$gte =
                    Number(minFees);

            }

            if (maxFees) {

                filter.fees.$lte =
                    Number(maxFees);

            }

        }


        // RATING FILTER

        if (minRating) {

            filter.rating = {
                $gte: Number(minRating)
            };

        }


        // PAGINATION

        const pageNumber = Number(page);

        const limitNumber = Number(limit);

        const skip =
            (pageNumber - 1) * limitNumber;


        // SORT

        let sortOption = {
            createdAt: -1
        };


        if (sort === "rating") {

            sortOption = {
                rating: -1
            };

        }

        else if (sort === "feesLow") {

            sortOption = {
                fees: 1
            };

        }

        else if (sort === "feesHigh") {

            sortOption = {
                fees: -1
            };

        }

        else if (sort === "name") {

            sortOption = {
                name: 1
            };

        }


        const colleges =
            await College.find(filter)
                .sort(sortOption)
                .skip(skip)
                .limit(limitNumber);


        const total =
            await College.countDocuments(filter);


        res.status(200).json({

            success: true,

            total,

            currentPage: pageNumber,

            totalPages:
                Math.ceil(total / limitNumber),

            colleges

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// GET COLLEGE BY ID
// ===============================

const getCollegeById = async (req, res) => {

    try {

        const { id } = req.params;


        const college =
            await College.findById(id);


        if (!college) {

            return res.status(404).json({

                success: false,

                message: "College not found"

            });

        }


        res.status(200).json({

            success: true,

            college

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// UPDATE COLLEGE
// ===============================

const updateCollege = async (req, res) => {

    try {

        const { id } = req.params;


        const college =
            await College.findById(id);


        if (!college) {

            return res.status(404).json({

                success: false,

                message: "College not found"

            });

        }


        const {
            name,
            location,
            city,
            state,
            description,
            fees,
            rating,
            courses,
            averagePackage,
            highestPackage,
            placementPercentage
        } = req.body;


        if (name) {
            college.name = name;
        }

        if (location) {
            college.location = location;
        }

        if (city) {
            college.city = city;
        }

        if (state) {
            college.state = state;
        }

        if (description) {
            college.description = description;
        }

        if (fees) {
            college.fees = fees;
        }

        if (rating) {
            college.rating = rating;
        }


        if (courses) {

            try {

                college.courses =
                    JSON.parse(courses);

            }

            catch (error) {

                college.courses =
                    courses
                        .split(",")
                        .map(course =>
                            course.trim()
                        );

            }

        }


        if (averagePackage) {

            college.placement.averagePackage =
                averagePackage;

        }


        if (highestPackage) {

            college.placement.highestPackage =
                highestPackage;

        }


        if (placementPercentage) {

            college.placement.placementPercentage =
                placementPercentage;

        }


        // UPDATE THUMBNAIL

        if (
            req.files &&
            req.files.thumbnail
        ) {

            college.thumbnail =
                req.files.thumbnail[0].path;

        }


        // ADD NEW IMAGES

        if (
            req.files &&
            req.files.images
        ) {

            const newImages =
                req.files.images.map(
                    file => file.path
                );


            college.images.push(
                ...newImages
            );

        }


        await college.save();


        res.status(200).json({

            success: true,

            message: "College updated successfully",

            college

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// DELETE COLLEGE
// ===============================

const deleteCollege = async (req, res) => {

    try {

        const { id } = req.params;


        const college =
            await College.findById(id);


        if (!college) {

            return res.status(404).json({

                success: false,

                message: "College not found"

            });

        }


        await College.findByIdAndDelete(id);


        res.status(200).json({

            success: true,

            message: "College deleted successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ===============================
// COMPARE COLLEGES
// ===============================

const compareColleges = async (req, res) => {

    try {

        const { ids } = req.query;


        if (!ids) {

            return res.status(400).json({

                success: false,

                message: "College IDs are required"

            });

        }


        const collegeIds =
            ids.split(",");


        if (
            collegeIds.length < 2 ||
            collegeIds.length > 3
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "You can compare 2 or 3 colleges only"

            });

        }


        const colleges =
            await College.find({

                _id: {
                    $in: collegeIds
                }

            });


        if (colleges.length !== collegeIds.length) {

            return res.status(404).json({

                success: false,

                message:
                    "One or more colleges not found"

            });

        }


        res.status(200).json({

            success: true,

            colleges

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

    createCollege,

    getAllColleges,

    getCollegeById,

    updateCollege,

    deleteCollege,

    compareColleges

};