import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FaGraduationCap,
    FaHeart,
    FaBalanceScale,
    FaUserCircle,
    FaSignOutAlt,
    FaBars,
    FaTachometerAlt
} from "react-icons/fa";

import { logout } from "../redux/authSlice";


function Navbar() {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const {
        user,
        isLoggedIn
    } = useSelector(
        state => state.auth
    );


    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");

    };


    // =====================================
    // ADMIN CHECK
    // =====================================

    const isAdmin =
        user?.role === "Admin";


    return (

        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">

            <div className="container">


                {/* =================================
                    LOGO
                ================================= */}

                <Link
                    to="/"
                    className="navbar-brand fw-bold text-primary d-flex align-items-center"
                >

                    <FaGraduationCap
                        size={30}
                        className="me-2"
                    />

                    CollegeFinder

                </Link>


                {/* =================================
                    MOBILE TOGGLE
                ================================= */}

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarMenu"
                    aria-controls="navbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >

                    <FaBars />

                </button>


                {/* =================================
                    NAVBAR MENU
                ================================= */}

                <div
                    className="collapse navbar-collapse"
                    id="navbarMenu"
                >


                    {/* =================================
                        MAIN NAVIGATION
                    ================================= */}

                    <ul className="navbar-nav mx-auto">


                        {/* HOME */}

                        <li className="nav-item">

                            <Link
                                to="/"
                                className="nav-link"
                            >

                                Home

                            </Link>

                        </li>


                        {/* COLLEGES */}

                        <li className="nav-item">

                            <Link
                                to="/colleges"
                                className="nav-link"
                            >

                                Colleges

                            </Link>

                        </li>


                        {/* COMPARE */}

                        {!isAdmin && (

                            <li className="nav-item">

                                <Link
                                    to="/compare"
                                    className="nav-link"
                                >

                                    <FaBalanceScale
                                        className="me-1"
                                    />

                                    Compare

                                </Link>

                            </li>

                        )}

                    </ul>


                    {/* =================================
                        RIGHT SIDE
                    ================================= */}

                    <div className="d-flex align-items-center gap-2">


                        {!isLoggedIn ? (

                            /* =================================
                               LOGGED OUT
                            ================================= */

                            <>

                                <Link
                                    to="/login"
                                    className="btn btn-outline-primary"
                                >

                                    Login

                                </Link>


                                <Link
                                    to="/register"
                                    className="btn btn-primary"
                                >

                                    Register

                                </Link>

                            </>

                        ) : (

                            /* =================================
                               LOGGED IN
                            ================================= */

                            <>

                                {/* =================================
                                    ADMIN PANEL
                                ================================= */}

                                {isAdmin ? (

                                    <Link
                                        to="/admin"
                                        className="btn btn-outline-primary"
                                    >

                                        <FaTachometerAlt
                                            className="me-1"
                                        />

                                        Admin Panel

                                    </Link>

                                ) : (

                                    /* =================================
                                       SAVED COLLEGES
                                    ================================= */

                                    <Link
                                        to="/saved-colleges"
                                        className="btn btn-light"
                                    >

                                        <FaHeart
                                            className="text-danger me-1"
                                        />

                                        Saved

                                    </Link>

                                )}


                                {/* =================================
                                    USER DROPDOWN
                                ================================= */}

                                <div className="dropdown">


                                    <button
                                        className="btn btn-primary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >

                                        <FaUserCircle
                                            className="me-1"
                                        />

                                        {user?.name ||
                                            "Account"}

                                    </button>


                                    <ul className="dropdown-menu dropdown-menu-end">


                                        {/* PROFILE */}

                                        <li>

                                            <Link
                                                to="/profile"
                                                className="dropdown-item"
                                            >

                                                <FaUserCircle
                                                    className="me-2"
                                                />

                                                Profile

                                            </Link>

                                        </li>


                                        {/* ADMIN DASHBOARD */}

                                        {isAdmin && (

                                            <li>

                                                <Link
                                                    to="/admin"
                                                    className="dropdown-item"
                                                >

                                                    <FaTachometerAlt
                                                        className="me-2"
                                                    />

                                                    Admin Dashboard

                                                </Link>

                                            </li>

                                        )}


                                        <li>

                                            <hr className="dropdown-divider" />

                                        </li>


                                        {/* LOGOUT */}

                                        <li>

                                            <button
                                                type="button"
                                                className="dropdown-item text-danger"
                                                onClick={
                                                    handleLogout
                                                }
                                            >

                                                <FaSignOutAlt
                                                    className="me-2"
                                                />

                                                Logout

                                            </button>

                                        </li>

                                    </ul>

                                </div>

                            </>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

}


export default Navbar;