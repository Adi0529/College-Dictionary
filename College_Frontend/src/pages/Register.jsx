
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FaGraduationCap,
    FaUser,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaUserPlus,
    FaImage
} from "react-icons/fa";

import {
    registerUser,
    clearAuthMessage
} from "../redux/authSlice";


const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    // =====================================
    // REDUX STATE
    // =====================================

    const {
        loading,
        error,
        success,
        message
    } = useSelector(
        state => state.auth
    );


    // =====================================
    // FORM STATE
    // =====================================

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        mobile: ""

    });


    // =====================================
    // PROFILE IMAGE STATE
    // =====================================

    const [profileImage, setProfileImage] =
        useState(null);


    // =====================================
    // IMAGE PREVIEW
    // =====================================

    const [imagePreview, setImagePreview] =
        useState("");


    // =====================================
    // REDIRECT AFTER REGISTER
    // =====================================

    useEffect(() => {

        if (success) {

            const timer =
                setTimeout(() => {

                    navigate("/login");

                }, 1200);


            return () =>
                clearTimeout(timer);

        }

    }, [
        success,
        navigate
    ]);


    // =====================================
    // CLEAR MESSAGE
    // =====================================

    useEffect(() => {

        return () => {

            dispatch(
                clearAuthMessage()
            );

        };

    }, [dispatch]);


    // =====================================
    // HANDLE TEXT INPUT
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };


    // =====================================
    // HANDLE PROFILE IMAGE
    // =====================================

    const handleImageChange = (e) => {

        const file =
            e.target.files[0];


        if (!file) {

            setProfileImage(null);

            setImagePreview("");

            return;

        }


        setProfileImage(file);


        // Create preview

        const preview =
            URL.createObjectURL(file);

        setImagePreview(preview);

    };


    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = (e) => {

        e.preventDefault();


        const data =
            new FormData();


        // =================================
        // TEXT DATA
        // =================================

        data.append(
            "name",
            formData.name
        );


        data.append(
            "email",
            formData.email
        );


        data.append(
            "password",
            formData.password
        );


        data.append(
            "mobile",
            formData.mobile
        );


        // =================================
        // PROFILE IMAGE
        // IMPORTANT:
        // MUST MATCH:
        // uploadImage.single("profileImage")
        // =================================

        if (profileImage) {

            data.append(
                "profileImage",
                profileImage
            );

        }


        // =================================
        // SEND TO REDUX
        // =================================

        dispatch(
            registerUser(data)
        );

    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center py-5"
            style={{
                background:
                    "linear-gradient(135deg, #eef5ff, #ffffff)"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-6 col-md-8">


                        {/* =================================
                            CARD
                        ================================= */}

                        <div
                            className="card border-0 shadow-lg"
                        >

                            <div
                                className="card-body p-4 p-md-5"
                            >


                                {/* =================================
                                    LOGO
                                ================================= */}

                                <div
                                    className="text-center mb-4"
                                >

                                    <div
                                        className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "70px",
                                            height: "70px"
                                        }}
                                    >

                                        <FaGraduationCap
                                            size={38}
                                        />

                                    </div>


                                    <h2 className="fw-bold">

                                        Create Account

                                    </h2>


                                    <p
                                        className="text-muted mb-0"
                                    >

                                        Start discovering your
                                        perfect college

                                    </p>

                                </div>


                                {/* =================================
                                    ERROR
                                ================================= */}

                                {error && (

                                    <div
                                        className="alert alert-danger"
                                    >

                                        {error}

                                    </div>

                                )}


                                {/* =================================
                                    SUCCESS
                                ================================= */}

                                {success && (

                                    <div
                                        className="alert alert-success"
                                    >

                                        {message ||
                                            "Registration successful. Redirecting to login..."}

                                    </div>

                                )}


                                {/* =================================
                                    FORM
                                ================================= */}

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <div className="row g-3">


                                        {/* =================================
                                            NAME
                                        ================================= */}

                                        <div className="col-md-6">

                                            <label
                                                className="form-label fw-semibold"
                                            >

                                                Full Name

                                            </label>


                                            <div
                                                className="input-group"
                                            >

                                                <span
                                                    className="input-group-text bg-white"
                                                >

                                                    <FaUser
                                                        className="text-muted"
                                                    />

                                                </span>


                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Enter your name"
                                                    value={
                                                        formData.name
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                />

                                            </div>

                                        </div>


                                        {/* =================================
                                            MOBILE
                                        ================================= */}

                                        <div className="col-md-6">

                                            <label
                                                className="form-label fw-semibold"
                                            >

                                                Mobile

                                            </label>


                                            <div
                                                className="input-group"
                                            >

                                                <span
                                                    className="input-group-text bg-white"
                                                >

                                                    <FaPhone
                                                        className="text-muted"
                                                    />

                                                </span>


                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    className="form-control"
                                                    placeholder="Enter mobile number"
                                                    value={
                                                        formData.mobile
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                />

                                            </div>

                                        </div>


                                        {/* =================================
                                            EMAIL
                                        ================================= */}

                                        <div className="col-12">

                                            <label
                                                className="form-label fw-semibold"
                                            >

                                                Email Address

                                            </label>


                                            <div
                                                className="input-group"
                                            >

                                                <span
                                                    className="input-group-text bg-white"
                                                >

                                                    <FaEnvelope
                                                        className="text-muted"
                                                    />

                                                </span>


                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Enter your email"
                                                    value={
                                                        formData.email
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                />

                                            </div>

                                        </div>


                                        {/* =================================
                                            PASSWORD
                                        ================================= */}

                                        <div className="col-12">

                                            <label
                                                className="form-label fw-semibold"
                                            >

                                                Password

                                            </label>


                                            <div
                                                className="input-group"
                                            >

                                                <span
                                                    className="input-group-text bg-white"
                                                >

                                                    <FaLock
                                                        className="text-muted"
                                                    />

                                                </span>


                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Create a password"
                                                    value={
                                                        formData.password
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                />

                                            </div>

                                        </div>


                                        {/* =================================
                                            PROFILE IMAGE
                                        ================================= */}

                                        <div className="col-12">

                                            <label
                                                className="form-label fw-semibold"
                                            >

                                                Profile Image

                                            </label>


                                            <div
                                                className="input-group"
                                            >

                                                <span
                                                    className="input-group-text bg-white"
                                                >

                                                    <FaImage
                                                        className="text-muted"
                                                    />

                                                </span>


                                                <input
                                                    type="file"
                                                    name="profileImage"
                                                    className="form-control"
                                                    accept="image/jpeg,image/jpg,image/png,image/webp"
                                                    onChange={
                                                        handleImageChange
                                                    }
                                                />

                                            </div>


                                            <small
                                                className="text-muted"
                                            >

                                                JPG, JPEG, PNG or WEBP

                                            </small>

                                        </div>


                                        {/* =================================
                                            IMAGE PREVIEW
                                        ================================= */}

                                        {imagePreview && (

                                            <div
                                                className="col-12 text-center"
                                            >

                                                <div
                                                    className="mt-2"
                                                >

                                                    <img
                                                        src={
                                                            imagePreview
                                                        }
                                                        alt="Profile Preview"
                                                        className="rounded-circle border shadow-sm"
                                                        style={{
                                                            width: "100px",
                                                            height: "100px",
                                                            objectFit: "cover"
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        )}


                                        {/* =================================
                                            SUBMIT
                                        ================================= */}

                                        <div
                                            className="col-12 mt-4"
                                        >

                                            <button
                                                type="submit"
                                                className="btn btn-primary w-100 py-2 fw-semibold"
                                                disabled={loading}
                                            >

                                                {loading ? (

                                                    <>

                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                        />

                                                        Creating Account...

                                                    </>

                                                ) : (

                                                    <>

                                                        <FaUserPlus
                                                            className="me-2"
                                                        />

                                                        Create Account

                                                    </>

                                                )}

                                            </button>

                                        </div>

                                    </div>

                                </form>


                                {/* =================================
                                    LOGIN
                                ================================= */}

                                <div
                                    className="text-center mt-4"
                                >

                                    <span
                                        className="text-muted"
                                    >

                                        Already have an account?

                                    </span>{" "}


                                    <Link
                                        to="/login"
                                        className="text-primary fw-semibold text-decoration-none"
                                    >

                                        Login

                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* =================================
                            HOME
                        ================================= */}

                        <div
                            className="text-center mt-3"
                        >

                            <Link
                                to="/"
                                className="text-muted text-decoration-none"
                            >

                                ← Back to CollegeFinder

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Register;

