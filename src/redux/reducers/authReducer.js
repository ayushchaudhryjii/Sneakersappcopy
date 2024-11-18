import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
} from "../ActionType";

const initialState = {
  otpData: null,
  accessToken: null,
  loading: false,
  error: null,
  otpVerified: false, 
  profile: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_OTP_REQUEST:
    case CREATE_PROFILE_REQUEST:
      return { ...state, loading: true, error: null };

    case SEND_OTP_SUCCESS:
      return { ...state, loading: false, otpData: action.payload };

    case SEND_OTP_FAILURE:
      return { ...state, loading: false, error: action.payload };

     // Case for starting OTP verification request
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Case when OTP is successfully verified
    case VERIFY_OTP_SUCCESS:
      return {
        // ...state,
        // loading: false,
        // accessToken: action.payload,
        // // profileData: action.payload.profileData,
        // error: null,
        ...state,
        loading: false,
        otpVerified: true,
        otpData: action.payload,
        accessToken: action.payload.token, // Adjust if token structure differs
        error: null,
      };

    // Case for when OTP verification fails
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    
      case GOOGLE_LOGIN_REQUEST:
        return { ...state, loading: true, error: null };
      case GOOGLE_LOGIN_SUCCESS:
        return { ...state, loading: false, profile: action.payload };
      case GOOGLE_LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload };

    case CREATE_PROFILE_SUCCESS:
      return { ...state, loading: false };

    case CREATE_PROFILE_FAILURE:
      return { ...state, loading: false, error: action.payload };

      case GET_PROFILE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case GET_PROFILE_SUCCESS:
        return { ...state, loading: false, profile: action.payload };
  
      case GET_PROFILE_FAILURE:
        return { ...state, loading: false, error: action.payload };
        case 'SAVE_ACCESS_TOKEN':
          return {
            ...state,
            accessToken: action.payload,
          };
    default:
      return state;
  }
};
