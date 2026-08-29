import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


// =====================================
// LAYOUTS
// =====================================

import UserLayout from "./Layouts/UserLayout";
import AdminLayout from "./Layouts/AdminLayout";


// =====================================
// PROTECTED ROUTE
// =====================================

import ProtectedRoute from "./routes/ProtectedRoute";


// =====================================
// USER / PUBLIC PAGES
// =====================================

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import CollegeReviews from "./pages/CollegeReviews";

import CompareColleges from "./pages/CompareColleges";

import Profile from "./pages/Profile";

import SavedColleges from "./pages/SavedColleges";
import SavedComparisons from "./pages/SavedComparisons";


// =====================================
// ADMIN PAGES
// =====================================

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminColleges from "./pages/admin/AdminColleges";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminUsers from "./pages/admin/AdminUsers";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* =====================================
                    PUBLIC AUTH ROUTES
                ===================================== */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =====================================
                    PUBLIC USER ROUTES
                ===================================== */}

                <Route element={<UserLayout />}>

                    {/* HOME */}

                    <Route
                        path="/"
                        element={<Home />}
                    />


                    {/* COLLEGES */}

                    <Route
                        path="/colleges"
                        element={<Colleges />}
                    />


                    {/* COLLEGE DETAILS */}

                    <Route
                        path="/college/:id"
                        element={<CollegeDetails />}
                    />


                    {/* COLLEGE REVIEWS */}

                    <Route
                        path="/college/:id/reviews"
                        element={<CollegeReviews />}
                    />


                    {/* COMPARE */}

                    <Route
                        path="/compare"
                        element={<CompareColleges />}
                    />

                </Route>


                {/* =====================================
                    PROTECTED USER ROUTES
                ===================================== */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["User"]}
                        />
                    }
                >

                    <Route element={<UserLayout />}>


                        {/* PROFILE */}

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />


                        {/* SAVED COLLEGES */}

                        <Route
                            path="/saved-colleges"
                            element={<SavedColleges />}
                        />


                        {/* SAVED COMPARISONS */}

                        <Route
                            path="/saved-comparisons"
                            element={<SavedComparisons />}
                        />

                    </Route>

                </Route>


                {/* =====================================
                    PROTECTED ADMIN ROUTES
                ===================================== */}

                <Route
                    element={
                        <ProtectedRoute
                            allowedRoles={["Admin"]}
                        />
                    }
                >

                    <Route
                        path="/admin"
                        element={<AdminLayout />}
                    >

                        {/* ADMIN DASHBOARD */}

                        <Route
                            index
                            element={
                                <AdminDashboard />
                            }
                        />


                        {/* ADMIN COLLEGES */}

                        <Route
                            path="colleges"
                            element={
                                <AdminColleges />
                            }
                        />


                        {/* ADMIN REVIEWS */}

                        <Route
                            path="reviews"
                            element={
                                <AdminReviews />
                            }
                        />


                        {/* ADMIN USERS */}

                        <Route
                            path="users"
                            element={
                                <AdminUsers />
                            }
                        />

                    </Route>

                </Route>

            </Routes>

        </BrowserRouter>

    );

}


export default App;