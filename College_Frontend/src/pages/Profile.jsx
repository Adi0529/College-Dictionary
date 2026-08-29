import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCamera,
    FaLock,
    FaSave
} from "react-icons/fa";

import {
    getProfile,
    updateProfile,
    changePassword,
    clearAuthMessage
} from "../redux/authSlice";


const Profile = () => {

    const dispatch = useDispatch();


    const {
        user,
        loading,
        error,
        success,
        message
    } = useSelector(
        state => state.auth
    );


    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [mobile, setMobile] = useState("");

    const [profileImage, setProfileImage] = useState(null);


    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");


    // =====================================
    // GET PROFILE
    // =====================================

    useEffect(() => {

        dispatch(getProfile());

    }, [dispatch]);


    // =====================================
    // SET USER DATA
    // =====================================

    useEffect(() => {

        if (user) {

            setName(user.name || "");

            setEmail(user.email || "");

            setMobile(user.mobile || "");

        }

    }, [user]);


    // =====================================
    // CLEAR MESSAGE
    // =====================================

    useEffect(() => {

        if (success || error) {

            const timer = setTimeout(() => {

                dispatch(clearAuthMessage());

            }, 3000);

            return () => clearTimeout(timer);

        }

    }, [success, error, dispatch]);


    // =====================================
    // UPDATE PROFILE
    // =====================================

    const handleProfileUpdate = (e) => {

        e.preventDefault();


        const formData = new FormData();

        formData.append(
            "name",
            name
        );

        formData.append(
            "email",
            email
        );

        formData.append(
            "mobile",
            mobile
        );


        if (profileImage) {

            formData.append(
                "profileImage",
                profileImage
            );

        }


        dispatch(
            updateProfile(formData)
        );

    };


    // =====================================
    // CHANGE PASSWORD
    // =====================================

    const handlePasswordChange = (e) => {

        e.preventDefault();


        if (newPassword !== confirmPassword) {

            return;

        }


        dispatch(
            changePassword({
                currentPassword,
                newPassword
            })
        );


        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading && !user) {

        return (

            <div className="container py-5 text-center">

                <div
                    className="spinner-border text-primary"
                    role="status"
                />

                <p className="mt-3">

                    Loading profile...

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

                        My Profile

                    </h2>

                    <p className="text-muted">

                        Manage your account information.

                    </p>

                </div>


                {/* =================================
                    SUCCESS
                ================================= */}

                {success && message && (

                    <div className="alert alert-success">

                        {message}

                    </div>

                )}


                {/* =================================
                    ERROR
                ================================= */}

                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                <div className="row g-4">


                    {/* =================================
                        PROFILE INFORMATION
                    ================================= */}

                    <div className="col-lg-7">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">

                                    <FaUser className="text-primary me-2" />

                                    Personal Information

                                </h4>


                                <form
                                    onSubmit={
                                        handleProfileUpdate
                                    }
                                >


                                    {/* PROFILE IMAGE */}

                                    <div className="text-center mb-4">

                                        <div
                                            className="position-relative d-inline-block"
                                        >

                                            {user?.profileImage ? (

                                                <img
                                                    src={
                                                        user.profileImage
                                                    }
                                                    alt="Profile"
                                                    className="rounded-circle"
                                                    style={{
                                                        width: "120px",
                                                        height: "120px",
                                                        objectFit: "cover"
                                                    }}
                                                />

                                            ) : (

                                                <div
                                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "120px",
                                                        height: "120px",
                                                        fontSize: "45px"
                                                    }}
                                                >

                                                    <FaUser />

                                                </div>

                                            )}


                                            <label
                                                htmlFor="profileImage"
                                                className="position-absolute bottom-0 end-0 bg-white border rounded-circle p-2"
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                            >

                                                <FaCamera />

                                            </label>


                                            <input
                                                id="profileImage"
                                                type="file"
                                                className="d-none"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    setProfileImage(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* NAME */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Name

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <FaUser />

                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Email

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <FaEnvelope />

                                            </span>

                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>


                                    {/* MOBILE */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Mobile

                                        </label>

                                        <div className="input-group">

                                            <span className="input-group-text">

                                                <FaPhone />

                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                value={mobile}
                                                onChange={(e) =>
                                                    setMobile(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                    </div>


                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >

                                        <FaSave className="me-2" />

                                        Update Profile

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>


                    {/* =================================
                        CHANGE PASSWORD
                    ================================= */}

                    <div className="col-lg-5">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">

                                    <FaLock className="text-primary me-2" />

                                    Change Password

                                </h4>


                                <form
                                    onSubmit={
                                        handlePasswordChange
                                    }
                                >


                                    {/* CURRENT PASSWORD */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Current Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={
                                                currentPassword
                                            }
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    {/* NEW PASSWORD */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            New Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={
                                                newPassword
                                            }
                                            onChange={(e) =>
                                                setNewPassword(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    {/* CONFIRM */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Confirm New Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            value={
                                                confirmPassword
                                            }
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>


                                    <button
                                        type="submit"
                                        className="btn btn-dark w-100"
                                        disabled={loading}
                                    >

                                        <FaLock className="me-2" />

                                        Change Password

                                    </button>

                                </form>

                            </div>

                        </div>


                        {/* ACCOUNT INFO */}

                        <div className="card border-0 shadow-sm mt-4">

                            <div className="card-body p-4">

                                <h5 className="fw-bold">

                                    Account Information

                                </h5>

                                <hr />

                                <p className="mb-2">

                                    <strong>Role:</strong>{" "}

                                    {user?.role || "User"}

                                </p>

                                <p className="mb-0">

                                    <strong>Email:</strong>{" "}

                                    {user?.email}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Profile;