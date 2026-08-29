import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import axiosInstance from "../services/axiosInstance";


// =====================================
// GET ALL COLLEGES
// =====================================

export const getAllColleges = createAsyncThunk(

    "college/getAll",

    async (params, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    "/college/getall",
                    {
                        params
                    }
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get colleges"
            );

        }

    }

);


// =====================================
// GET SINGLE COLLEGE
// =====================================

export const getCollege = createAsyncThunk(

    "college/getOne",

    async (id, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    `/college/get/${id}`
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get college"
            );

        }

    }

);


// =====================================
// CREATE COLLEGE
// =====================================

export const createCollege = createAsyncThunk(

    "college/create",

    async (formData, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.post(
                    "/college/create",
                    formData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create college"
            );

        }

    }

);


// =====================================
// UPDATE COLLEGE
// =====================================

export const updateCollege = createAsyncThunk(

    "college/update",

    async (
        { id, formData },
        { rejectWithValue }
    ) => {

        try {

            const response =
                await axiosInstance.put(
                    `/college/update/${id}`,
                    formData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update college"
            );

        }

    }

);


// =====================================
// DELETE COLLEGE
// =====================================

export const deleteCollege = createAsyncThunk(

    "college/delete",

    async (id, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.delete(
                    `/college/delete/${id}`
                );

            return {
                id,
                ...response.data
            };

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete college"
            );

        }

    }

);


// =====================================
// COMPARE COLLEGES
// =====================================

export const compareColleges = createAsyncThunk(

    "college/compare",

    async (ids, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    "/college/compare",
                    {
                        params: {
                            ids: ids.join(",")
                        }
                    }
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to compare colleges"
            );

        }

    }

);


// =====================================
// INITIAL STATE
// =====================================

const initialState = {

    colleges: [],

    college: null,

    comparedColleges: [],

    loading: false,

    error: null,

    message: "",

    total: 0,

    currentPage: 1,

    totalPages: 0

};


// =====================================
// SLICE
// =====================================

const collegeSlice = createSlice({

    name: "college",

    initialState,

    reducers: {

        clearCollege: (state) => {

            state.college = null;

        },

        clearCompare: (state) => {

            state.comparedColleges = [];

        },

        clearCollegeError: (state) => {

            state.error = null;

        }

    },


    extraReducers: (builder) => {


        // =================================
        // GET ALL COLLEGES
        // =================================

        builder

            .addCase(
                getAllColleges.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getAllColleges.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.colleges =
                        action.payload.colleges;

                    state.total =
                        action.payload.total;

                    state.currentPage =
                        action.payload.currentPage;

                    state.totalPages =
                        action.payload.totalPages;

                }
            )

            .addCase(
                getAllColleges.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // GET COLLEGE
        // =================================

        builder

            .addCase(
                getCollege.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getCollege.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.college =
                        action.payload.college;

                }
            )

            .addCase(
                getCollege.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // CREATE COLLEGE
        // =================================

        builder

            .addCase(
                createCollege.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                createCollege.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                createCollege.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // UPDATE COLLEGE
        // =================================

        builder

            .addCase(
                updateCollege.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                updateCollege.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.message =
                        action.payload.message;

                    state.college =
                        action.payload.college;

                }
            )

            .addCase(
                updateCollege.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // DELETE COLLEGE
        // =================================

        builder

            .addCase(
                deleteCollege.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                deleteCollege.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.colleges =
                        state.colleges.filter(
                            college =>
                                college._id !==
                                action.payload.id
                        );

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                deleteCollege.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // COMPARE
        // =================================

        builder

            .addCase(
                compareColleges.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                compareColleges.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.comparedColleges =
                        action.payload.colleges;

                }
            )

            .addCase(
                compareColleges.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    }

});


export const {
    clearCollege,
    clearCompare,
    clearCollegeError
} = collegeSlice.actions;


export default collegeSlice.reducer;