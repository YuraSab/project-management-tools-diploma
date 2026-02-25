import { JSX } from "react";
import { useAuth } from "../../layouts/authProvider/AuthProvider";
import { Navigate } from "react-router-dom";
import { Role } from "../../types/user";
import { useUserAccess } from "../../layouts/authProvider/UseUserAccess";

interface ProtectedRouteProps {
    element: JSX.Element,
    allowedRoles?: Role[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();
    const { role } = useUserAccess();
    if (!isAuthenticated || !role) 
      return <Navigate to="/login" replace />;
    if (allowedRoles && (!allowedRoles.includes(role)))
      return <Navigate to="/" replace />;
    return element;
};
  
export default ProtectedRoute;