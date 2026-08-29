
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaUniversity,
    FaTimes,
    FaImages
} from "react-icons/fa";

import {
    getAllColleges,
    createCollege,
    updateCollege,
    deleteCollege
} from "../../redux/collegeSlice";


// =====================================
// IMAGE URL
// =====================================

const getImageUrl = (image) => {

    if (!image) {
        return "";
    }

    const cleanPath =
        image.replace(/\\/g, "/");

    return `http://localhost:5000/${cleanPath}`;

};


const AdminColleges = () => {

    const dispatch = useDispatch();


    // =====================================
    // REDUX STATE
    // =====================================

    const {
        colleges,
        loading,
        error,
        message
    } = useSelector(
        state => state.college
    );


    // =====================================
    // FORM STATE
    // =====================================

    const [showForm, setShowForm] =
        useState(false);

    const [editingId, setEditingId] =
        useState(null);


    const [formData, setFormData] = useState({

        name: "",
        location: "",
        city: "",
        state: "",
        description: "",
        fees: "",
        rating: "",
        courses: "",
        averagePackage: "",
        highestPackage: "",
        placementPercentage: ""

    });


    // =====================================
    // IMAGE STATE
    // =====================================

    const [thumbnail, setThumbnail] =
        useState(null);

    const [images, setImages] =
        useState([]);


    // =====================================
    // GET COLLEGES
    // =====================================

    useEffect(() => {

        dispatch(
            getAllColleges({
                page: 1,
                limit: 100
            })
        );

    }, [dispatch]);


    // =====================================
    // HANDLE INPUT
    // =====================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData(
            prev => ({
                ...prev,
                [name]: value
            })
        );

    };


    // =====================================
    // HANDLE THUMBNAIL
    // =====================================

    const handleThumbnailChange = (e) => {

        const file =
            e.target.files[0];

        setThumbnail(
            file || null
        );

    };


    // =====================================
    // HANDLE MULTIPLE IMAGES
    // =====================================

    const handleImagesChange = (e) => {

        const selectedFiles =
            Array.from(
                e.target.files
            );


        setImages(
            selectedFiles.slice(0, 10)
        );

    };


    // =====================================
    // RESET FORM
    // =====================================

    const resetForm = () => {

        setFormData({

            name: "",
            location: "",
            city: "",
            state: "",
            description: "",
            fees: "",
            rating: "",
            courses: "",
            averagePackage: "",
            highestPackage: "",
            placementPercentage: ""

        });


        setThumbnail(null);

        setImages([]);

        setEditingId(null);

    };


    // =====================================
    // CREATE
    // =====================================

    const handleCreate = () => {

        resetForm();

        setShowForm(true);

    };


    // =====================================
    // EDIT
    // =====================================

    const handleEdit = (college) => {

        setEditingId(
            college._id
        );


        setFormData({

            name:
                college.name || "",

            location:
                college.location || "",

            city:
                college.city || "",

            state:
                college.state || "",

            description:
                college.description || "",

            fees:
                college.fees || "",

            rating:
                college.rating || "",

            courses:
                Array.isArray(
                    college.courses
                )
                    ? college.courses.join(", ")
                    : college.courses || "",

            averagePackage:
                college.placement
                    ?.averagePackage || "",

            highestPackage:
                college.placement
                    ?.highestPackage || "",

            placementPercentage:
                college.placement
                    ?.placementPercentage || ""

        });


        setThumbnail(null);

        setImages([]);

        setShowForm(true);

    };


    // =====================================
    // CLOSE FORM
    // =====================================

    const handleClose = () => {

        setShowForm(false);

        resetForm();

    };


    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // =================================
        // CREATE FORMDATA
        // =================================

        const data =
            new FormData();


        // =================================
        // BASIC INFORMATION
        // =================================

        data.append(
            "name",
            formData.name
        );


        data.append(
            "location",
            formData.location
        );


        data.append(
            "city",
            formData.city
        );


        data.append(
            "state",
            formData.state
        );


        data.append(
            "description",
            formData.description
        );


        data.append(
            "fees",
            formData.fees
        );


        // =================================
        // RATING
        // =================================

        if (formData.rating) {

            data.append(
                "rating",
                formData.rating
            );

        }


        // =================================
        // COURSES
        // =================================

        const courseList =
            formData.courses
                .split(",")
                .map(
                    course =>
                        course.trim()
                )
                .filter(
                    course =>
                        course !== ""
                );


        data.append(
            "courses",
            JSON.stringify(courseList)
        );


        // =================================
        // PLACEMENT
        // =================================

        if (
            formData.averagePackage
        ) {

            data.append(
                "averagePackage",
                formData.averagePackage
            );

        }


        if (
            formData.highestPackage
        ) {

            data.append(
                "highestPackage",
                formData.highestPackage
            );

        }


        if (
            formData.placementPercentage
        ) {

            data.append(
                "placementPercentage",
                formData.placementPercentage
            );

        }


        // =================================
        // THUMBNAIL
        // =================================

        if (thumbnail) {

            data.append(
                "thumbnail",
                thumbnail
            );

        }


        // =================================
        // ADDITIONAL IMAGES
        // =================================

        images.forEach(
            image => {

                data.append(
                    "images",
                    image
                );

            }
        );


        // =================================
        // UPDATE COLLEGE
        // =================================

        if (editingId) {

            const result =
                await dispatch(
                    updateCollege({

                        id: editingId,

                        formData: data

                    })
                );


            if (
                updateCollege.fulfilled.match(
                    result
                )
            ) {

                handleClose();

                dispatch(
                    getAllColleges({
                        page: 1,
                        limit: 100
                    })
                );

            }

            return;

        }


        // =================================
        // CREATE COLLEGE
        // =================================

        const result =
            await dispatch(
                createCollege(data)
            );


        if (
            createCollege.fulfilled.match(
                result
            )
        ) {

            handleClose();

            dispatch(
                getAllColleges({
                    page: 1,
                    limit: 100
                })
            );

        }

    };


    // =====================================
    // DELETE
    // =====================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this college?"
            );


        if (!confirmed) {

            return;

        }


        const result =
            await dispatch(
                deleteCollege(id)
            );


        if (
            deleteCollege.fulfilled.match(
                result
            )
        ) {

            dispatch(
                getAllColleges({
                    page: 1,
                    limit: 100
                })
            );

        }

    };


    return (

        <div className="p-4">


            {/* =================================
                HEADER
            ================================= */}

            <div
                className="d-flex justify-content-between align-items-center mb-4"
            >

                <div>

                    <h2 className="fw-bold mb-1">

                        Manage Colleges

                    </h2>

                    <p className="text-muted mb-0">

                        Add, update and manage colleges.

                    </p>

                </div>


                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreate}
                >

                    <FaPlus className="me-2" />

                    Add College

                </button>

            </div>


            {/* =================================
                SUCCESS MESSAGE
            ================================= */}

            {message && (

                <div className="alert alert-success">

                    {message}

                </div>

            )}


            {/* =================================
                ERROR MESSAGE
            ================================= */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* =================================
                FORM
            ================================= */}

            {showForm && (

                <div
                    className="card border-0 shadow-sm mb-4"
                >

                    <div className="card-body p-4">


                        {/* FORM HEADER */}

                        <div
                            className="d-flex justify-content-between align-items-center mb-4"
                        >

                            <div>

                                <h5 className="fw-bold mb-1">

                                    {editingId
                                        ? "Update College"
                                        : "Add College"}

                                </h5>

                                <small className="text-muted">

                                    Enter college information and upload images.

                                </small>

                            </div>


                            <button
                                type="button"
                                className="btn btn-sm btn-light"
                                onClick={handleClose}
                            >

                                <FaTimes />

                            </button>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="row g-3">


                                {/* =================================
                                    COLLEGE NAME
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        College Name

                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter college name"
                                        value={
                                            formData.name
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* =================================
                                    LOCATION
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Location

                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        className="form-control"
                                        placeholder="Enter location"
                                        value={
                                            formData.location
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* =================================
                                    CITY
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        City

                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        placeholder="Enter city"
                                        value={
                                            formData.city
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* =================================
                                    STATE
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        State

                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        className="form-control"
                                        placeholder="Enter state"
                                        value={
                                            formData.state
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* =================================
                                    FEES
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Fees

                                    </label>

                                    <input
                                        type="number"
                                        name="fees"
                                        className="form-control"
                                        placeholder="Enter fees"
                                        value={
                                            formData.fees
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* =================================
                                    RATING
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        Rating

                                    </label>

                                    <input
                                        type="number"
                                        name="rating"
                                        className="form-control"
                                        placeholder="Example: 4.5"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={
                                            formData.rating
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* =================================
                                    THUMBNAIL
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        College Thumbnail

                                    </label>

                                    <input
                                        type="file"
                                        name="thumbnail"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={
                                            handleThumbnailChange
                                        }
                                        required={
                                            !editingId
                                        }
                                    />

                                    <small className="text-muted">

                                        Main college image. One image only.

                                    </small>


                                    {thumbnail && (

                                        <div className="mt-2">

                                            <small className="text-success">

                                                Selected: {
                                                    thumbnail.name
                                                }

                                            </small>

                                        </div>

                                    )}

                                </div>


                                {/* =================================
                                    ADDITIONAL IMAGES
                                ================================= */}

                                <div className="col-md-6">

                                    <label className="form-label fw-semibold">

                                        College Images

                                    </label>

                                    <input
                                        type="file"
                                        name="images"
                                        className="form-control"
                                        accept="image/*"
                                        multiple
                                        onChange={
                                            handleImagesChange
                                        }
                                    />

                                    <small className="text-muted">

                                        You can select up to 10 additional images.

                                    </small>


                                    {images.length > 0 && (

                                        <div className="mt-2">

                                            <small className="text-success">

                                                {images.length} image
                                                {images.length > 1
                                                    ? "s"
                                                    : ""} selected

                                            </small>

                                        </div>

                                    )}

                                </div>


                                {/* =================================
                                    COURSES
                                ================================= */}

                                <div className="col-12">

                                    <label className="form-label fw-semibold">

                                        Courses

                                    </label>

                                    <input
                                        type="text"
                                        name="courses"
                                        className="form-control"
                                        placeholder="B.Tech, MBA, MCA"
                                        value={
                                            formData.courses
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <small className="text-muted">

                                        Separate courses with commas.

                                    </small>

                                </div>


                                {/* =================================
                                    AVERAGE PACKAGE
                                ================================= */}

                                <div className="col-md-4">

                                    <label className="form-label fw-semibold">

                                        Average Package

                                    </label>

                                    <input
                                        type="number"
                                        name="averagePackage"
                                        className="form-control"
                                        placeholder="Example: 800000"
                                        value={
                                            formData.averagePackage
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* =================================
                                    HIGHEST PACKAGE
                                ================================= */}

                                <div className="col-md-4">

                                    <label className="form-label fw-semibold">

                                        Highest Package

                                    </label>

                                    <input
                                        type="number"
                                        name="highestPackage"
                                        className="form-control"
                                        placeholder="Example: 2500000"
                                        value={
                                            formData.highestPackage
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* =================================
                                    PLACEMENT
                                ================================= */}

                                <div className="col-md-4">

                                    <label className="form-label fw-semibold">

                                        Placement %

                                    </label>

                                    <input
                                        type="number"
                                        name="placementPercentage"
                                        className="form-control"
                                        placeholder="Example: 90"
                                        min="0"
                                        max="100"
                                        value={
                                            formData.placementPercentage
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                </div>


                                {/* =================================
                                    DESCRIPTION
                                ================================= */}

                                <div className="col-12">

                                    <label className="form-label fw-semibold">

                                        Description

                                    </label>

                                    <textarea
                                        name="description"
                                        rows="4"
                                        className="form-control"
                                        placeholder="Enter college description"
                                        value={
                                            formData.description
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* =================================
                                    BUTTONS
                                ================================= */}

                                <div className="col-12 pt-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Saving..."
                                            : editingId
                                            ? "Update College"
                                            : "Create College"}

                                    </button>


                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleClose}
                                        disabled={loading}
                                    >

                                        Cancel

                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {/* =================================
                COLLEGE LIST
            ================================= */}

            <div
                className="card border-0 shadow-sm"
            >

                <div className="card-body p-0">


                    {loading && !showForm ? (

                        <div className="text-center py-5">

                            <div
                                className="spinner-border text-primary"
                            />

                            <p className="text-muted mt-2 mb-0">

                                Loading colleges...

                            </p>

                        </div>

                    ) : colleges?.length === 0 ? (

                        <div className="text-center py-5">

                            <FaUniversity
                                className="fs-1 text-muted mb-3"
                            />

                            <h5 className="fw-bold">

                                No Colleges Found

                            </h5>

                            <p className="text-muted">

                                Add your first college.

                            </p>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table
                                className="table table-hover align-middle mb-0"
                            >

                                <thead className="table-light">

                                    <tr>

                                        <th className="px-4">
                                            College
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            City
                                        </th>

                                        <th>
                                            Fees
                                        </th>

                                        <th>
                                            Rating
                                        </th>

                                        <th>
                                            Images
                                        </th>

                                        <th className="text-center">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {colleges.map(
                                        college => (

                                            <tr
                                                key={
                                                    college._id
                                                }
                                            >


                                                {/* =====================
                                                    COLLEGE
                                                ===================== */}

                                                <td className="px-4">

                                                    <div
                                                        className="d-flex align-items-center"
                                                    >

                                                        {college.thumbnail ? (

                                                            <img
                                                                src={
                                                                    getImageUrl(
                                                                        college.thumbnail
                                                                    )
                                                                }
                                                                alt={
                                                                    college.name
                                                                }
                                                                className="rounded me-3"
                                                                style={{
                                                                    width: "55px",
                                                                    height: "55px",
                                                                    objectFit: "cover"
                                                                }}
                                                            />

                                                        ) : (

                                                            <div
                                                                className="bg-primary bg-opacity-10 text-primary rounded d-flex align-items-center justify-content-center me-3"
                                                                style={{
                                                                    width: "55px",
                                                                    height: "55px"
                                                                }}
                                                            >

                                                                <FaUniversity />

                                                            </div>

                                                        )}


                                                        <span className="fw-semibold">

                                                            {
                                                                college.name
                                                            }

                                                        </span>

                                                    </div>

                                                </td>


                                                {/* =====================
                                                    LOCATION
                                                ===================== */}

                                                <td>

                                                    {
                                                        college.location ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* =====================
                                                    CITY
                                                ===================== */}

                                                <td>

                                                    {
                                                        college.city ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* =====================
                                                    FEES
                                                ===================== */}

                                                <td>

                                                    {college.fees
                                                        ? `₹${college.fees}`
                                                        : "N/A"}

                                                </td>


                                                {/* =====================
                                                    RATING
                                                ===================== */}

                                                <td>

                                                    <span
                                                        className="badge bg-warning text-dark"
                                                    >

                                                        ⭐ {
                                                            college.rating ||
                                                            0
                                                        }

                                                    </span>

                                                </td>


                                                {/* =====================
                                                    IMAGE COUNT
                                                ===================== */}

                                                <td>

                                                    <div
                                                        className="d-flex align-items-center text-muted"
                                                    >

                                                        <FaImages
                                                            className="me-2"
                                                        />

                                                        {
                                                            college.images
                                                                ?.length ||
                                                            0
                                                        }

                                                    </div>

                                                </td>


                                                {/* =====================
                                                    ACTIONS
                                                ===================== */}

                                                <td className="text-center">

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={() =>
                                                            handleEdit(
                                                                college
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >

                                                        <FaEdit />

                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleDelete(
                                                                college._id
                                                            )
                                                        }
                                                        disabled={loading}
                                                    >

                                                        <FaTrash />

                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};


export default AdminColleges;

