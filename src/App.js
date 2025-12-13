import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRouter from "./routes/AppRoutes";

import { GOOGLE_CLIENT_ID } from "./components/utils/helper";
import { getCurrentUser } from "./redux/action/authAction/AuthAction";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      dispatch(getCurrentUser()).catch((error) => {
        console.error("Session restore failed:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem("permissions");
      });
    }
  }, [dispatch]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppRouter />
    </GoogleOAuthProvider>
  );
}

export default App;