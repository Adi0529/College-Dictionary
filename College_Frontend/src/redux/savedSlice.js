import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import axiosInstance from "../services/axiosInstance";


// =====================================
// SAVE COLLEGE
// =====================================

export const saveCollege = createAsyncThunk(

    "saved/saveCollege",

    async (collegeId, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.post(
                    `/saved/add/${collegeId}`
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to save college"
            );

        }

    }

);


// =====================================
// GET SAVED COLLEGES
// =====================================

export const getSavedColleges = createAsyncThunk(

    "saved/getSavedColleges",

    async (_, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    "/saved/get"
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get saved colleges"
            );

        }

    }

);


// =====================================
// CHECK SAVED COLLEGE
// =====================================

export const checkSavedCollege = createAsyncThunk(

    "saved/checkSavedCollege",

    async (collegeId, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    `/saved/check/${collegeId}`
                );

            return {
                collegeId,
                saved: response.data.saved
            };

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to check saved college"
            );

        }

    }

);


// =====================================
// REMOVE SAVED COLLEGE
// =====================================

export const removeSavedCollege = createAsyncThunk(

    "saved/removeSavedCollege",

    async (collegeId, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.delete(
                    `/saved/remove/${collegeId}`
                );

            return {
                collegeId,
                ...response.data
            };

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to remove saved college"
            );

        }

    }

);


// =====================================
// SAVE COMPARISON
// =====================================

export const saveComparison = createAsyncThunk(

    "saved/saveComparison",

    async (ids, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.post(
                    "/saved-comparison/add",
                    {
                        ids
                    }
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to save comparison"
            );

        }

    }

);


// =====================================
// GET SAVED COMPARISONS
// =====================================

export const getSavedComparisons = createAsyncThunk(

    "saved/getSavedComparisons",

    async (_, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    "/saved-comparison/get"
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get saved comparisons"
            );

        }

    }

);


// =====================================
// GET SINGLE SAVED COMPARISON
// =====================================

export const getSavedComparison = createAsyncThunk(

    "saved/getSavedComparison",

    async (id, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    `/saved-comparison/get/${id}`
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get saved comparison"
            );

        }

    }

);


// =====================================
// DELETE SAVED COMPARISON
// =====================================

export const deleteSavedComparison = createAsyncThunk(

    "saved/deleteSavedComparison",

    async (id, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.delete(
                    `/saved-comparison/delete/${id}`
                );

            return {
                id,
                ...response.data
            };

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete saved comparison"
            );

        }

    }

);


// =====================================
// INITIAL STATE
// =====================================

const initialState = {

    savedColleges: [],

    savedComparisons: [],

    savedStatus: {},

    selectedComparison: null,

    loading: false,

    error: null,

    message: ""

};


// =====================================
// SLICE
// =====================================

const savedSlice = createSlice({

    name: "saved",

    initialState,

    reducers: {

        clearSavedError: (state) => {

            state.error = null;

        }

    },


    extraReducers: (builder) => {


        // =================================
        // SAVE COLLEGE
        // =================================

        builder

            .addCase(
                saveCollege.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                saveCollege.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                saveCollege.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // GET SAVED COLLEGES
        // =================================

        builder

            .addCase(
                getSavedColleges.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getSavedColleges.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.savedColleges =
                        action.payload.savedColleges;

                }
            )

            .addCase(
                getSavedColleges.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // CHECK SAVED COLLEGE
        // =================================

        builder

            .addCase(
                checkSavedCollege.fulfilled,
                (state, action) => {

                    state.savedStatus[
                        action.payload.collegeId
                    ] = action.payload.saved;

                }
            );


        // =================================
        // REMOVE SAVED COLLEGE
        // =================================

        builder

            .addCase(
                removeSavedCollege.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                removeSavedCollege.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.savedColleges =
                        state.savedColleges.filter(
                            item =>
                                item.college._id !==
                                action.payload.collegeId
                        );

                    state.savedStatus[
                        action.payload.collegeId
                    ] = false;

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                removeSavedCollege.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // SAVE COMPARISON
        // =================================

        builder

            .addCase(
                saveComparison.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                saveComparison.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.savedComparisons.unshift(
                        action.payload.comparison
                    );

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                saveComparison.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // GET SAVED COMPARISONS
        // =================================

        builder

            .addCase(
                getSavedComparisons.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getSavedComparisons.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.savedComparisons =
                        action.payload.comparisons;

                }
            )

            .addCase(
                getSavedComparisons.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // GET SINGLE COMPARISON
        // =================================

        builder

            .addCase(
                getSavedComparison.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getSavedComparison.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.selectedComparison =
                        action.payload.comparison;

                }
            )

            .addCase(
                getSavedComparison.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // DELETE COMPARISON
        // =================================

        builder

            .addCase(
                deleteSavedComparison.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                deleteSavedComparison.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.savedComparisons =
                        state.savedComparisons.filter(
                            item =>
                                item._id !==
                                action.payload.id
                        );

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                deleteSavedComparison.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    }

});


export const {
    clearSavedError
} = savedSlice.actions;


export default savedSlice.reducer;