export const ADMIN_CONST = {
  ERROR: {
    EMAIL_ALREADY_EXISTS: 'Email already exists for admin',
    MOBILE_ALREADY_EXISTS: 'Mobile number already exists for admin',
    AUTH_NOT_FOUND: 'Authentication record not found for admin',
    ADMIN_NOT_FOUND: 'Admin not found with the provided credentials',
    INVALID_CREDENTIALS: 'Invalid email or password for admin',
    NOT_ADMIN_USER: 'Not an admin user',
    INACTIVE_ADMIN: 'Admin account is not active',
  },
  SUCEESS: {
    ADMIN_CREATED: 'Admin registered successfully',
    ADMIN_LOGGED_IN: 'Admin logged in successfully',
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
  },
  SUCEESS: {
    USER_CREATED: 'User registered successfully',
    USER_LOGGED_IN: 'User logged in successfully',
    USER_LIST_FETCHED: 'User list fetched successfully',
    USER_ACTIVATED: 'User activated successfully',
    USER_DEACTIVATED: 'user deactivated successfully',
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
