import {
    SEND_OTP_REQUEST,
    SEND_OTP_SUCCESS,
    SEND_OTP_FAILURE,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    PROFILE_CREATION_SUCCESS,
    PROFILE_CREATION_FAILURE,
  } from '../ActionType';
  
  const initialState = {
    mobileNo: '',
    otpVerified: false,
    loading: false,
    error: null,
    profileData: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEND_OTP_REQUEST:
        return { ...state, loading: true, error: null };
      case SEND_OTP_SUCCESS:
        return { ...state, loading: false, mobileNo: action.payload };
      case SEND_OTP_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case VERIFY_OTP_SUCCESS:
        return { ...state, otpVerified: true, loading: false };
      case VERIFY_OTP_FAILURE:
        return { ...state, otpVerified: false, loading: false, error: action.payload };
      case PROFILE_CREATION_SUCCESS:
        return { ...state, profileData: action.payload, loading: false };
      case PROFILE_CREATION_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  