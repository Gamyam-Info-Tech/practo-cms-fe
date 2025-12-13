import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../revertStateReducer/RevertStateReducer";

const initialState = {
  user: null,
  permissions: [],
  isLoading: false,
  error: null,
  socialLoginPending: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    fetchPasswordResetEmailStart(state) {
      state.isLoading = true;
    },
    fetchPasswordResetEmailSuccess(state) {
      state.isLoading = false;
    },
    fetchPasswordResetEmailFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchResetPasswordStart(state) {
      state.isLoading = true;
    },
    fetchResetPasswordSuccess(state) {
      state.isLoading = false;
    },
    fetchResetPasswordFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // ===== LOGIN ACTIONS - OPTIMIZED =====
    fetchLoginUserStart(state) {
      // CRITICAL: Only update isLoading, nothing else
      // This prevents re-renders from error state changes
      state.isLoading = true;
    },
    fetchLoginUserSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user || null;
      state.permissions = action.payload.permissions || [];
      state.error = null; // Clear error only on success
    },
    fetchLoginUserFailure(state, action) {
      // Only update necessary fields
      state.isLoading = false;
      state.isAuthenticated = false;
      // Store error but component won't re-render from it
      state.error = action.payload;
    },
    
    // ===== SOCIAL LOGIN ACTIONS - OPTIMIZED =====
    fetchLoginSocialStart(state) {
      state.isLoading = true;
      state.socialLoginPending = true;
    },
    fetchLoginSocialSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.socialLoginPending = false;
      state.user = action.payload.user || null;
      state.permissions = action.payload.permissions || [];
      state.error = null;
    },
    fetchLoginSocialFailure(state, action) {
      state.isLoading = false;
      state.socialLoginPending = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    
    setSocialLoginPending(state, action) {
      state.socialLoginPending = action.payload;
    },
    
    fetchLogoutStart(state) {
      state.isLoading = true;
    },
    fetchLogoutSuccess(state) {
      return initialState;
    },
    fetchLogoutFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPasswordResetEmailStart,
  fetchPasswordResetEmailSuccess,
  fetchPasswordResetEmailFailure,
  fetchResetPasswordStart,
  fetchResetPasswordSuccess,
  fetchResetPasswordFailure,
  fetchLoginUserStart,
  fetchLoginUserSuccess,
  fetchLoginUserFailure,
  fetchLoginSocialStart,
  fetchLoginSocialSuccess,
  fetchLoginSocialFailure,
  fetchLogoutStart,
  fetchLogoutFailure,
  fetchLogoutSuccess,
  setSocialLoginPending,
} = authSlice.actions;

export default authSlice.reducer;