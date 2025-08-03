import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../UI/spinner/Spinner";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { clearAuth } from "../../store/auth-slice";

type ProtectRoutesProps = {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
};

function ProtectRoutes({
  children,
  redirectIfAuthenticated,
}: ProtectRoutesProps) {
  const { token, data, isPending } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  const userRole = data?.data?.data.role;
  const isAdmin = userRole === "admin" || userRole === "creator";
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!isPending && token && !redirectIfAuthenticated && !isAdmin) {
      dispatch(clearAuth());
      setUnauthorized(true);
      window.location.assign("/warning");
    }
  }, [isPending, token, redirectIfAuthenticated, isAdmin, dispatch]);

  if (token && isPending)
    return (
      <div className="flex justify-center items-center  h-screen">
        <Spinner />
      </div>
    );

  if (!redirectIfAuthenticated && !token) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (redirectIfAuthenticated && token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (unauthorized) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

export default ProtectRoutes;
