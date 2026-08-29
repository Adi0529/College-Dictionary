import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaGraduationCap,
    FaMapMarkerAlt,
    FaRupeeSign,
    FaBookmark
} from "react-icons/fa";

import {
    compareColleges
} from "../redux/collegeSlice";

import {
    saveComparison
} from "../redux/savedSlice";


const CompareColleges = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();


    const {
        comparedColleges,
        loading,
        error
    } = useSelector(
        state => state.college
    );


    const {
        isLoggedIn
    } = useSelector(
        state => state.auth
    );


    const [selectedIds, setSelectedIds] = useState([]);


    // =====================================
    // GET IDS FROM URL
    // =====================================

    useEffect(() => {

        const ids =
            searchParams.get("ids");

        if (ids) {

            const collegeIds =
                ids.split(",");

            setSelectedIds(collegeIds);

            dispatch(
                compareColleges(collegeIds)
            );

        }

    }, [dispatch, searchParams]);


    // =====================================
    // REMOVE COLLEGE
    // =====================================

    const removeCollege = (id) => {

        const updatedIds =
            selectedIds.filter(
                collegeId =>
                    collegeId !== id
            );


        setSelectedIds(updatedIds);


        if (updatedIds.length > 0) {

            navigate(
                `/compare?ids=${updatedIds.join(",")}`
            );

        } else {

            navigate("/compare");

        }

    };


    // =====================================
    // SAVE COMPARISON
    // =====================================

    const handleSaveComparison = () => {

        if (!isLoggedIn) {

            navigate("/login");

            return;

        }


        if (selectedIds.length > 0) {

            dispatch(
                saveComparison(selectedIds)
            );

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="mt-3">
                    Loading comparison...
                </p>

            </div>

        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (error) {

        return (

            <div className="container py-5">

                <div className="alert alert-danger">

                    {error}

                </div>

            </div>

        );

    }


    return (

        <div className="bg-light min-vh-100">

            {/* =================================
                HEADER
            ================================= */}

            <div className="container py-4">

                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate(-1)}
                >

                    <FaArrowLeft className="me-2" />

                    Back

                </button>


                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                    <div>

                        <h2 className="fw-bold mb-1">

                            Compare Colleges

                        </h2>

                        <p className="text-muted mb-0">

                            Compare colleges side by side

                        </p>

                    </div>


                    {comparedColleges.length > 0 && (

                        <button
                            className="btn btn-primary"
                            onClick={handleSaveComparison}
                        >

                            <FaBookmark className="me-2" />

                            Save Comparison

                        </button>

                    )}

                </div>

            </div>


            {/* =================================
                NO COLLEGE
            ================================= */}

            {comparedColleges.length === 0 ? (

                <div className="container pb-5">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center py-5">

                            <FaGraduationCap
                                className="fs-1 text-muted mb-3"
                            />

                            <h4 className="fw-bold">

                                No Colleges Selected

                            </h4>

                            <p className="text-muted">

                                Select colleges from the college listing
                                to compare them.

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

                </div>

            ) : (

                <div className="container pb-5">

                    <div className="table-responsive">

                        <table className="table table-bordered bg-white shadow-sm align-middle">

                            {/* =================================
                                COLLEGE HEADER
                            ================================= */}

                            <thead>

                                <tr>

                                    <th
                                        className="bg-light"
                                        style={{
                                            minWidth: "180px"
                                        }}
                                    >
                                        Details
                                    </th>


                                    {comparedColleges.map(
                                        college => (

                                            <th
                                                key={college._id}
                                                className="text-center"
                                                style={{
                                                    minWidth: "250px"
                                                }}
                                            >

                                                <img
                                                    src={
                                                        college.image ||
                                                        college.collegeImage
                                                    }
                                                    alt={college.name}
                                                    className="rounded mb-3"
                                                    style={{
                                                        width: "100%",
                                                        height: "160px",
                                                        objectFit: "cover"
                                                    }}
                                                />


                                                <h5 className="fw-bold">

                                                    {college.name}

                                                </h5>


                                                <button
                                                    className="btn btn-sm btn-outline-danger mt-2"
                                                    onClick={() =>
                                                        removeCollege(
                                                            college._id
                                                        )
                                                    }
                                                >

                                                    Remove

                                                </button>

                                            </th>

                                        )
                                    )}

                                </tr>

                            </thead>


                            {/* =================================
                                COMPARISON DATA
                            ================================= */}

                            <tbody>

                                {/* LOCATION */}

                                <tr>

                                    <th className="bg-light">

                                        <FaMapMarkerAlt
                                            className="me-2 text-danger"
                                        />

                                        Location

                                    </th>


                                    {comparedColleges.map(
                                        college => (

                                            <td
                                                key={college._id}
                                                className="text-center"
                                            >

                                                {college.location ||
                                                    college.city ||
                                                    "N/A"}

                                            </td>

                                        )
                                    )}

                                </tr>


                                {/* COURSES */}

                                <tr>

                                    <th className="bg-light">

                                        <FaGraduationCap
                                            className="me-2 text-primary"
                                        />

                                        Courses

                                    </th>


                                    {comparedColleges.map(
                                        college => (

                                            <td
                                                key={college._id}
                                                className="text-center"
                                            >

                                                {college.courses ||
                                                    "N/A"}

                                            </td>

                                        )
                                    )}

                                </tr>


                                {/* FEES */}

                                <tr>

                                    <th className="bg-light">

                                        <FaRupeeSign
                                            className="me-2 text-success"
                                        />

                                        Fees

                                    </th>


                                    {comparedColleges.map(
                                        college => (

                                            <td
                                                key={college._id}
                                                className="text-center"
                                            >

                                                {college.fees ||
                                                    "N/A"}

                                            </td>

                                        )
                                    )}

                                </tr>


                                {/* DESCRIPTION */}

                                <tr>

                                    <th className="bg-light">

                                        Description

                                    </th>


                                    {comparedColleges.map(
                                        college => (

                                            <td
                                                key={college._id}
                                            >

                                                {college.description ||
                                                    "N/A"}

                                            </td>

                                        )
                                    )}

                                </tr>


                                {/* WEBSITE */}

                                <tr>

                                    <th className="bg-light">

                                        Website

                                    </th>


                                    {comparedColleges.map(
                                        college => (

                                            <td
                                                key={college._id}
                                                className="text-center"
                                            >

                                                {college.website ? (

                                                    <a
                                                        href={
                                                            college.website
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="btn btn-sm btn-outline-primary"
                                                    >

                                                        Visit Website

                                                    </a>

                                                ) : (

                                                    "N/A"

                                                )}

                                            </td>

                                        )
                                    )}

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            )}

        </div>

    );

};


export default CompareColleges;