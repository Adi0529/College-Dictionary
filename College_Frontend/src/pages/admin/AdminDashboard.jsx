import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FaUniversity,
    FaUsers,
    FaStar,
    FaBookmark,
    FaArrowRight
} from "react-icons/fa";

import { getAllColleges } from "../../redux/collegeSlice";
import { getAllUsers } from "../../redux/authSlice";
import { getCollegeReviews } from "../../redux/reviewSlice";
import { getSavedColleges } from "../../redux/savedSlice";

import { useNavigate } from "react-router-dom";
import StatCard from "../../components/StatCard"; 


const AdminDashboard = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    // =====================================
    // REDUX DATA
    // =====================================

    const {
        colleges,
        loading: collegeLoading
    } = useSelector(
        state => state.college
    );


    const {
        users,
        loading: userLoading
    } = useSelector(
        state => state.auth
    );


    const {
        total: reviewTotal,
        loading: reviewLoading
    } = useSelector(
        state => state.review
    );


    const {
        savedColleges,
        loading: savedLoading
    } = useSelector(
        state => state.saved
    );


    // =====================================
    // LOAD DATA
    // =====================================

    useEffect(() => {

        dispatch(
            getAllColleges({
                page: 1,
                limit: 100
            })
        );

        dispatch(
            getAllUsers()
        );

        dispatch(
            getSavedColleges()
        );

    }, [dispatch]);


    // =====================================
    // CALCULATE TOTALS
    // =====================================

    const totalColleges =
        colleges?.length || 0;

    const totalUsers =
        users?.length || 0;

    const totalReviews =
        reviewTotal || 0;

    const totalSaved =
        savedColleges?.length || 0;


    const loading =
        collegeLoading ||
        userLoading ||
        reviewLoading ||
        savedLoading;

    return (

        <div>


            {/* =================================
                HEADER
            ================================= */}

            <div className="mb-4">

                <h2 className="fw-bold">

                    Dashboard

                </h2>

                <p className="text-muted mb-0">

                    Overview of your College Discovery Platform.

                </p>

            </div>


            {/* =================================
                STATISTICS
            ================================= */}

            <div className="row g-4">


                <StatCard
                    title="Total Colleges"
                    value={totalColleges}
                    icon={
                        <FaUniversity className="fs-4" />
                    }
                    bg="bg-primary bg-opacity-10"
                    text="text-primary"
                />


                <StatCard
                    title="Total Users"
                    value={totalUsers}
                    icon={
                        <FaUsers className="fs-4" />
                    }
                    bg="bg-success bg-opacity-10"
                    text="text-success"
                />


                <StatCard
                    title="Total Reviews"
                    value={totalReviews}
                    icon={
                        <FaStar className="fs-4" />
                    }
                    bg="bg-warning bg-opacity-10"
                    text="text-warning"
                />


                <StatCard
                    title="Saved Colleges"
                    value={totalSaved}
                    icon={
                        <FaBookmark className="fs-4" />
                    }
                    bg="bg-danger bg-opacity-10"
                    text="text-danger"
                />

            </div>


            {/* =================================
                QUICK ACTIONS
            ================================= */}

            <div className="row g-4 mt-2">


                {/* MANAGE COLLEGES */}

                <div className="col-md-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body p-4">

                            <div className="d-flex align-items-center mb-3">

                                <div
                                    className="bg-primary bg-opacity-10 text-primary rounded p-3 me-3"
                                >

                                    <FaUniversity />

                                </div>

                                <div>

                                    <h5 className="fw-bold mb-1">

                                        Manage Colleges

                                    </h5>

                                    <small className="text-muted">

                                        Add, edit and delete colleges.

                                    </small>

                                </div>

                            </div>


                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    navigate(
                                        "/admin/colleges"
                                    )
                                }
                            >

                                Manage Colleges

                                <FaArrowRight className="ms-2" />

                            </button>

                        </div>

                    </div>

                </div>


                {/* MANAGE USERS */}

                <div className="col-md-6">

                    <div className="card border-0 shadow-sm h-100">

                        <div className="card-body p-4">

                            <div className="d-flex align-items-center mb-3">

                                <div
                                    className="bg-success bg-opacity-10 text-success rounded p-3 me-3"
                                >

                                    <FaUsers />

                                </div>

                                <div>

                                    <h5 className="fw-bold mb-1">

                                        Manage Users

                                    </h5>

                                    <small className="text-muted">

                                        View and manage registered users.

                                    </small>

                                </div>

                            </div>


                            <button
                                className="btn btn-success"
                                onClick={() =>
                                    navigate(
                                        "/admin/users"
                                    )
                                }
                            >

                                Manage Users

                                <FaArrowRight className="ms-2" />

                            </button>

                        </div>

                    </div>

                </div>

            </div>


            {/* =================================
                PLATFORM OVERVIEW
            ================================= */}

            <div className="card border-0 shadow-sm mt-4">

                <div className="card-body p-4">

                    <h5 className="fw-bold mb-4">

                        Platform Overview

                    </h5>


                    <div className="row text-center">


                        <div className="col-md-4 border-end">

                            <FaUniversity
                                className="text-primary fs-3 mb-2"
                            />

                            <h5 className="fw-bold">

                                {totalColleges}

                            </h5>

                            <p className="text-muted mb-0">

                                Colleges available

                            </p>

                        </div>


                        <div className="col-md-4 border-end">

                            <FaUsers
                                className="text-success fs-3 mb-2"
                            />

                            <h5 className="fw-bold">

                                {totalUsers}

                            </h5>

                            <p className="text-muted mb-0">

                                Registered users

                            </p>

                        </div>


                        <div className="col-md-4">

                            <FaStar
                                className="text-warning fs-3 mb-2"
                            />

                            <h5 className="fw-bold">

                                {totalReviews}

                            </h5>

                            <p className="text-muted mb-0">

                                Reviews submitted

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default AdminDashboard;