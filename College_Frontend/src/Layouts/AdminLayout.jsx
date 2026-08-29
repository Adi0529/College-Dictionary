import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";

import {
    FaTachometerAlt,
    FaUniversity,
    FaUsers,
    FaStar,
    FaSignOutAlt
} from "react-icons/fa";

import { useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";


const AdminLayout = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");

    };


    return (

        <div className="d-flex min-vh-100 bg-light">


            {/* =================================
                SIDEBAR
            ================================= */}

            <aside
                className="bg-white border-end"
                style={{
                    width: "250px"
                }}
            >

                <div className="d-flex flex-column h-100">


                    {/* LOGO */}

                    <div className="p-4 border-bottom">

                        <h4 className="fw-bold mb-0">

                            College Admin

                        </h4>

                        <small className="text-muted">

                            Management Panel

                        </small>

                    </div>


                    {/* NAVIGATION */}

                    <nav className="nav flex-column p-3">


                        {/* DASHBOARD */}

                        <NavLink
                            to="/admin"
                            end
                            className={({ isActive }) =>
                                `nav-link rounded mb-2 ${
                                    isActive
                                        ? "active bg-primary text-white"
                                        : "text-dark"
                                }`
                            }
                        >

                            <FaTachometerAlt className="me-2" />

                            Dashboard

                        </NavLink>


                        {/* COLLEGES */}

                        <NavLink
                            to="/admin/colleges"
                            className={({ isActive }) =>
                                `nav-link rounded mb-2 ${
                                    isActive
                                        ? "active bg-primary text-white"
                                        : "text-dark"
                                }`
                            }
                        >

                            <FaUniversity className="me-2" />

                            Colleges

                        </NavLink>


                        {/* USERS */}

                        <NavLink
                            to="/admin/users"
                            className={({ isActive }) =>
                                `nav-link rounded mb-2 ${
                                    isActive
                                        ? "active bg-primary text-white"
                                        : "text-dark"
                                }`
                            }
                        >

                            <FaUsers className="me-2" />

                            Users

                        </NavLink>


                        {/* REVIEWS */}

                        <NavLink
                            to="/admin/reviews"
                            className={({ isActive }) =>
                                `nav-link rounded mb-2 ${
                                    isActive
                                        ? "active bg-primary text-white"
                                        : "text-dark"
                                }`
                            }
                        >

                            <FaStar className="me-2" />

                            Reviews

                        </NavLink>


                    </nav>


                    {/* LOGOUT */}

                    <div className="mt-auto p-3 border-top">

                        <button
                            className="btn btn-outline-danger w-100"
                            onClick={
                                handleLogout
                            }
                        >

                            <FaSignOutAlt className="me-2" />

                            Logout

                        </button>

                    </div>


                </div>

            </aside>


            {/* =================================
                MAIN CONTENT
            ================================= */}

            <main className="flex-grow-1">

                <div className="container-fluid p-4">

                    <Outlet />

                </div>

            </main>


        </div>

    );

};


export default AdminLayout;