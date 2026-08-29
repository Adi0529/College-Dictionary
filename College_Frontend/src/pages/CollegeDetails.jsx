
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FaArrowLeft,
    FaHeart,
    FaRegHeart,
    FaMapMarkerAlt,
    FaStar,
    FaGlobe,
    FaGraduationCap,
    FaRupeeSign,
    FaBriefcase,
    FaUniversity,
    FaChevronLeft,
    FaChevronRight,
    FaImages
} from "react-icons/fa";

import {
    getCollege,
    clearCollege
} from "../redux/collegeSlice";


// =====================================
// BACKEND URL
// =====================================

const SERVER_URL = "http://localhost:5000";


// =====================================
// IMAGE URL HELPER
// =====================================

const getImageUrl = (imagePath) => {

    if (!imagePath) {
        return "";
    }

    // Convert Windows path:
    // uploads\colleges\image.jpg
    //
    // into:
    // uploads/colleges/image.jpg

    const cleanPath =
        String(imagePath)
            .replace(/\\/g, "/")
            .replace(/^\/+/, "");

    // If backend already returned a complete URL
    if (
        cleanPath.startsWith("http://") ||
        cleanPath.startsWith("https://")
    ) {
        return cleanPath;
    }

    return `${SERVER_URL}/${cleanPath}`;

};


const CollegeDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();


    // =====================================
    // REDUX
    // =====================================

    const {
        college,
        loading,
        error
    } = useSelector(
        state => state.college
    );


    // =====================================
    // LOCAL STATE
    // =====================================

    const [selectedImage, setSelectedImage] =
        useState("");

    const [currentImageIndex, setCurrentImageIndex] =
        useState(0);

    const [isSaved, setIsSaved] =
        useState(false);


    // =====================================
    // FETCH COLLEGE
    // =====================================

    useEffect(() => {

        if (id) {

            dispatch(
                getCollege(id)
            );

        }


        return () => {

            dispatch(
                clearCollege()
            );

        };

    }, [dispatch, id]);


    // =====================================
    // PREPARE IMAGES
    // =====================================

    const getCollegeImages = () => {

        if (!college) {
            return [];
        }


        const allImages = [];


        // =================================
        // THUMBNAIL
        // =================================

        if (college.thumbnail) {

            allImages.push(
                college.thumbnail
            );

        }


        // =================================
        // ADDITIONAL IMAGES
        // =================================

        if (
            Array.isArray(
                college.images
            )
        ) {

            college.images.forEach(
                image => {

                    if (
                        image &&
                        !allImages.includes(image)
                    ) {

                        allImages.push(image);

                    }

                }
            );

        }


        return allImages;

    };


    const collegeImages =
        getCollegeImages();


    // =====================================
    // SET INITIAL IMAGE
    // =====================================

    useEffect(() => {

        if (
            collegeImages.length > 0
        ) {

            setSelectedImage(
                collegeImages[0]
            );

            setCurrentImageIndex(0);

        } else {

            setSelectedImage("");

        }

    }, [
        college?._id,
        collegeImages.length
    ]);


    // =====================================
    // SELECT IMAGE
    // =====================================

    const handleImageSelect = (
        image,
        index
    ) => {

        setSelectedImage(image);

        setCurrentImageIndex(index);

    };


    // =====================================
    // PREVIOUS IMAGE
    // =====================================

    const handlePrevious = () => {

        if (
            collegeImages.length === 0
        ) {
            return;
        }


        const newIndex =
            currentImageIndex === 0
                ? collegeImages.length - 1
                : currentImageIndex - 1;


        setCurrentImageIndex(
            newIndex
        );


        setSelectedImage(
            collegeImages[newIndex]
        );

    };


    // =====================================
    // NEXT IMAGE
    // =====================================

    const handleNext = () => {

        if (
            collegeImages.length === 0
        ) {
            return;
        }


        const newIndex =
            currentImageIndex ===
            collegeImages.length - 1
                ? 0
                : currentImageIndex + 1;


        setCurrentImageIndex(
            newIndex
        );


        setSelectedImage(
            collegeImages[newIndex]
        );

    };


    // =====================================
    // SAVE COLLEGE
    // =====================================

    const handleSave = () => {

        setIsSaved(
            prev => !prev
        );

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div
                className="container py-5 text-center"
            >

                <div
                    className="spinner-border text-primary"
                    style={{
                        width: "3rem",
                        height: "3rem"
                    }}
                />

                <p className="text-muted mt-3">

                    Loading college details...

                </p>

            </div>

        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error) {

        return (

            <div
                className="container py-5"
            >

                <div className="alert alert-danger">

                    {error}

                </div>


                <Link
                    to="/colleges"
                    className="btn btn-primary"
                >

                    <FaArrowLeft className="me-2" />

                    Back to Colleges

                </Link>

            </div>

        );

    }


    // =====================================
    // COLLEGE NOT FOUND
    // =====================================

    if (!college) {

        return (

            <div
                className="container py-5 text-center"
            >

                <FaUniversity
                    size={60}
                    className="text-muted mb-3"
                />

                <h4 className="fw-bold">

                    College Not Found

                </h4>

                <p className="text-muted">

                    The college you are looking for does not exist.

                </p>


                <Link
                    to="/colleges"
                    className="btn btn-primary"
                >

                    <FaArrowLeft className="me-2" />

                    Back to Colleges

                </Link>

            </div>

        );

    }


    // =====================================
    // DATA
    // =====================================

    const courses =
        Array.isArray(
            college.courses
        )
            ? college.courses
            : college.courses
                ? String(
                    college.courses
                )
                    .split(",")
                    .map(
                        item =>
                            item.trim()
                    )
                    .filter(
                        item =>
                            item !== ""
                    )
                : [];


    const averagePackage =
        college.placement
            ?.averagePackage || 0;


    const highestPackage =
        college.placement
            ?.highestPackage || 0;


    const placementPercentage =
        college.placement
            ?.placementPercentage || 0;


    return (

        <div
            className="bg-light min-vh-100"
        >

            <div
                className="container py-4"
            >


                {/* =================================
                    BACK BUTTON
                ================================= */}

                <div className="mb-4">

                    <Link
                        to="/colleges"
                        className="btn btn-outline-primary"
                    >

                        <FaArrowLeft
                            className="me-2"
                        />

                        Back to Colleges

                    </Link>

                </div>


                {/* =================================
                    MAIN COLLEGE CARD
                ================================= */}

                <div
                    className="card border-0 shadow-sm overflow-hidden mb-4"
                >

                    <div className="row g-0">


                        {/* =================================
                            IMAGE SECTION
                        ================================= */}

                        <div
                            className="col-lg-5"
                        >

                            <div
                                className="position-relative bg-dark"
                                style={{
                                    minHeight: "420px"
                                }}
                            >

                                {selectedImage ? (

                                    <img
                                        src={
                                            getImageUrl(
                                                selectedImage
                                            )
                                        }
                                        alt={
                                            college.name
                                        }
                                        className="w-100 h-100"
                                        style={{
                                            objectFit: "cover",
                                            minHeight: "420px"
                                        }}
                                        onError={(e) => {

                                            e.currentTarget.onerror =
                                                null;

                                            e.currentTarget.src =
                                                "";

                                            e.currentTarget.style.display =
                                                "none";

                                        }}
                                    />

                                ) : (

                                    <div
                                        className="d-flex flex-column align-items-center justify-content-center text-white"
                                        style={{
                                            minHeight: "420px"
                                        }}
                                    >

                                        <FaGraduationCap
                                            size={80}
                                            className="mb-3"
                                        />

                                        <h5>
                                            No Image Available
                                        </h5>

                                    </div>

                                )}


                                {/* =================================
                                    IMAGE NAVIGATION
                                ================================= */}

                                {collegeImages.length > 1 && (

                                    <>

                                        <button
                                            type="button"
                                            className="btn btn-light position-absolute top-50 start-0 translate-middle-y ms-3 rounded-circle shadow"
                                            onClick={
                                                handlePrevious
                                            }
                                            style={{
                                                width: "42px",
                                                height: "42px"
                                            }}
                                        >

                                            <FaChevronLeft />

                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-light position-absolute top-50 end-0 translate-middle-y me-3 rounded-circle shadow"
                                            onClick={
                                                handleNext
                                            }
                                            style={{
                                                width: "42px",
                                                height: "42px"
                                            }}
                                        >

                                            <FaChevronRight />

                                        </button>


                                        <div
                                            className="position-absolute bottom-0 start-50 translate-middle-x mb-3"
                                        >

                                            <span
                                                className="badge bg-dark bg-opacity-75 px-3 py-2"
                                            >

                                                {currentImageIndex + 1}
                                                {" / "}
                                                {collegeImages.length}

                                            </span>

                                        </div>

                                    </>

                                )}

                            </div>

                        </div>


                        {/* =================================
                            COLLEGE INFORMATION
                        ================================= */}

                        <div
                            className="col-lg-7"
                        >

                            <div
                                className="card-body p-4 p-lg-5"
                            >


                                {/* TITLE */}

                                <div
                                    className="d-flex justify-content-between align-items-start gap-3 mb-3"
                                >

                                    <div>

                                        <h1
                                            className="fw-bold mb-2"
                                        >

                                            {
                                                college.name
                                            }

                                        </h1>


                                        <div
                                            className="text-muted"
                                        >

                                            <FaMapMarkerAlt
                                                className="text-danger me-2"
                                            />

                                            {
                                                college.location ||
                                                college.city ||
                                                "Location not available"
                                            }

                                        </div>

                                    </div>


                                    {/* SAVE */}

                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={
                                            handleSave
                                        }
                                    >

                                        {isSaved ? (

                                            <FaHeart />

                                        ) : (

                                            <FaRegHeart />

                                        )}

                                    </button>

                                </div>


                                {/* RATING */}

                                <div
                                    className="mb-4"
                                >

                                    <span
                                        className="badge bg-warning text-dark fs-6 px-3 py-2"
                                    >

                                        <FaStar
                                            className="me-1"
                                        />

                                        {
                                            college.rating ||
                                            0
                                        }

                                    </span>

                                </div>


                                {/* DESCRIPTION */}

                                <p
                                    className="text-muted"
                                    style={{
                                        lineHeight: "1.8"
                                    }}
                                >

                                    {
                                        college.description ||
                                        "No description available."
                                    }

                                </p>


                                {/* WEBSITE */}

                                {college.website && (

                                    <a
                                        href={
                                            college.website
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-outline-primary mt-2"
                                    >

                                        <FaGlobe
                                            className="me-2"
                                        />

                                        Visit Website

                                    </a>

                                )}

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================
                    IMAGE GALLERY
                ================================= */}

                {collegeImages.length > 0 && (

                    <div
                        className="card border-0 shadow-sm mb-4"
                    >

                        <div
                            className="card-body"
                        >

                            <div
                                className="d-flex align-items-center mb-3"
                            >

                                <FaImages
                                    className="text-primary me-2"
                                />

                                <h5
                                    className="fw-bold mb-0"
                                >

                                    College Images

                                </h5>

                            </div>


                            <div
                                className="row g-3"
                            >

                                {collegeImages.map(
                                    (
                                        image,
                                        index
                                    ) => (

                                        <div
                                            className="col-6 col-md-3 col-lg-2"
                                            key={`${image}-${index}`}
                                        >

                                            <button
                                                type="button"
                                                className={`border-0 bg-transparent p-0 w-100 ${
                                                    currentImageIndex === index
                                                        ? "opacity-100"
                                                        : "opacity-75"
                                                }`}
                                                onClick={() =>
                                                    handleImageSelect(
                                                        image,
                                                        index
                                                    )
                                                }
                                            >

                                                <img
                                                    src={
                                                        getImageUrl(
                                                            image
                                                        )
                                                    }
                                                    alt={`${college.name} ${index + 1}`}
                                                    className={`img-fluid rounded ${
                                                        currentImageIndex === index
                                                            ? "border border-primary border-3"
                                                            : ""
                                                    }`}
                                                    style={{
                                                        width: "100%",
                                                        height: "100px",
                                                        objectFit: "cover"
                                                    }}
                                                    onError={(e) => {

                                                        e.currentTarget.style.display =
                                                            "none";

                                                    }}
                                                />

                                            </button>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                )}


                {/* =================================
                    COLLEGE STATISTICS
                ================================= */}

                <div
                    className="row g-4 mb-4"
                >


                    {/* FEES */}

                    <div
                        className="col-md-3"
                    >

                        <div
                            className="card border-0 shadow-sm h-100"
                        >

                            <div
                                className="card-body"
                            >

                                <div
                                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "48px",
                                        height: "48px"
                                    }}
                                >

                                    <FaRupeeSign />

                                </div>


                                <small
                                    className="text-muted"
                                >

                                    Fees

                                </small>


                                <h5
                                    className="fw-bold mt-1 mb-0"
                                >

                                    ₹
                                    {
                                        college.fees ||
                                        "N/A"
                                    }

                                </h5>

                            </div>

                        </div>

                    </div>


                    {/* AVERAGE PACKAGE */}

                    <div
                        className="col-md-3"
                    >

                        <div
                            className="card border-0 shadow-sm h-100"
                        >

                            <div
                                className="card-body"
                            >

                                <div
                                    className="bg-success bg-opacity-10 text-success rounded-circle d-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "48px",
                                        height: "48px"
                                    }}
                                >

                                    <FaBriefcase />

                                </div>


                                <small
                                    className="text-muted"
                                >

                                    Average Package

                                </small>


                                <h5
                                    className="fw-bold mt-1 mb-0"
                                >

                                    ₹
                                    {
                                        averagePackage ||
                                        "N/A"
                                    }

                                </h5>

                            </div>

                        </div>

                    </div>


                    {/* HIGHEST PACKAGE */}

                    <div
                        className="col-md-3"
                    >

                        <div
                            className="card border-0 shadow-sm h-100"
                        >

                            <div
                                className="card-body"
                            >

                                <div
                                    className="bg-warning bg-opacity-10 text-warning rounded-circle d-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "48px",
                                        height: "48px"
                                    }}
                                >

                                    <FaStar />

                                </div>


                                <small
                                    className="text-muted"
                                >

                                    Highest Package

                                </small>


                                <h5
                                    className="fw-bold mt-1 mb-0"
                                >

                                    ₹
                                    {
                                        highestPackage ||
                                        "N/A"
                                    }

                                </h5>

                            </div>

                        </div>

                    </div>


                    {/* PLACEMENT */}

                    <div
                        className="col-md-3"
                    >

                        <div
                            className="card border-0 shadow-sm h-100"
                        >

                            <div
                                className="card-body"
                            >

                                <div
                                    className="bg-info bg-opacity-10 text-info rounded-circle d-flex align-items-center justify-content-center mb-3"
                                    style={{
                                        width: "48px",
                                        height: "48px"
                                    }}
                                >

                                    <FaGraduationCap />

                                </div>


                                <small
                                    className="text-muted"
                                >

                                    Placement

                                </small>


                                <h5
                                    className="fw-bold mt-1 mb-0"
                                >

                                    {
                                        placementPercentage ||
                                        0
                                    }%

                                </h5>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================
                    COURSES
                ================================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                >

                    <div
                        className="card-body p-4"
                    >

                        <h4
                            className="fw-bold mb-4"
                        >

                            <FaGraduationCap
                                className="text-primary me-2"
                            />

                            Courses Offered

                        </h4>


                        {courses.length > 0 ? (

                            <div
                                className="d-flex flex-wrap gap-2"
                            >

                                {courses.map(
                                    (
                                        course,
                                        index
                                    ) => (

                                        <span
                                            key={`${course}-${index}`}
                                            className="badge bg-primary bg-opacity-10 text-primary px-3 py-2"
                                        >

                                            {course}

                                        </span>

                                    )
                                )}

                            </div>

                        ) : (

                            <p
                                className="text-muted mb-0"
                            >

                                No courses information available.

                            </p>

                        )}

                    </div>

                </div>


                {/* =================================
                    LOCATION
                ================================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                >

                    <div
                        className="card-body p-4"
                    >

                        <h4
                            className="fw-bold mb-4"
                        >

                            <FaMapMarkerAlt
                                className="text-danger me-2"
                            />

                            Location

                        </h4>


                        <div className="row">

                            <div
                                className="col-md-4 mb-3"
                            >

                                <small
                                    className="text-muted d-block"
                                >

                                    Location

                                </small>

                                <strong>

                                    {
                                        college.location ||
                                        "N/A"
                                    }

                                </strong>

                            </div>


                            <div
                                className="col-md-4 mb-3"
                            >

                                <small
                                    className="text-muted d-block"
                                >

                                    City

                                </small>

                                <strong>

                                    {
                                        college.city ||
                                        "N/A"
                                    }

                                </strong>

                            </div>


                            <div
                                className="col-md-4 mb-3"
                            >

                                <small
                                    className="text-muted d-block"
                                >

                                    State

                                </small>

                                <strong>

                                    {
                                        college.state ||
                                        "N/A"
                                    }

                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================
                    DESCRIPTION
                ================================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                >

                    <div
                        className="card-body p-4"
                    >

                        <h4
                            className="fw-bold mb-3"
                        >

                            About {college.name}

                        </h4>


                        <p
                            className="text-muted mb-0"
                            style={{
                                lineHeight: "1.9"
                            }}
                        >

                            {
                                college.description ||
                                "No description available."
                            }

                        </p>

                    </div>

                </div>


                {/* =================================
                    BOTTOM ACTIONS
                ================================= */}

                <div
                    className="d-flex flex-wrap gap-2 mb-5"
                >

                    <Link
                        to={`/college/${college._id}/reviews`}
                        className="btn btn-primary"
                    >

                        <FaStar
                            className="me-2"
                        />

                        View Reviews

                    </Link>


                    <Link
                        to="/compare"
                        className="btn btn-outline-primary"
                    >

                        Compare College

                    </Link>


                    <button
                        type="button"
                        className={`btn ${
                            isSaved
                                ? "btn-danger"
                                : "btn-outline-danger"
                        }`}
                        onClick={
                            handleSave
                        }
                    >

                        {isSaved ? (

                            <FaHeart
                                className="me-2"
                            />

                        ) : (

                            <FaRegHeart
                                className="me-2"
                            />

                        )}

                        {isSaved
                            ? "Saved"
                            : "Save College"}

                    </button>

                </div>

            </div>

        </div>

    );

};


export default CollegeDetails;

