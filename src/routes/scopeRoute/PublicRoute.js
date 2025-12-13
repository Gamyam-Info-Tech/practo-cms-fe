// import { Navigate } from "react-router-dom";
// import { ROUTES } from "../RouterConstant";
// import { isAuthenticated } from "../../components/utils/helper";

// const PublicRoutes = ({ children }) => {
//   if (isAuthenticated()) {
//     return <Navigate to={ROUTES.DASHBOARD} replace />;
//   }

//   return children;
// };

// export default PublicRoutes;


// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { ROUTES } from "../RouterConstant";

// const PublicRoutes = ({ children }) => {
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const token = localStorage.getItem("access_token");

//   if (isAuthenticated && token) {
//     return <Navigate to={ROUTES.DASHBOARD} replace />;
//   }

//   return children;
// };

// export default PublicRoutes;





import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../RouterConstant";

const PublicRoutes = ({ children }) => {
  // Use shallow equality check to prevent unnecessary re-renders
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated,
    // Custom equality function to prevent re-renders on other state changes
    (oldValue, newValue) => oldValue === newValue
  );
  
  const token = localStorage.getItem("access_token");

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && token) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return children;
};

// Memoize the component to prevent re-renders when parent re-renders
export default React.memo(PublicRoutes);