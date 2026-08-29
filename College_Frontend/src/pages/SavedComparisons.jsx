import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FaBookmark,
    FaEye,
    FaTrash,
    FaUniversity,
    FaArrowRight
} from "react-icons/fa";

import {
    getSavedComparisons,
    deleteSavedComparison
} from "../redux/savedSlice";


const SavedComparisons = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const {
        savedComparisons,
        loading,
        error
    } = useSelector(
        state => state.saved
    );


    // =====================================
    // GET SAVED COMPARISONS
    // =====================================

    useEffect(() => {

        dispatch(
            getSavedComparisons()
        );

    }, [dispatch]);


    // =====================================
    // DELETE
    // =====================================

    const handleDelete = (id) => {

        dispatch(
            deleteSavedComparison(id)
        );

    };


    // =====================================
    // OPEN COMPARISON
    // =====================================

    const handleView = (comparison) => {

        const colleges =
            comparison.colleges || [];


        const ids =
            colleges.map(
                college => college._id
            );


        if (ids.length > 0) {

            navigate(
                `/compare?ids=${ids.join(",")}`
            );

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading && savedComparisons.length === 0) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="mt-3">

                    Loading saved comparisons...

                </p>

            </div>

        );

    }


    return (

        <div className="bg-light min-vh-100">

            <div className="container py-5">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="mb-4">

                    <h2 className="fw-bold">

                        <FaBookmark
                            className="text-primary me-2"
                        />

                        Saved Comparisons

                    </h2>

                    <p className="text-muted">

                        View and manage your saved college comparisons.

                    </p>

                </div>


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                {/* =================================
                    EMPTY
                ================================= */}

                {savedComparisons.length === 0 ? (

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <FaUniversity
                                className="fs-1 text-secondary mb-3"
                            />

                            <h4 className="fw-bold">

                                No Saved Comparisons

                            </h4>

                            <p className="text-muted">

                                Save a college comparison to find it here later.

                            </p>


                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    navigate("/colleges")
                                }
                            >

                                Browse Colleges

                            </button>

                        </div>

                    </div>

                ) : (

                    <div className="row g-4">

                        {savedComparisons.map(
                            comparison => (

                                <div
                                    className="col-lg-6"
                                    key={comparison._id}
                                >

                                    <div className="card border-0 shadow-sm h-100">

                                        <div className="card-body p-4">


                                            {/* TITLE */}

                                            <div className="d-flex justify-content-between align-items-start mb-3">

                                                <div>

                                                    <h5 className="fw-bold mb-1">

                                                        College Comparison

                                                    </h5>

                                                    <small className="text-muted">

                                                        {comparison.colleges?.length ||
                                                            0} Colleges

                                                    </small>

                                                </div>


                                                <FaBookmark
                                                    className="text-primary fs-4"
                                                />

                                            </div>


                                            {/* COLLEGES */}

                                            <div className="mb-4">

                                                {comparison.colleges?.map(
                                                    college => (

                                                        <div
                                                            key={college._id}
                                                            className="d-flex align-items-center border rounded p-2 mb-2"
                                                        >

                                                            <img
                                                                src={
                                                                    college.image ||
                                                                    college.collegeImage
                                                                }
                                                                alt={college.name}
                                                                style={{
                                                                    width: "55px",
                                                                    height: "55px",
                                                                    objectFit: "cover"
                                                                }}
                                                                className="rounded me-3"
                                                            />


                                                            <div>

                                                                <h6 className="fw-bold mb-1">

                                                                    {college.name}

                                                                </h6>

                                                                <small className="text-muted">

                                                                    {college.location ||
                                                                        college.city ||
                                                                        "Location not available"}

                                                                </small>

                                                            </div>

                                                        </div>

                                                    )
                                                )}

                                            </div>


                                            {/* ACTIONS */}

                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-primary flex-grow-1"
                                                    onClick={() =>
                                                        handleView(
                                                            comparison
                                                        )
                                                    }
                                                >

                                                    <FaEye className="me-2" />

                                                    View Comparison

                                                    <FaArrowRight
                                                        className="ms-2"
                                                    />

                                                </button>


                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleDelete(
                                                            comparison._id
                                                        )
                                                    }
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

};


export default SavedComparisons;