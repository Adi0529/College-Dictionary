import { FaFilter } from "react-icons/fa";


function FilterSidebar({
    filters,
    setFilters
}) {


    const handleChange = (field, value) => {

        setFilters({

            ...filters,

            [field]: value

        });

    };


    return (

        <div className="card border-0 shadow-sm">

            <div className="card-body">

                <h5 className="fw-bold mb-4">

                    <FaFilter className="me-2 text-primary" />

                    Filters

                </h5>


                <label className="form-label fw-semibold">
                    State
                </label>

                <select
                    className="form-select mb-3"
                    value={filters.state}
                    onChange={(e) =>
                        handleChange(
                            "state",
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All States
                    </option>

                    <option value="Maharashtra">
                        Maharashtra
                    </option>

                    <option value="Karnataka">
                        Karnataka
                    </option>

                    <option value="Delhi">
                        Delhi
                    </option>

                    <option value="Tamil Nadu">
                        Tamil Nadu
                    </option>

                </select>


                <label className="form-label fw-semibold">
                    City
                </label>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter city"
                    value={filters.city}
                    onChange={(e) =>
                        handleChange(
                            "city",
                            e.target.value
                        )
                    }
                />


                <label className="form-label fw-semibold">
                    Minimum Fees
                </label>

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="₹ Minimum"
                    value={filters.minFees}
                    onChange={(e) =>
                        handleChange(
                            "minFees",
                            e.target.value
                        )
                    }
                />


                <label className="form-label fw-semibold">
                    Maximum Fees
                </label>

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="₹ Maximum"
                    value={filters.maxFees}
                    onChange={(e) =>
                        handleChange(
                            "maxFees",
                            e.target.value
                        )
                    }
                />


                <label className="form-label fw-semibold">
                    Minimum Rating
                </label>

                <select
                    className="form-select"
                    value={filters.minRating}
                    onChange={(e) =>
                        handleChange(
                            "minRating",
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Any Rating
                    </option>

                    <option value="4">
                        ⭐ 4+
                    </option>

                    <option value="4.5">
                        ⭐ 4.5+
                    </option>

                </select>

            </div>

        </div>

    );

}


export default FilterSidebar;