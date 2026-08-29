import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FaGraduationCap,
    FaEnvelope,
    FaLock,
    FaSignInAlt
} from "react-icons/fa";

import {
    loginUser,
    clearAuthMessage
} from "../redux/authSlice";


const Login = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const {
        loading,
        error,
        isLoggedIn,
        user
    } = useSelector(
        state => state.auth
    );


    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });


    // =====================================
    // REDIRECT AFTER LOGIN
    // =====================================

    useEffect(() => {

        if (isLoggedIn) {

            if (user?.role === "Admin") {

                navigate("/admin");

            } else {

                navigate("/");

            }

        }

    }, [
        isLoggedIn,
        user,
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
    // HANDLE CHANGE
    // =====================================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value

        });

    };


    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(
            loginUser(formData)
        );

    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center"
            style={{
                background:
                    "linear-gradient(135deg, #eef5ff, #ffffff)"
            }}
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-5 col-md-7">


                        {/* CARD */}

                        <div className="card border-0 shadow-lg">

                            <div className="card-body p-4 p-md-5">


                                {/* LOGO */}

                                <div className="text-center mb-4">

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

                                        Welcome Back

                                    </h2>


                                    <p className="text-muted mb-0">

                                        Login to continue exploring colleges

                                    </p>

                                </div>


                                {/* ERROR */}

                                {error && (

                                    <div className="alert alert-danger">

                                        {error}

                                    </div>

                                )}


                                {/* FORM */}

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >


                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label className="form-label fw-semibold">

                                            Email Address

                                        </label>


                                        <div className="input-group">

                                            <span className="input-group-text bg-white">

                                                <FaEnvelope className="text-muted" />

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


                                    {/* PASSWORD */}

                                    <div className="mb-4">

                                        <label className="form-label fw-semibold">

                                            Password

                                        </label>


                                        <div className="input-group">

                                            <span className="input-group-text bg-white">

                                                <FaLock className="text-muted" />

                                            </span>


                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter your password"
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


                                    {/* BUTTON */}

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

                                                Logging in...

                                            </>

                                        ) : (

                                            <>
                                                <FaSignInAlt className="me-2" />

                                                Login

                                            </>

                                        )}

                                    </button>


                                </form>


                                {/* REGISTER */}

                                <div className="text-center mt-4">

                                    <span className="text-muted">

                                        Don't have an account?

                                    </span>{" "}

                                    <Link
                                        to="/register"
                                        className="text-primary fw-semibold text-decoration-none"
                                    >

                                        Create Account

                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* HOME */}

                        <div className="text-center mt-3">

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


export default Login;