// Save token in either localStorage or sessionStorage based on "Remember Me"
export const saveToken = (token, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('userToken', token);
  } else {
    sessionStorage.setItem('userToken', token);
  }
};

// Get token from the appropriate storage
export const getToken = () => {
  return localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
};

// Remove token from both localStorage and sessionStorage
export const removeToken = () => {
  localStorage.removeItem('userToken');
  sessionStorage.removeItem('userToken');
};

// Save user data in either localStorage or sessionStorage based on "Remember Me"
export const saveUserData = (userData, rememberMe) => {
  if (rememberMe) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(userData));
  }
};

// Get user data from the appropriate storage
export const getUserData = () => {
  return JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser') || '{}');
};

// Remove user data from both localStorage and sessionStorage
export const removeUserData = () => {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('currentUser');
};
