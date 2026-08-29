import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaSearch
} from "react-icons/fa";


const SearchBar = () => {

    const navigate = useNavigate();


    const [search, setSearch] =
        useState("");


    // =====================================
    // SEARCH
    // =====================================

    const handleSearch = (e) => {

        e.preventDefault();


        if (!search.trim()) {

            navigate("/colleges");

            return;

        }


        navigate(
            `/colleges?search=${encodeURIComponent(
                search.trim()
            )}`
        );

    };


    return (

        <form
            onSubmit={handleSearch}
            className="w-100"
        >

            <div
                className="bg-white rounded-3 shadow p-2"
            >

                <div className="row g-2">


                    {/* =================================
                        SEARCH INPUT
                    ================================= */}

                    <div className="col-md-9">

                        <div className="input-group">

                            <span
                                className="input-group-text bg-white border-0"
                            >

                                <FaSearch
                                    className="text-primary"
                                />

                            </span>


                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search colleges by name, city or course..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* =================================
                        SEARCH BUTTON
                    ================================= */}

                    <div className="col-md-3">

                        <button
                            type="submit"
                            className="btn btn-primary w-100 h-100"
                        >

                            <FaSearch
                                className="me-2"
                            />

                            Search

                        </button>

                    </div>

                </div>

            </div>

        </form>

    );

};


export default SearchBar;