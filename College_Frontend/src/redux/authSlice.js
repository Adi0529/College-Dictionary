import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../services/axiosInstance";


// =====================================
// REGISTER
// =====================================

export const registerUser = createAsyncThunk(

    "auth/register",

    async (formData, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.post(
                    "/user/register",
                    formData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    }

);


// =====================================
// LOGIN
// =====================================

export const loginUser = createAsyncThunk(

    "auth/login",

    async (userData, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.post(
                    "/user/",
                    userData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    }

);


// =====================================
// GET PROFILE
// =====================================

export const getProfile = createAsyncThunk(

    "auth/profile",

    async (_, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    "/user/profile"
                );

            return response.data.user;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get profile"
            );

        }

    }

);


// =====================================
// UPDATE PROFILE
// =====================================

export const updateProfile = createAsyncThunk(

    "auth/updateProfile",

    async (formData, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.put(
                    "/user/update",
                    formData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Profile update failed"
            );

        }

    }

);


// =====================================
// CHANGE PASSWORD
// =====================================

export const changePassword = createAsyncThunk(

    "auth/changePassword",

    async (passwordData, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.put(
                    "/user/change-password",
                    passwordData
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Password change failed"
            );

        }

    }

);

export const getAllUsers = createAsyncThunk(

    "auth/getAllUsers",

    async (_, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.get(
                    "/user/"
                );

            return response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to get users"
            );

        }

    }

);

export const deleteUser = createAsyncThunk(

    "auth/deleteUser",

    async (id, { rejectWithValue }) => {

        try {

            const response =
                await axiosInstance.delete(
                    `/user/${id}`
                );

            return {
                id,
                ...response.data
            };

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete user"
            );

        }

    }

);

// =====================================
// INITIAL STATE
// =====================================

const user =
    localStorage.getItem("user");


const initialState = {

    user: user
        ? JSON.parse(user)
        : null,
    users: [],

    token:
        localStorage.getItem("token") || null,

    isLoggedIn:
        !!localStorage.getItem("token"),

    loading: false,

    error: null,

    success: false,

    message: ""

};


// =====================================
// SLICE
// =====================================

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        logout: (state) => {

            state.user = null;

            state.token = null;

            state.isLoggedIn = false;

            state.loading = false;

            state.error = null;


            localStorage.removeItem("user");

            localStorage.removeItem("token");

        },

        clearAuthMessage: (state) => {

            state.error = null;

            state.message = "";

            state.success = false;

        }

    },


    extraReducers: (builder) => {

        // =================================
        // REGISTER
        // =================================

        builder

            .addCase(
                registerUser.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                registerUser.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                registerUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // LOGIN
        // =================================

        builder

            .addCase(
                loginUser.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                loginUser.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    state.isLoggedIn = true;

                    state.token =
                        action.payload.token;

                    state.user =
                        action.payload.user;

                    state.message =
                        action.payload.message;


                    localStorage.setItem(
                        "token",
                        action.payload.token
                    );


                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            action.payload.user
                        )
                    );

                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // PROFILE
        // =================================

        builder

            .addCase(
                getProfile.pending,
                (state) => {

                    state.loading = true;

                }
            )

            .addCase(
                getProfile.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.user =
                        action.payload;


                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            action.payload
                        )
                    );

                }
            )

            .addCase(
                getProfile.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // UPDATE PROFILE
        // =================================

        builder

            .addCase(
                updateProfile.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                updateProfile.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    state.user =
                        action.payload.user;

                    state.message =
                        action.payload.message;


                    localStorage.setItem(
                        "user",
                        JSON.stringify(
                            action.payload.user
                        )
                    );

                }
            )

            .addCase(
                updateProfile.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // CHANGE PASSWORD
        // =================================

        builder

            .addCase(
                changePassword.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                changePassword.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.success = true;

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                changePassword.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );
        // =================================
        // GET ALL USERS
        // =================================

        builder

            .addCase(
                getAllUsers.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                getAllUsers.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.users =
                        action.payload.users;

                }
            )

            .addCase(
                getAllUsers.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );


        // =================================
        // DELETE USER
        // =================================

        builder

            .addCase(
                deleteUser.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                deleteUser.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.users =
                        state.users.filter(
                            user =>
                                user._id !==
                                action.payload.id
                        );

                    state.message =
                        action.payload.message;

                }
            )

            .addCase(
                deleteUser.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    }

});


export const {
    logout,
    clearAuthMessage
} = authSlice.actions;


export default authSlice.reducer;