import { Link } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaStar,
    FaRupeeSign,
    FaHeart,
    FaBalanceScale
} from "react-icons/fa";


function CollegeCard({
    college,
    onSave,
    onCompare,
    saved = false
}) {


    return (

        <div className="card border-0 shadow-sm h-100">

            <div className="position-relative">

                <img
                    src={
                        college.thumbnail
                            ? `https://college-dictionary.onrender.com/${college.thumbnail}`
                            : "https://via.placeholder.com/600x350"
                    }
                    className="card-img-top"
                    style={{
                        height: "210px",
                        objectFit: "cover"
                    }}
                    alt={college.name}
                />


                <span
                    className="position-absolute top-0 end-0 m-3 badge bg-warning text-dark"
                >

                    <FaStar className="me-1" />

                    {college.rating || 0}

                </span>

            </div>


            <div className="card-body">

                <h5 className="card-title fw-bold">

                    {college.name}

                </h5>


                <p className="text-muted mb-2">

                    <FaMapMarkerAlt
                        className="text-danger me-2"
                    />

                    {college.city}, {college.state}

                </p>


                <p className="mb-2">

                    <FaRupeeSign
                        className="text-success me-1"
                    />

                    <strong>
                        {college.fees?.toLocaleString()}
                    </strong>

                    <span className="text-muted">
                        {" "}Annual Fees
                    </span>

                </p>


                <p className="text-muted small">

                    {college.description
                        ?.substring(0, 100)}

                    ...

                </p>

            </div>


            <div className="card-footer bg-white border-0 pb-3">

                <div className="d-flex gap-2">

                    <Link
                        to={`/college/${college._id}`}
                        className="btn btn-primary flex-grow-1"
                    >

                        View Details

                    </Link>


                    <button
                        className={`btn ${
                            saved
                                ? "btn-danger"
                                : "btn-outline-danger"
                        }`}
                        onClick={() =>
                            onSave?.(college._id)
                        }
                    >

                        <FaHeart />

                    </button>


                    <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                            onCompare?.(college)
                        }
                    >

                        <FaBalanceScale />

                    </button>

                </div>

            </div>

        </div>

    );

}


export default CollegeCard;