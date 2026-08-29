import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FaStar,
    FaTrash,
    FaEdit,
    FaUniversity
} from "react-icons/fa";

import {
    getAllColleges
} from "../../redux/collegeSlice";

import {
    getCollegeReviews,
    deleteReview,
    updateReview
} from "../../redux/reviewSlice";


const AdminReviews = () => {

    const dispatch = useDispatch();


    // =====================================
    // COLLEGE STATE
    // =====================================

    const {
        colleges
    } = useSelector(
        state => state.college
    );


    // =====================================
    // REVIEW STATE
    // =====================================

    const {
        reviews,
        loading,
        error
    } = useSelector(
        state => state.review
    );


    // =====================================
    // LOCAL STATE
    // =====================================

    const [selectedCollege, setSelectedCollege] =
        useState("");


    const [editingReview, setEditingReview] =
        useState(null);


    const [rating, setRating] =
        useState("");


    const [comment, setComment] =
        useState("");


    // =====================================
    // GET COLLEGES
    // =====================================

    useEffect(() => {

        dispatch(
            getAllColleges({
                page: 1,
                limit: 100
            })
        );

    }, [dispatch]);


    // =====================================
    // COLLEGE CHANGE
    // =====================================

    const handleCollegeChange = (e) => {

        const collegeId =
            e.target.value;


        setSelectedCollege(
            collegeId
        );


        if (collegeId) {

            dispatch(
                getCollegeReviews(
                    collegeId
                )
            );

        }

    };


    // =====================================
    // DELETE REVIEW
    // =====================================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this review?"
            );


        if (!confirmDelete) {

            return;

        }


        dispatch(
            deleteReview(id)
        );

    };


    // =====================================
    // START EDIT
    // =====================================

    const handleEdit = (review) => {

        setEditingReview(
            review._id
        );


        setRating(
            review.rating || ""
        );


        setComment(
            review.comment || ""
        );

    };


    // =====================================
    // CANCEL EDIT
    // =====================================

    const handleCancelEdit = () => {

        setEditingReview(null);

        setRating("");

        setComment("");

    };


    // =====================================
    // UPDATE REVIEW
    // =====================================

    const handleUpdate = (e) => {

        e.preventDefault();


        dispatch(
            updateReview({

                id: editingReview,

                reviewData: {
                    rating,
                    comment
                }

            })
        );


        handleCancelEdit();

    };


    return (

        <div>


            {/* =================================
                HEADER
            ================================= */}

            <div className="mb-4">

                <h2 className="fw-bold">

                    Manage Reviews

                </h2>

                <p className="text-muted mb-0">

                    View, edit and delete college reviews.

                </p>

            </div>


            {/* =================================
                COLLEGE SELECT
            ================================= */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                    <label className="form-label fw-semibold">

                        Select College

                    </label>


                    <select
                        className="form-select"
                        value={selectedCollege}
                        onChange={
                            handleCollegeChange
                        }
                    >

                        <option value="">

                            Select a college

                        </option>


                        {colleges?.map(
                            college => (

                                <option
                                    key={
                                        college._id
                                    }
                                    value={
                                        college._id
                                    }
                                >

                                    {
                                        college.name
                                    }

                                </option>

                            )
                        )}

                    </select>

                </div>

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
                NO COLLEGE
            ================================= */}

            {!selectedCollege && (

                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <FaUniversity
                            className="text-muted fs-1 mb-3"
                        />

                        <h5 className="fw-bold">

                            Select a College

                        </h5>

                        <p className="text-muted mb-0">

                            Select a college above to view its reviews.

                        </p>

                    </div>

                </div>

            )}


            {/* =================================
                REVIEWS
            ================================= */}

            {selectedCollege && (

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-0">


                        {loading ? (

                            <div className="text-center py-5">

                                <div
                                    className="spinner-border text-primary"
                                />

                                <p className="text-muted mt-2">

                                    Loading reviews...

                                </p>

                            </div>

                        ) : reviews?.length === 0 ? (

                            <div className="text-center py-5">

                                <FaStar
                                    className="text-muted fs-1 mb-3"
                                />

                                <h5 className="fw-bold">

                                    No Reviews

                                </h5>

                                <p className="text-muted mb-0">

                                    No reviews found for this college.

                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead className="table-light">

                                        <tr>

                                            <th className="px-4">
                                                User
                                            </th>

                                            <th>
                                                Rating
                                            </th>

                                            <th>
                                                Review
                                            </th>

                                            <th className="text-center">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {reviews.map(
                                            review => (

                                                <tr
                                                    key={
                                                        review._id
                                                    }
                                                >

                                                    {/* USER */}

                                                    <td className="px-4">

                                                        <div className="fw-semibold">

                                                            {
                                                                review.user?.name ||
                                                                review.userId?.name ||
                                                                "User"
                                                            }

                                                        </div>

                                                        <small className="text-muted">

                                                            {
                                                                review.user?.email ||
                                                                review.userId?.email ||
                                                                ""
                                                            }

                                                        </small>

                                                    </td>


                                                    {/* RATING */}

                                                    <td>

                                                        <span className="text-warning">

                                                            <FaStar />

                                                        </span>

                                                        <span className="ms-1 fw-semibold">

                                                            {
                                                                review.rating
                                                            }

                                                        </span>

                                                        / 5

                                                    </td>


                                                    {/* COMMENT */}

                                                    <td>

                                                        {editingReview ===
                                                        review._id ? (

                                                            <form
                                                                onSubmit={
                                                                    handleUpdate
                                                                }
                                                            >

                                                                <div className="mb-2">

                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        max="5"
                                                                        className="form-control form-control-sm"
                                                                        value={
                                                                            rating
                                                                        }
                                                                        onChange={(e) =>
                                                                            setRating(
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    />

                                                                </div>


                                                                <textarea
                                                                    className="form-control form-control-sm mb-2"
                                                                    rows="2"
                                                                    value={
                                                                        comment
                                                                    }
                                                                    onChange={(e) =>
                                                                        setComment(
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />


                                                                <button
                                                                    type="submit"
                                                                    className="btn btn-sm btn-primary me-2"
                                                                >

                                                                    Save

                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-secondary"
                                                                    onClick={
                                                                        handleCancelEdit
                                                                    }
                                                                >

                                                                    Cancel

                                                                </button>

                                                            </form>

                                                        ) : (

                                                            <span>

                                                                {
                                                                    review.comment
                                                                }

                                                            </span>

                                                        )}

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td className="text-center">

                                                        {editingReview !==
                                                        review._id && (

                                                            <>

                                                                <button
                                                                    className="btn btn-sm btn-outline-primary me-2"
                                                                    onClick={() =>
                                                                        handleEdit(
                                                                            review
                                                                        )
                                                                    }
                                                                >

                                                                    <FaEdit />

                                                                </button>


                                                                <button
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            review._id
                                                                        )
                                                                    }
                                                                >

                                                                    <FaTrash />

                                                                </button>

                                                            </>

                                                        )}

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

};


export default AdminReviews;