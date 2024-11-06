// userAction.js
import {
  LOGIN,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REMEMBERME,
} from "../UserActionTypes";
import axios from "axios";
import {
  saveToken,
  saveUserData,
  removeUserData,
  removeToken,
} from "../../utils/auth";

// Login Action
export const userLogin = (email, password, rememberMe) => async (dispatch) => {
  try {
    const response = await axios.post('http://127.0.0.1:5000/sign-in', {
      email,
      password,
    });

    const { username, token } = response.data;

    // If "Remember Me" is checked, use localStorage; otherwise, use sessionStorage
    saveToken(token, rememberMe);
    saveUserData({ username, token }, rememberMe);

    // Dispatch the correct action based on the rememberMe flag
    if (rememberMe) {
      dispatch({ type: LOGIN_REMEMBERME, payload: { username } });
    } else {
      dispatch({ type: LOGIN, payload: { username } });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || 'Login failed' });
    throw error;
  }
};

// Register Action
export const userRegister = (username, email, password) => async (dispatch) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/sign-up", {
      username,
      email,
      password,
    });

    dispatch({ type: REGISTER_SUCCESS, payload: response.data.message });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// Logout Action
export const userLogout = () => async (dispatch) => {
  // Clear token and user data from both storages
  removeToken();
  removeUserData();

  dispatch({ type: LOGOUT });
};

export const resetRegistrationMessage = () => ({
  type: "RESET_REGISTRATION_MESSAGE",
});
