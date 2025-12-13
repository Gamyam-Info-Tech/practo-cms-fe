/**
 * Permission Constants
 * Define all permissions used in the application
 */

export const PERMISSIONS = {
  // User Management
  CREATE_USER: "create_user",
  EDIT_USER: "edit_user",
  DELETE_USER: "delete_user",
  VIEW_USER: "view_user",

  // Content Management
  CREATE_CONTENT: "create_content",
  EDIT_CONTENT: "edit_content",
  DELETE_CONTENT: "delete_content",
  VIEW_CONTENT: "view_content",
  PUBLISH_CONTENT: "publish_content",

  // Review Management
  REVIEW_CONTENT: "review_content",
  APPROVE_CONTENT: "approve_content",
  REJECT_CONTENT: "reject_content",

  // Upload Management
  UPLOAD_POINTERS: "upload_pointers",
  APPROVE_SCRIPT: "approve_script",

  // Settings
  MANAGE_SETTINGS: "manage_settings",
  VIEW_SETTINGS: "view_settings",

  // Dashboard
  VIEW_DASHBOARD: "view_dashboard",
  VIEW_ANALYTICS: "view_analytics",
};

/**
 * User Roles
 */
export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  MEDICAL_REVIEWER: "MEDICAL_REVIEWER",
  BRAND_REVIEWER: "BRAND_REVIEWER",
  DOCTOR_CREATOR: "DOCTOR_CREATOR",
  AGENCY_POC: "AGENCY_POC",
  CONTENT_APPROVER: "CONTENT_APPROVER",
  PUBLISHER: "PUBLISHER",
  VIEWER: "VIEWER",
};

/**
 * Role to Permission Mapping (for reference)
 * Actual permissions come from backend, but this helps with UI logic
 */
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS), // All permissions
  [ROLES.MEDICAL_REVIEWER]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.REVIEW_CONTENT,
    PERMISSIONS.APPROVE_CONTENT,
    PERMISSIONS.REJECT_CONTENT,
  ],
  [ROLES.BRAND_REVIEWER]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.REVIEW_CONTENT,
    PERMISSIONS.APPROVE_CONTENT,
    PERMISSIONS.REJECT_CONTENT,
  ],
  [ROLES.DOCTOR_CREATOR]: [
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.UPLOAD_POINTERS,
  ],
  [ROLES.AGENCY_POC]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.CREATE_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
  ],
  [ROLES.CONTENT_APPROVER]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.APPROVE_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
  ],
  [ROLES.PUBLISHER]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.PUBLISH_CONTENT,
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.VIEW_DASHBOARD,
  ],
};