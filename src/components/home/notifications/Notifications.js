import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationList } from "../../../redux/action/notificationAction/NotificationAction";

const DUMMY_NOTIFICATIONS = [
  {
    id: "1",
    title: "New Blog Assigned",
    message: "A new blog has been assigned to you for medical review.",
    createdAt: "2025-01-15T10:30:00Z",
    isRead: false,
  },
  {
    id: "2",
    title: "Blog Approved",
    message: "Your reviewed blog has been approved successfully.",
    createdAt: "2025-01-14T08:15:00Z",
    isRead: true,
  },
  {
    id: "3",
    title: "Doctor Assigned",
    message: "Dr. Rahul Verma is assigned to review the content.",
    createdAt: "2025-01-13T16:45:00Z",
    isRead: false,
  },
  {
    id: "4",
    title: "Action Required",
    message: "Please update missing details before submission.",
    createdAt: "2025-01-12T12:20:00Z",
    isRead: true,
  },
];

const Notifications = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const totalCount = useSelector((state)=> state.notifications);
  console.log("totalCount", totalCount)

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true }))
    );
  };


  useEffect(()=>{
    dispatch(fetchNotificationList())
  },[dispatch])


  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Notifications
          </h1>
          <p className="text-gray-500 mt-1">
            Stay updated with system and content activities
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                All Notifications
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                You have {unreadCount} unread notification
                {unreadCount !== 1 && "s"}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification List */}
          <div className="divide-y">
            {notifications.length === 0 ? (
              <div className="p-10 text-center text-gray-500">
                No notifications available
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && markAsRead(n.id)}
                  className={`flex gap-4 px-6 py-5 cursor-pointer transition ${
                    !n.isRead
                      ? "bg-blue-50 hover:bg-blue-100/50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {/* Unread Indicator */}
                  <div className="pt-1">
                    {!n.isRead && (
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600 block" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900">
                        {n.title}
                      </h3>

                      {!n.isRead && (
                        <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {n.message}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;