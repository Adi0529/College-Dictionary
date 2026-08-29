import { Link } from "react-router-dom";

import {
    FaSearch,
    FaBalanceScale,
    FaHeart,
    FaStar,
    FaArrowRight
} from "react-icons/fa";

import SearchBar from "../components/SearchBar";


function Home() {


    return (

        <>

            {/* HERO */}

            <section
                className="bg-primary text-white py-5"
            >

                <div className="container py-5">

                    <div className="row align-items-center">

                        <div className="col-lg-7">

                            <span className="badge bg-white text-primary mb-3 px-3 py-2">

                                🎓 Your Future Starts Here

                            </span>


                            <h1 className="display-4 fw-bold">

                                Find the Right College
                                for Your Future

                            </h1>


                            <p className="lead mt-3">

                                Search thousands of colleges,
                                compare fees and placements,
                                read reviews and make the
                                right decision.

                            </p>


                            <div className="mt-4">

                                <SearchBar
                                    onSearch={(value) =>
                                        window.location.href =
                                            `/colleges?search=${value}`
                                    }
                                />

                            </div>

                        </div>


                        <div className="col-lg-5 text-center mt-5 mt-lg-0">

                            <div className="bg-white text-dark rounded-4 shadow p-4">

                                <FaSearch
                                    size={60}
                                    className="text-primary mb-3"
                                />

                                <h4 className="fw-bold">
                                    Explore Colleges
                                </h4>

                                <p className="text-muted">
                                    Discover colleges based
                                    on your preferences.
                                </p>

                                <Link
                                    to="/colleges"
                                    className="btn btn-primary"
                                >

                                    Explore Now

                                    <FaArrowRight
                                        className="ms-2"
                                    />

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* FEATURES */}

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="text-center mb-5">

                        <h2 className="fw-bold">
                            Everything You Need
                        </h2>

                        <p className="text-muted">
                            Make smarter college decisions
                        </p>

                    </div>


                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <FaSearch
                                    size={45}
                                    className="text-primary mx-auto mb-3"
                                />

                                <h5 className="fw-bold">
                                    Find Colleges
                                </h5>

                                <p className="text-muted">
                                    Search and filter colleges
                                    by location, fees and rating.
                                </p>

                                <Link
                                    to="/colleges"
                                    className="btn btn-outline-primary"
                                >
                                    Explore Colleges
                                </Link>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <FaBalanceScale
                                    size={45}
                                    className="text-success mx-auto mb-3"
                                />

                                <h5 className="fw-bold">
                                    Compare Colleges
                                </h5>

                                <p className="text-muted">
                                    Compare fees, ratings,
                                    location and placements.
                                </p>

                                <Link
                                    to="/compare"
                                    className="btn btn-outline-success"
                                >
                                    Compare Now
                                </Link>

                            </div>

                        </div>


                        <div className="col-md-4">

                            <div className="card border-0 shadow-sm h-100 text-center p-4">

                                <FaHeart
                                    size={45}
                                    className="text-danger mx-auto mb-3"
                                />

                                <h5 className="fw-bold">
                                    Save Your Choices
                                </h5>

                                <p className="text-muted">
                                    Save colleges and
                                    comparisons for later.
                                </p>

                                <Link
                                    to="/saved-colleges"
                                    className="btn btn-outline-danger"
                                >
                                    View Saved
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}

            <section className="py-5">

                <div className="container">

                    <div className="bg-dark text-white rounded-4 p-5 text-center">

                        <FaStar
                            size={40}
                            className="mb-3 text-warning"
                        />

                        <h2 className="fw-bold">
                            Start Your College Journey
                        </h2>

                        <p className="text-secondary">
                            Explore colleges and find
                            the one that's right for you.
                        </p>

                        <Link
                            to="/colleges"
                            className="btn btn-light px-4"
                        >
                            Explore Colleges
                        </Link>

                    </div>

                </div>

            </section>

        </>

    );

}


export default Home;