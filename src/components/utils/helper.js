import { IoDocumentTextOutline, IoHome } from "react-icons/io5";
import { ROUTES } from "../../routes/RouterConstant";
import { FiUpload } from "react-icons/fi";
import { FaRegChartBar } from "react-icons/fa";
import { PiUsers } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";


// export const isAuthenticated = () => {
//   const token = localStorage.getItem("access_token");
//   return token && token.trim() !== "";
// };


export const MENU_ITEMS = [
  { label: "Dashboard", icon: <IoHome size={20} />, path: ROUTES.DASHBOARD },
  {
    label: "Content Library",
    icon: <IoDocumentTextOutline size={20} />,
    path: ROUTES.CONTENT_LIBRARY,
  },
  { label: "Upload", icon: <FiUpload size={20} />, path: ROUTES.UPLOAD },
  {
    label: "Review Queue",
    icon: <FaRegChartBar size={20} />,
    path: ROUTES.REVIEW_QUEUE,
  },
  { label: "Users", icon: <PiUsers size={20} />, path: ROUTES.USERS },
  { label: "Settings", icon: <CiSettings size={20} />, path: ROUTES.SETTINGS },
];



/**
 * Authentication Helper Functions
 */

// Google OAuth Client ID
export const GOOGLE_CLIENT_ID = 
  process.env.REACT_APP_GOOGLE_CLIENT_ID || 
  "581506113726-5i1dpgj13fq69d08agpjdbrpctc96o56.apps.googleusercontent.com";

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token;
};

// Get current user from localStorage
export const getCurrentUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Get user permissions from localStorage
export const getUserPermissions = () => {
  try {
    const permissionsStr = localStorage.getItem("permissions");
    return permissionsStr ? JSON.parse(permissionsStr) : [];
  } catch (error) {
    console.error("Error parsing permissions from localStorage:", error);
    return [];
  }
};

// Check if user has specific permission
export const hasPermission = (permission) => {
  const permissions = getUserPermissions();
  return permissions.includes(permission);
};

// Check if user has any of the specified permissions
export const hasAnyPermission = (permissionList) => {
  const permissions = getUserPermissions();
  return permissionList.some((perm) => permissions.includes(perm));
};

// Check if user has all specified permissions
export const hasAllPermissions = (permissionList) => {
  const permissions = getUserPermissions();
  return permissionList.every((perm) => permissions.includes(perm));
};

// Get user role
export const getUserRole = () => {
  const user = getCurrentUserFromStorage();
  return user?.role || null;
};

// Check if user has specific role
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

// Check if user has any of the specified roles
export const hasAnyRole = (roleList) => {
  const userRole = getUserRole();
  return roleList.includes(userRole);
};

// Clear all auth data from localStorage
export const clearAuthData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
  localStorage.removeItem("permissions");
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("access_token");
};

// Store auth data in localStorage
export const storeAuthData = (token, user, permissions) => {
  localStorage.setItem("access_token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("permissions", JSON.stringify(permissions));
};

// Check if token is expired (basic check - you can enhance this)
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  try {
    // Decode JWT token (basic decode without verification)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= exp;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

// Format user's full name
export const getUserFullName = () => {
  const user = getCurrentUserFromStorage();
  if (!user) return "";
  return user.name || `${user.firstName} ${user.lastName}`.trim();
};

// Get user initials for avatar
export const getUserInitials = () => {
  const user = getCurrentUserFromStorage();
  if (!user) return "";
  
  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};