import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../../firebase";

export default function PrivateRoutes() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <p>Loading...</p>;
  } else if (!user || error) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
}
