import { LOGIN, LOGOUT, LOGIN_REMEMBERME, REGISTER_SUCCESS, REGISTER_FAILURE, RESET_REGISTRATION_MESSAGE } from "../UserActionTypes";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  remembermeStatus: false,
  registrationMessage: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        remembermeStatus: false,
        error: null,
      };
    case LOGIN_REMEMBERME:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        remembermeStatus: true,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        remembermeStatus: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registrationMessage: action.payload,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_REGISTRATION_MESSAGE:
      return {
        ...state,
        registrationMessage: null,
      };
    default:
      return state;
  }
}
