import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FaUsers,
    FaUser,
    FaTrash,
    FaEnvelope,
    FaPhone
} from "react-icons/fa";


// We need these actions from authSlice
import {
    getAllUsers,
    deleteUser
} from "../../redux/authSlice";


const AdminUsers = () => {

    const dispatch = useDispatch();


    const {
        users,
        loading,
        error
    } = useSelector(
        state => state.auth
    );


    // =====================================
    // GET ALL USERS
    // =====================================

    useEffect(() => {

        dispatch(getAllUsers());

    }, [dispatch]);


    // =====================================
    // DELETE USER
    // =====================================

    const handleDelete = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );


        if (!confirmDelete) {

            return;

        }


        dispatch(
            deleteUser(id)
        );

    };


    return (

        <div>


            {/* =================================
                HEADER
            ================================= */}

            <div className="mb-4">

                <h2 className="fw-bold">

                    Manage Users

                </h2>

                <p className="text-muted">

                    View and manage registered users.

                </p>

            </div>


            {/* =================================
                USER COUNT
            ================================= */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card border-0 shadow-sm">

                        <div className="card-body">

                            <div className="d-flex align-items-center">

                                <div
                                    className="bg-primary bg-opacity-10 text-primary rounded p-3 me-3"
                                >

                                    <FaUsers className="fs-4" />

                                </div>


                                <div>

                                    <p className="text-muted mb-1">

                                        Total Users

                                    </p>

                                    <h3 className="fw-bold mb-0">

                                        {users?.length || 0}

                                    </h3>

                                </div>

                            </div>

                        </div>

                    </div>

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
                USERS TABLE
            ================================= */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>

                                    <th className="px-4">

                                        User

                                    </th>

                                    <th>

                                        Email

                                    </th>

                                    <th>

                                        Mobile

                                    </th>

                                    <th>

                                        Role

                                    </th>

                                    <th className="text-center">

                                        Action

                                    </th>

                                </tr>

                            </thead>


                            <tbody>


                                {/* =================================
                                    LOADING
                                ================================= */}

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-5"
                                        >

                                            <div
                                                className="spinner-border text-primary"
                                            />

                                            <p className="text-muted mt-2 mb-0">

                                                Loading users...

                                            </p>

                                        </td>

                                    </tr>

                                ) : users?.length === 0 ? (

                                    /* =================================
                                       NO USERS
                                    ================================= */

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center py-5"
                                        >

                                            <FaUsers
                                                className="fs-1 text-muted mb-3"
                                            />

                                            <p className="text-muted mb-0">

                                                No users found.

                                            </p>

                                        </td>

                                    </tr>

                                ) : (

                                    /* =================================
                                       USERS
                                    ================================= */

                                    users?.map(user => (

                                        <tr
                                            key={
                                                user._id
                                            }
                                        >

                                            {/* USER */}

                                            <td className="px-4">

                                                <div className="d-flex align-items-center">


                                                    {user.profileImage ? (

                                                        <img
                                                            src={
                                                                `http://localhost:5000/${user.profileImage}`
                                                            }
                                                            alt={
                                                                user.name
                                                            }
                                                            className="rounded-circle me-3"
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                                objectFit: "cover"
                                                            }}
                                                        />

                                                    ) : (

                                                        <div
                                                            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                                            style={{
                                                                width: "50px",
                                                                height: "50px"
                                                            }}
                                                        >

                                                            <FaUser />

                                                        </div>

                                                    )}


                                                    <div>

                                                        <h6 className="fw-bold mb-1">

                                                            {
                                                                user.name
                                                            }

                                                        </h6>

                                                        <small className="text-muted">

                                                            User ID:{" "}

                                                            {
                                                                user._id
                                                                    ?.slice(-6)
                                                            }

                                                        </small>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* EMAIL */}

                                            <td>

                                                <FaEnvelope
                                                    className="text-muted me-2"
                                                />

                                                {
                                                    user.email
                                                }

                                            </td>


                                            {/* MOBILE */}

                                            <td>

                                                <FaPhone
                                                    className="text-muted me-2"
                                                />

                                                {
                                                    user.mobile ||
                                                    "N/A"
                                                }

                                            </td>


                                            {/* ROLE */}

                                            <td>

                                                <span
                                                    className={
                                                        user.role === "Admin"
                                                            ? "badge bg-danger"
                                                            : "badge bg-primary"
                                                    }
                                                >

                                                    {
                                                        user.role
                                                    }

                                                </span>

                                            </td>


                                            {/* DELETE */}

                                            <td className="text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        handleDelete(
                                                            user._id
                                                        )
                                                    }
                                                >

                                                    <FaTrash />

                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default AdminUsers;