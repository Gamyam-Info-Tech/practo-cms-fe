import api from "../../../api/interceptor";
import {
  fetchLoginUserFailure,
  fetchLoginUserStart,
  fetchLoginUserSuccess,
  fetchLoginSocialStart,
  fetchLoginSocialSuccess,
  fetchLoginSocialFailure,
  fetchLogoutStart,
  fetchLogoutSuccess,
  fetchLogoutFailure,
} from "../../reducer/authReducer/AuthReducer";

let isPostLoginUser = false;
let isPostSocialLogin = false;

// Email/Password Login
export const loginUser = (email, password) => async (dispatch) => {
  if (isPostLoginUser) return;
  isPostLoginUser = true;
  dispatch(fetchLoginUserStart());

  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    const { token, user, permissions } = response.data;

    // Store token, user, and permissions in localStorage
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("permissions", JSON.stringify(permissions));

    dispatch(fetchLoginUserSuccess({ user, permissions }));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Login failed";
    dispatch(fetchLoginUserFailure(errorMessage));
    throw error;
  } finally {
    isPostLoginUser = false;
  }
};

// Google OAuth Login
export const loginWithGoogle = (googleToken) => async (dispatch) => {
  if (isPostSocialLogin) return;
  isPostSocialLogin = true;
  dispatch(fetchLoginSocialStart());

  try {
    const response = await api.post("/api/auth/oauth/google", {
      token: googleToken,
    });

    const { token, user, permissions } = response.data;

    // Store token, user, and permissions in localStorage
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("permissions", JSON.stringify(permissions));

    dispatch(fetchLoginSocialSuccess({ user, permissions }));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Google login failed";
    dispatch(fetchLoginSocialFailure(errorMessage));
    throw error;
  } finally {
    isPostSocialLogin = false;
  }
};

// Get Current User (Session Restore)
export const getCurrentUser = () => async (dispatch) => {
  dispatch(fetchLoginUserStart());

  try {
    const response = await api.get("/api/auth/me");

    const { user, permissions } = response.data;

    // Update localStorage
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("permissions", JSON.stringify(permissions));

    dispatch(fetchLoginUserSuccess({ user, permissions }));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Session restore failed";
    dispatch(fetchLoginUserFailure(errorMessage));
    
    // Clear localStorage on failure
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    
    throw error;
  }
};

// Refresh Token
export const refreshToken = () => async (dispatch) => {
  try {
    const response = await api.post("/api/auth/refresh");

    const { token } = response.data;
    localStorage.setItem("access_token", token);

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Token refresh failed";
    console.error("Token refresh failed:", errorMessage);
    throw error;
  }
};

// Logout
export const logoutUser = () => async (dispatch) => {
  dispatch(fetchLogoutStart());

  try {
    // Clear localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");

    dispatch(fetchLogoutSuccess());
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Logout failed";
    dispatch(fetchLogoutFailure(errorMessage));
    throw error;
  }
};