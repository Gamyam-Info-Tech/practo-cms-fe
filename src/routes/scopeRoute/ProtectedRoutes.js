import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../RouterConstant";
import { getToken } from "../../utils/helper";

const ProtectedRoutes = ({ children, requiredPermissions = [] }) => {
  const { isAuthenticated, permissions } = useSelector((state) => state.auth);
  const token = getToken()

  if (!isAuthenticated || !token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.every((perm) =>
      permissions.includes(perm)
    );

    if (!hasPermission) {
      return <Navigate to={ROUTES.DASHBOARD} replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
