import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,

} from "../ActionType";

// Action to send OTP
export const sendOtpRequest = (mobileNo) => ({
  type: SEND_OTP_REQUEST,
  payload: mobileNo,
});

export const sendOtpSuccess = (data) => ({
  type: SEND_OTP_SUCCESS,
  payload: data,
});

export const sendOtpFailure = (error) => ({
  type: SEND_OTP_FAILURE,
  payload: error,
});

// Action to verify OTP
export const verifyOtpRequest = (phone, code) => {
  console.log("phone, code",phone, code)
  return {
      type: VERIFY_OTP_REQUEST,
      payload: { phone, code }
  };
};
export const verifyOtpSuccess = (accessToken) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: accessToken,
});

export const verifyOtpFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});


export const googleLoginRequest = (auth_id, email) => ({
  type: GOOGLE_LOGIN_REQUEST,
  payload: { auth_id, email },
});

export const googleLoginSuccess = (userData) => ({
  type: GOOGLE_LOGIN_SUCCESS,
  payload: userData,
});

export const googleLoginFailure = (error) => ({
  type: GOOGLE_LOGIN_FAILURE,
  payload: error,
});


// Action to create profile
export const createProfileRequest = (profileData, token) => ({
  type: CREATE_PROFILE_REQUEST,
  payload: { profileData, token },
});

export const createProfileSuccess = () => ({
  type: CREATE_PROFILE_SUCCESS,
});

export const createProfileFailure = (error) => ({
  type: CREATE_PROFILE_FAILURE,
  payload: error,
});


export const getProfileRequest = (token) => ({
  type: GET_PROFILE_REQUEST,
  payload: token,
});

export const getProfileSuccess = (profileData) => ({
  type: GET_PROFILE_SUCCESS,
  payload: profileData,
});

export const getProfileFailure = (error) => ({
  type: GET_PROFILE_FAILURE,
  payload: error,
});

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const saveAccessToken = (token) => ({
  type: 'SAVE_ACCESS_TOKEN',
  payload: token,
});