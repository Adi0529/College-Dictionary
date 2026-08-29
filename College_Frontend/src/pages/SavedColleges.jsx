import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    FaBookmark,
    FaTrash,
    FaMapMarkerAlt,
    FaEye
} from "react-icons/fa";

import {
    getSavedColleges,
    removeSavedCollege
} from "../redux/savedSlice";


const SavedColleges = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const {
        savedColleges,
        loading,
        error
    } = useSelector(
        state => state.saved
    );


    // =====================================
    // GET SAVED COLLEGES
    // =====================================

    useEffect(() => {

        dispatch(
            getSavedColleges()
        );

    }, [dispatch]);


    // =====================================
    // REMOVE
    // =====================================

    const handleRemove = (collegeId) => {

        dispatch(
            removeSavedCollege(collegeId)
        );

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading && savedColleges.length === 0) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="mt-3">
                    Loading saved colleges...
                </p>

            </div>

        );

    }


    return (

        <div className="bg-light min-vh-100">

            {/* =================================
                HEADER
            ================================= */}

            <div className="container py-5">

                <div className="mb-4">

                    <h2 className="fw-bold">

                        <FaBookmark
                            className="text-primary me-2"
                        />

                        Saved Colleges

                    </h2>

                    <p className="text-muted">

                        Colleges you have saved for later.

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
                    EMPTY STATE
                ================================= */}

                {savedColleges.length === 0 ? (

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <FaBookmark
                                className="fs-1 text-secondary mb-3"
                            />

                            <h4 className="fw-bold">

                                No Saved Colleges

                            </h4>

                            <p className="text-muted">

                                You haven't saved any colleges yet.

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

                        {savedColleges.map(item => {

                            const college =
                                item.college;


                            return (

                                <div
                                    className="col-lg-4 col-md-6"
                                    key={item._id}
                                >

                                    <div className="card border-0 shadow-sm h-100">

                                        {/* IMAGE */}

                                        <img
                                            src={
                                                college.image ||
                                                college.collegeImage
                                            }
                                            alt={college.name}
                                            className="card-img-top"
                                            style={{
                                                height: "220px",
                                                objectFit: "cover"
                                            }}
                                        />


                                        {/* BODY */}

                                        <div className="card-body">

                                            <h5 className="fw-bold">

                                                {college.name}

                                            </h5>


                                            <p className="text-muted">

                                                <FaMapMarkerAlt
                                                    className="text-danger me-2"
                                                />

                                                {college.location ||
                                                    college.city ||
                                                    "Location not available"}

                                            </p>


                                            <p className="text-secondary">

                                                {college.description
                                                    ? college.description.length > 100
                                                        ? college.description.substring(
                                                            0,
                                                            100
                                                        ) + "..."
                                                        : college.description
                                                    : "No description available"}

                                            </p>

                                        </div>


                                        {/* FOOTER */}

                                        <div className="card-footer bg-white border-0 p-3">

                                            <div className="d-flex gap-2">

                                                <button
                                                    className="btn btn-primary flex-grow-1"
                                                    onClick={() =>
                                                        navigate(
                                                            `/college/${college._id}`
                                                        )
                                                    }
                                                >

                                                    <FaEye className="me-2" />

                                                    View Details

                                                </button>


                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleRemove(
                                                            college._id
                                                        )
                                                    }
                                                >

                                                    <FaTrash />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </div>

        </div>

    );

};


export default SavedColleges;