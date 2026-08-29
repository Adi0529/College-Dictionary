import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FaStar,
    FaEdit,
    FaTrash,
    FaUser
} from "react-icons/fa";

import {
    getCollegeReviews,
    addReview,
    updateReview,
    deleteReview
} from "../redux/reviewSlice";


const CollegeReviews = ({ collegeId }) => {

    const dispatch = useDispatch();


    const {
        reviews,
        total,
        loading,
        error
    } = useSelector(
        state => state.review
    );


    const {
        isLoggedIn,
        user
    } = useSelector(
        state => state.auth
    );


    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const [editingId, setEditingId] = useState(null);


    // =====================================
    // GET REVIEWS
    // =====================================

    useEffect(() => {

        dispatch(
            getCollegeReviews(collegeId)
        );

    }, [dispatch, collegeId]);


    // =====================================
    // SUBMIT REVIEW
    // =====================================

    const handleSubmit = (e) => {

        e.preventDefault();


        if (editingId) {

            dispatch(
                updateReview({
                    id: editingId,
                    reviewData: {
                        rating,
                        comment
                    }
                })
            );

            setEditingId(null);

        } else {

            dispatch(
                addReview({
                    collegeId,
                    reviewData: {
                        rating,
                        comment
                    }
                })
            );

        }


        setRating(5);

        setComment("");

    };


    // =====================================
    // EDIT REVIEW
    // =====================================

    const handleEdit = (review) => {

        setEditingId(review._id);

        setRating(review.rating);

        setComment(review.comment);

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    };


    // =====================================
    // DELETE REVIEW
    // =====================================

    const handleDelete = (id) => {

        dispatch(
            deleteReview(id)
        );

    };


    // =====================================
    // CANCEL EDIT
    // =====================================

    const cancelEdit = () => {

        setEditingId(null);

        setRating(5);

        setComment("");

    };


    return (

        <div className="container pb-5">


            {/* =================================
                REVIEW HEADER
            ================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h3 className="fw-bold mb-1">

                                Student Reviews

                            </h3>

                            <p className="text-muted mb-0">

                                {total} review{total !== 1 ? "s" : ""}

                            </p>

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
                        REVIEWS
                    ================================= */}

                    {loading && reviews.length === 0 ? (

                        <div className="text-center py-4">

                            <div
                                className="spinner-border text-primary"
                            />

                        </div>

                    ) : reviews.length === 0 ? (

                        <div className="text-center py-4">

                            <FaStar className="fs-1 text-muted mb-3" />

                            <h5>
                                No reviews yet
                            </h5>

                            <p className="text-muted">
                                Be the first to review this college.
                            </p>

                        </div>

                    ) : (

                        reviews.map(review => (

                            <div
                                key={review._id}
                                className="border-bottom py-3"
                            >

                                <div className="d-flex justify-content-between">

                                    <div className="d-flex align-items-center">

                                        <div
                                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: "42px",
                                                height: "42px"
                                            }}
                                        >

                                            <FaUser />

                                        </div>


                                        <div>

                                            <h6 className="mb-1 fw-bold">

                                                {review.user?.name ||
                                                    "User"}

                                            </h6>


                                            <div>

                                                {[1, 2, 3, 4, 5].map(
                                                    star => (

                                                        <FaStar
                                                            key={star}
                                                            className={
                                                                star <= review.rating
                                                                    ? "text-warning me-1"
                                                                    : "text-secondary me-1"
                                                            }
                                                        />

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>


                                    {/* ACTIONS */}

                                    {user &&
                                        review.user?._id === user._id && (

                                            <div>

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() =>
                                                        handleEdit(review)
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

                                            </div>

                                        )}

                                </div>


                                <p className="mt-3 mb-0 text-secondary">

                                    {review.comment}

                                </p>

                            </div>

                        ))

                    )}

                </div>

            </div>


            {/* =================================
                ADD REVIEW
            ================================= */}

            {isLoggedIn ? (

                <div className="card border-0 shadow-sm mt-4">

                    <div className="card-body p-4">

                        <h4 className="fw-bold mb-3">

                            {editingId
                                ? "Update Your Review"
                                : "Write a Review"}

                        </h4>


                        <form onSubmit={handleSubmit}>


                            {/* RATING */}

                            <div className="mb-3">

                                <label className="form-label fw-semibold">

                                    Rating

                                </label>


                                <div>

                                    {[1, 2, 3, 4, 5].map(
                                        star => (

                                            <FaStar
                                                key={star}
                                                onClick={() =>
                                                    setRating(star)
                                                }
                                                className={
                                                    star <= rating
                                                        ? "text-warning fs-4 me-2"
                                                        : "text-secondary fs-4 me-2"
                                                }
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                            />

                                        )
                                    )}

                                </div>

                            </div>


                            {/* COMMENT */}

                            <div className="mb-3">

                                <label className="form-label fw-semibold">

                                    Your Review

                                </label>

                                <textarea
                                    className="form-control"
                                    rows="4"
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Share your experience..."
                                />

                            </div>


                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                                disabled={loading}
                            >

                                {editingId
                                    ? "Update Review"
                                    : "Submit Review"}

                            </button>


                            {editingId && (

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cancelEdit}
                                >

                                    Cancel

                                </button>

                            )}

                        </form>

                    </div>

                </div>

            ) : (

                <div className="alert alert-info mt-4">

                    Please login to write a review.

                </div>

            )}

        </div>

    );

};


export default CollegeReviews;