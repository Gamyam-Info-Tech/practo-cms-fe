// import { Navigate } from "react-router-dom";
// import { ROUTES } from "../RouterConstant";
// import { isAuthenticated } from "../../components/utils/helper";

// const ProtectedRoutes = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to={ROUTES.LOGIN} replace />;
//   }

//   return children;
// };

// export default ProtectedRoutes;


import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../RouterConstant";

const ProtectedRoutes = ({ children, requiredPermissions = [] }) => {
  const { isAuthenticated, permissions } = useSelector((state) => state.auth);
  const token = localStorage.getItem("access_token");

  // Check if user is authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // Check if user has required permissions (optional)
  if (requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.every((perm) =>
      permissions.includes(perm)
    );

    if (!hasPermission) {
      // You can create an Unauthorized page or redirect to dashboard
      return <Navigate to={ROUTES.DASHBOARD} replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
