import { GET_NOTIFICATION_LIST } from "../../../api/apiEndPoints";
import api from "../../../api/interceptor";
import {
  fetchNotificationStart,
  fetchNotificationSuccess,
  fetchNotificationFailure,
} from "../../reducer/notificationReducer/NotificationReducer";

let isFetchingNotification = false;


// ,....................... get notification listing ..................

export const fetchNotificationList = () => async (dispatch) => {
  if (isFetchingNotification) return;
  isFetchingNotification = true;
  dispatch(fetchNotificationStart());

  try {
    const response = await api.get(`${GET_NOTIFICATION_LIST}`);
    console.log("response", response);
    const { notifications, total, unreadCount } = response.data;
    dispatch(fetchNotificationSuccess({ notifications, total, unreadCount }));

    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to fetch users";
    dispatch(fetchNotificationFailure(errorMessage));
    throw error;
  } finally {
    isFetchingNotification = false;
  }
};
