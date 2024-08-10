const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const MESSAGE_ENDPOINTS = {
  FETCH_MESSAGES: `${BASE_URL}/api/messages`,
  SEND_MESSAGE: `${BASE_URL}/api/messages`,
};

// Add other endpoints similarly
export const AUTH_ENDPOINTS = {
  REGISTER_API: `${BASE_URL}/api/auth/register`,
  LOGIN_API: `${BASE_URL}/api/auth/login`,
};

export const GROUP_ENDPOINTS = {
  FETCH_GROUP: `${BASE_URL}/api/group`,
  FETCH_GROUP_METRICS: (groupId) => `${BASE_URL}/api/group/${groupId}/metrics`,
  JOIN_GROUP: (groupId) => `${BASE_URL}/api/group/${groupId}/join`,
  GROUP_MEMBERS: (groupId) => `${BASE_URL}/api/group/${groupId}/members`
};

export const USER_ENDPOINTS = {
  GET_USER: (id) => `${BASE_URL}/api/users/${id}`,
  UPDATE_USER:`${BASE_URL}/api/users`,
  GET_USER_BY_PHONE:`${BASE_URL}/api/users/phone`,
}
