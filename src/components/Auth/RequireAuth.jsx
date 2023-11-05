import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { user } = useAuth();
    const location = useLocation();
  return( 
    <>
      {user ? (
        <Outlet />
      ) : (
        <Navigate
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      )}
    </>
  );
};
export default RequireAuth;