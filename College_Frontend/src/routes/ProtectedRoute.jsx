import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({
    allowedRoles
}) => {

    const {
        isLoggedIn,
        user
    } = useSelector(
        state => state.auth
    );


    // =====================================
    // NOT LOGGED IN
    // =====================================

    if (!isLoggedIn) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // =====================================
    // ROLE CHECK
    // =====================================

    if (
        allowedRoles &&
        !allowedRoles.includes(user?.role)
    ) {

        if (user?.role === "Admin") {

            return (
                <Navigate
                    to="/admin"
                    replace
                />
            );

        }


        return (
            <Navigate
                to="/"
                replace
            />
        );

    }


    // =====================================
    // ALLOWED
    // =====================================

    return <Outlet />;

};


export default ProtectedRoute;