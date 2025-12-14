import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppRouter from "./routes/AppRoutes";

import { clearAuthData, getToken, GOOGLE_CLIENT_ID } from "./utils/helper";
import { getCurrentUser } from "./redux/action/authAction/AuthAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(getCurrentUser()).catch((error) => {
        clearAuthData();
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
