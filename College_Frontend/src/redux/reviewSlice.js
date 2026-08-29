import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import axiosInstance from "../services/axiosInstance";


// =====================================
// GET REVIEWS
// =====================================

export const getCollegeReviews = createAsyncThunk(

    "review/getCollegeReviews",

    async (collegeId, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    `/review/college/${collegeId}`
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get reviews"
            );

        }

    }

);


// =====================================
// ADD REVIEW
// =====================================

export const addReview = createAsyncThunk(

    "review/add",

    async (
        { collegeId, reviewData },
        { rejectWithValue }
    ) => {

        try {

            const response =
                await axiosInstance.post(
                    `/review/add/${collegeId}`,
                    reviewData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to add review"
            );

        }

    }

);


// =====================================
// UPDATE REVIEW
// =====================================

export const updateReview = createAsyncThunk(

    "review/update",

    async (
        { id, reviewData },
        { rejectWithValue }
    ) => {

        try {

            const response =
                await axiosInstance.put(
                    `/review/update/${id}`,
                    reviewData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update review"
            );

        }

    }

);


// =====================================
// DELETE REVIEW
// =====================================

export const deleteReview = createAsyncThunk(

    "review/delete",

    async (id, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.delete(
                    `/review/delete/${id}`
                );

            return {
                id,
                ...response.data
            };

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete review"
            );

        }

    }

);


// =====================================
// INITIAL STATE
// =====================================

const initialState = {

    reviews: [],

    total: 0,

    loading: false,

    error: null,

    message: ""

};


// =====================================
// SLICE
// =====================================

const reviewSlice = createSlice({

    name: "review",

    initialState,

    reducers: {

        clearReviewError: (state) => {

            state.error = null;

        }

    },


    extraReducers: (builder) => {


        // =================================
        // GET REVIEWS
        // =================================

        builder

            .addCase(
                getCollegeReviews.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getCollegeReviews.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.reviews =
                        action.payload.reviews;

                    state.total =
                        action.payload.total;

                }
            )

            .addCase(
                getCollegeReviews.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // ADD REVIEW
        // =================================

        builder

            .addCase(
                addReview.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                addReview.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.reviews.unshift(
                        action.payload.review
                    );

                    state.total += 1;

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                addReview.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // UPDATE REVIEW
        // =================================

        builder

            .addCase(
                updateReview.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                updateReview.fulfilled,
                (state, action) => {

                    state.loading = false;

                    const updatedReview =
                        action.payload.review;


                    const index =
                        state.reviews.findIndex(
                            review =>
                                review._id ===
                                updatedReview._id
                        );


                    if (index !== -1) {

                        state.reviews[index] =
                            updatedReview;

                    }


                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                updateReview.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // DELETE REVIEW
        // =================================

        builder

            .addCase(
                deleteReview.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                deleteReview.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.reviews =
                        state.reviews.filter(
                            review =>
                                review._id !==
                                action.payload.id
                        );

                    state.total -= 1;

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                deleteReview.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    }

});


export const {
    clearReviewError
} = reviewSlice.actions;


export default reviewSlice.reducer;