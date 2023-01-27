import { Outlet, Navigate } from "react-router-dom";
import { UseAuthState } from "./UseAuthState";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { loggedIn, loading } = UseAuthState();

  if (loading) {
    return <Loader />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
