import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getAllColleges
} from "../redux/collegeSlice";


import Loading from "../components/Loading";
import CollegeCard from "../components/CollegeCard";
import FilterSidebar from "../components/FilterSidebar";
import Pagination from "../components/Pagination";


const Colleges = () => {

    const dispatch = useDispatch();


    const {
        colleges,
        loading,
        totalPages,
        currentPage
    } = useSelector(
        (state) => state.college
    );


    const [search, setSearch] = useState("");

    const [filters, setFilters] = useState({

        city: "",
        state: "",
        minFees: "",
        maxFees: "",
        minRating: "",
        sort: ""

    });


    const [page, setPage] =
        useState(1);


    // =====================================
    // GET COLLEGES
    // =====================================

    useEffect(() => {

        dispatch(
            getAllColleges({

                search,

                city: filters.city,

                state: filters.state,

                minFees: filters.minFees,

                maxFees: filters.maxFees,

                minRating: filters.minRating,

                sort: filters.sort,

                page,

                limit: 10

            })
        );

    }, [
        dispatch,
        search,
        filters,
        page
    ]);


    // =====================================
    // SEARCH
    // =====================================

    const handleSearch = (e) => {

        setSearch(e.target.value);

        setPage(1);

    };


    // =====================================
    // FILTER
    // =====================================

    const handleFilter = (newFilters) => {

        setFilters(newFilters);

        setPage(1);

    };


    // =====================================
    // PAGE CHANGE
    // =====================================

    const handlePageChange = (newPage) => {

        setPage(newPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    return (

        <>

            


            <div className="container py-4">


                {/* ================================= */}
                {/* HEADER */}
                {/* ================================= */}

                <div className="mb-4">

                    <h2 className="fw-bold">

                        Find Your Perfect College

                    </h2>

                    <p className="text-muted">

                        Search and compare colleges
                        based on your preferences.

                    </p>

                </div>


                {/* ================================= */}
                {/* SEARCH */}
                {/* ================================= */}

                <div className="mb-4">

                    <input

                        type="text"

                        className="form-control form-control-lg"

                        placeholder="Search college, city or state..."

                        value={search}

                        onChange={handleSearch}

                    />

                </div>


                <div className="row">


                    {/* ================================= */}
                    {/* FILTER SIDEBAR */}
                    {/* ================================= */}

                    <div className="col-lg-3 mb-4">

                        <FilterSidebar

                            filters={filters}

                            onFilter={handleFilter}

                        />

                    </div>


                    {/* ================================= */}
                    {/* COLLEGES */}
                    {/* ================================= */}

                    <div className="col-lg-9">


                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <h5 className="mb-0">

                                Colleges

                            </h5>


                            <span className="text-muted">

                                {colleges?.length || 0}
                                colleges

                            </span>

                        </div>


                        {loading ? (

                            <Loading />

                        ) : colleges?.length > 0 ? (

                            <div className="row">

                                {colleges.map(
                                    (college) => (

                                        <div
                                            className="col-md-6 mb-4"
                                            key={college._id}
                                        >

                                            <CollegeCard
                                                college={college}
                                            />

                                        </div>

                                    )
                                )}

                            </div>

                        ) : (

                            <div className="text-center py-5">

                                <h5>
                                    No colleges found
                                </h5>

                                <p className="text-muted">

                                    Try changing your
                                    search or filters.

                                </p>

                            </div>

                        )}


                        {/* ================================= */}
                        {/* PAGINATION */}
                        {/* ================================= */}

                        {totalPages > 1 && (

                            <Pagination

                                currentPage={
                                    currentPage || page
                                }

                                totalPages={
                                    totalPages
                                }

                                onPageChange={
                                    handlePageChange
                                }

                            />

                        )}

                    </div>

                </div>

            </div>



        </>

    );

};


export default Colleges;