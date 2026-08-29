import {
    FaTachometerAlt,
    FaUniversity,
    FaUsers,
    FaStar,
    FaSignOutAlt
} from "react-icons/fa";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../redux/authSlice";


const AdminSidebar = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleLogout = () => {

        dispatch(logout());

        navigate("/");

    };


    return (

        <div className="d-flex flex-column h-100">


            {/* LOGO */}

            <div className="p-4 border-bottom">

                <h4 className="fw-bold mb-0">

                    Admin Panel

                </h4>

            </div>


            {/* MENU */}

            <div className="nav flex-column p-3">


                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `nav-link mb-2 ${
                            isActive
                                ? "active bg-primary text-white"
                                : "text-dark"
                        }`
                    }
                >

                    <FaTachometerAlt className="me-2" />

                    Dashboard

                </NavLink>


                <NavLink
                    to="/admin/colleges"
                    className={({ isActive }) =>
                        `nav-link mb-2 ${
                            isActive
                                ? "active bg-primary text-white"
                                : "text-dark"
                        }`
                    }
                >

                    <FaUniversity className="me-2" />

                    Colleges

                </NavLink>


                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `nav-link mb-2 ${
                            isActive
                                ? "active bg-primary text-white"
                                : "text-dark"
                        }`
                    }
                >

                    <FaUsers className="me-2" />

                    Users

                </NavLink>


                <NavLink
                    to="/admin/reviews"
                    className={({ isActive }) =>
                        `nav-link mb-2 ${
                            isActive
                                ? "active bg-primary text-white"
                                : "text-dark"
                        }`
                    }
                >

                    <FaStar className="me-2" />

                    Reviews

                </NavLink>

            </div>


            {/* LOGOUT */}

            <div className="mt-auto p-3 border-top">

                <button
                    className="btn btn-outline-danger w-100"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt className="me-2" />

                    Logout

                </button>

            </div>

        </div>

    );

};


export default AdminSidebar;