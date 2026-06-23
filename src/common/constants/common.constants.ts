export const ADMIN_CONST = {
  ERROR: {
    EMAIL_ALREADY_EXISTS: 'Email already exists for admin',
    MOBILE_ALREADY_EXISTS: 'Mobile number already exists for admin',
    AUTH_NOT_FOUND: 'Authentication record not found for admin',
    ADMIN_NOT_FOUND: 'Admin not found with the provided credentials',
    INVALID_CREDENTIALS: 'Invalid email or password for admin',
    NOT_ADMIN_USER: 'Not an admin user',
    INACTIVE_ADMIN: 'Admin account is not active',
    REGISTER_ADMIN_FAILED: 'Register admin failed',
    ADMIN_LOGIN_IN_FAILED: 'Admin login failed',
  },
  SUCEESS: {
    ADMIN_CREATED: 'Admin registered successfully',
    ADMIN_LIST_FETCHED: 'Admin list fetched successfully',
    ADMIN_ACTIVATED: 'Admin activated successfully',
    ADMIN_DEACTIVATED: 'Admin deactivated successfully',
  },
};

export const USER_CONST = {
  ERROR: {
    EMAIL_ALREADY_EXISTS: 'Email already exists for user',
    MOBILE_ALREADY_EXISTS: 'Mobile number already exists for user',
    AUTH_NOT_FOUND: 'Authentication record not found for user',
    USER_NOT_FOUND: 'User not found with the provided credentials',
    INVALID_CREDENTIALS: 'Invalid email or password for user',
    NOT_USER: 'Not a user',
    INACTIVE_USER: 'User account is not active',
    FAILED_REGISTER_USER: 'Failed to register user',
    FAILED_FETCHED_USER_BY_ID: 'Failed to fetched user by id',
    FAILED_FETCHED_USER_LISTS: 'Failed to fetched user lists',
    FAILED_FETCHED_USER_PROFILE: 'Failed to fetched user profile',
    FAILED_UPDATED_USER_PROFILE: 'Failed to updated user profile',
    FAILED_USER_LOGIN: 'Failed to user login',
  },
  SUCCESS: {
    USER_CREATED: 'User registered successfully',
    USER_LOGGED_IN: 'User logged in successfully',
    USER_LIST_FETCHED: 'User list fetched successfully',
    USER_ACTIVATED: 'User activated successfully',
    USER_DEACTIVATED: 'User deactivated successfully',
    USER_PROFILED_FETCHED: 'User profile fetched successfully',
    USER_PROFILED_UPDATED: 'User profile updated successfully',
  },
};

export const JWT_CONST = {
  ERROR: {
    INVALID_TOKEN: 'Invalid token',
    TOKEN_EXPIRED: 'Token has expired',
    UNAUTHORIZED: 'Unauthorized access',
    REFRESH_TOKEN_MISSING: 'Refresh token is missing',
  },
  SUCCESS: {
    TOKEN_VERIFIED: 'Token verified successfully',
  },
};

export const GUARD_CONST = {
  ERROR: {
    USER_DENIED: 'User does not have permission to access this resource',
    PARSE_ID_MUST_BE_NUMBER: 'ID parameter must be a number',
    PARSE_ID_MISSING: 'ID parameter is missing',
    USER_NOT_AUTHENTICATED: 'User not authenticated',
    USER_NOT_AN_ADMIN: 'User not an admin',
  },
};

export const BANKS_CONST = {
  ERROR: {
    FAILED_CREATE_BANK: 'Failed to create bank',
    FAILED_BANK_LISTS: 'Failed to fetched bank lists',
    FAILED_UPDATE_BANK: 'Failed to update bank',
    BANK_NOT_FOUND: 'Bank record not found',
  },
  SUCCESS: {
    CREATED_BANK: 'Bank created successfully',
    FETCHED_BANK_LISTS: 'Bank lists fetched successfully',
    UPDATED_BANK: 'Bank updated successfully',
  },
};

export const USER_BANK_CONST = {
  ERROR: {
    USER_NOT_FOUND: 'User not found',
    BANK_NOT_FOUND: 'Bank not found',
    USER_BANK_RECORD_EXIST: 'User bank record already exist',
    USER_BANK_CREATED_FAILED: 'User bank record created failed',
    USER_BANK_RECORD_NOT_FOUND: 'User bank record not found',
    USER_BANK_FETCHED_FAILED: 'User bank fetched failed',
  },
  SUCCESS: {
    USER_BANK_CREATED: 'User bank created successfully',
    USER_BANK_LIST_FETCHED: 'User bank list fetched successfully',
  },
};

export const AUTH_CONST = {
  ERROR: {
    FAILED_REFRESH_TOKEN: 'Failed to refresh token',
    FAILED_ACTIVATE_ACCOUNT: 'Failed to activate account',
    FAILED_DEACTIVATE_ACCOUNT: 'Failed to deactivate account',
    FAILED_ADMIN_REGISTER: 'Failed to admin registration',
    FAILED_ADMIN_LOGIN: 'Failed to login for admin account',
    FAILED_USER_REGISTER: 'Failed to user registration',
    FAILED_USER_LOGIN: 'Failed to login for user account',
    AUTH_NOT_FOUND: 'Auth not found',
    AUTH_ALREADY_ACTIVATED: 'Auth already activated',
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    MOBILE_ALREADY_EXISTS: 'Mobile already exists',
    ADMIN_NOT_FOUND: 'Admin account record not found',
    INVALID_CREDENTIAL_ADMIN: 'Invalid password for admin',
    NOT_ADMIN: 'Not an admin',
    INACTIVE_ADMIN: 'Admin account is not activated',
    USER_NOT_FOUND: 'User account record not found',
    INVALID_CREDENTIAL_USER: 'Invaid password for user',
    NOT_USER: 'Not a user',
    INACTIVE_USER: 'User account is not activated',
    REFRESH_TOKEN_MISSING: 'Refresh token is missing',
  },
  SUCCESS: {
    ACCOUNT_ACTIVATED: 'Account activated successfully',
    ACCOUNT_DEACTIVATED: 'Account deactivated successfully',
    ADMIN_REGISTERED: 'Admin account register successfully',
    ADMIN_LOGGED_IN: 'Admin logged in successfully',
    USER_REGISTERED: 'User account register successfully',
    USER_LOGGED_IN: 'User logged in successfully',
    TOKEN_VERIFIED: 'Token verified',
  },
};
