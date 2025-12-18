import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "../revertStateReducer/RevertStateReducer";

const initialState = {
  notifications: [],
  total: null, 
  unreadCount: null,
  isNotificationLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
  reducers: {
    // .................. fetch notification listing ....................
    fetchNotificationStart(state) {
      state.isNotificationLoading = true;
    },
    fetchNotificationSuccess(state, action) {
      state.isNotificationLoading = false;
      state.notifications = action.payload.notifications || [];
      state.error = null;
    },
    fetchNotificationFailure(state, action) {
      state.isNotificationLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchNotificationStart,
  fetchNotificationSuccess,
  fetchNotificationFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;