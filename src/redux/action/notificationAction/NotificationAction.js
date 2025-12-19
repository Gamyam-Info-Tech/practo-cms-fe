import {
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_UNREAD_COUNT,
  MARK_ALL_NOTIFICATION_AS_READ,
  MARK_NOTIFICATION_AS_READ,
} from "../../../api/apiEndPoints";
import api from "../../../api/interceptor";
import {
  fetchNotificationStart,
  fetchNotificationSuccess,
  fetchNotificationFailure,
  markNotificationReadSuccess,
  markAllReadSuccess,
  fetchUnreadCountStart,
  fetchUnreadCountSuccess,
  fetchUnreadCountFailure,
} from "../../reducer/notificationReducer/NotificationReducer";

let isFetchingNotification = false;
let isMarkingAllRead = false;
let isFetchingUnreadCount = false;

// ,....................... get notification listing ..................

export const fetchNotificationList =
  ({ unreadOnly = false, limit = 50, offset = 0 } = {}) =>
  async (dispatch) => {
    if (isFetchingNotification) return;

    isFetchingNotification = true;
    dispatch(fetchNotificationStart());

    try {
      const response = await api.get(GET_NOTIFICATION_LIST, {
        params: { unreadOnly, limit, offset },
      });

      const { notifications, total, unreadCount } = response.data.data;

      dispatch(fetchNotificationSuccess({ notifications, total, unreadCount }));
    } catch (error) {
      dispatch(
        fetchNotificationFailure(
          error.response?.data?.message || "Failed to fetch notifications"
        )
      );
    } finally {
      isFetchingNotification = false;
    }
  };

// .................. Mark single notification as read ....................

export const markNotificationAsRead = (id) => async (dispatch) => {
  try {
    await api.patch(MARK_NOTIFICATION_AS_READ(id));
    dispatch(markNotificationReadSuccess(id));
  } catch (error) {
    console.error("Failed to mark notification as read");
  }
};

// .................... Mark all notifications as read ....................

export const markAllNotificationsAsRead = () => async (dispatch) => {
  if (isMarkingAllRead) return;

  isMarkingAllRead = true;
  try {
    await api.patch(MARK_ALL_NOTIFICATION_AS_READ);
    dispatch(markAllReadSuccess());
  } finally {
    isMarkingAllRead = false;
  }
};

// ....................... get unread count .......................

export const fetchNotificationUnreadCount = () => async (dispatch) => {
  if (isFetchingUnreadCount) return;
  isFetchingUnreadCount = true;

  dispatch(fetchUnreadCountStart());

  try {
    const response = await api.get(GET_NOTIFICATION_UNREAD_COUNT);
    const count = response.data?.data?.count ?? 0;

    dispatch(fetchUnreadCountSuccess(count));
    return count;
  } catch (error) {
    dispatch(fetchUnreadCountFailure());
  } finally {
    isFetchingUnreadCount = false;
  }
};
