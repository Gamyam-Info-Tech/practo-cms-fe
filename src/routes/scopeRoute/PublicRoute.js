import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../RouterConstant";
import { getToken } from "../../utils/helper";

const PublicRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const token = getToken()

  if (isAuthenticated && token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoutes;