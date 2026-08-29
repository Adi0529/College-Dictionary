import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import collegeReducer from "./collegeSlice";
import reviewReducer from "./reviewSlice";
import savedReducer from "./savedSlice";


const store = configureStore({

    reducer: {

        auth: authReducer,

        college: collegeReducer,

        review: reviewReducer,

        saved: savedReducer

    }

});


export default store;