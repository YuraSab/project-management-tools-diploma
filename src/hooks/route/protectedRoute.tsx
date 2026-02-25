import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { Role } from "../../types/user";
import { useAuthStore } from "../../store/useAuthStore";

interface ProtectedRouteProps {
    element: JSX.Element,
    allowedRoles?: Role[];
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);

    if (isLoading)
      return <div>Loading...</div>; // todo - real spinner
    if (!user)
      return <Navigate to={'/login'} replace />;
    if (allowedRoles && !allowedRoles.includes(user.role))
        return <Navigate to={'/'} replace />
    return element;
};
  
export default ProtectedRoute;