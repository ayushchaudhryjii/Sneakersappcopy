import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  CREATE_PROFILE_FAILURE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_REQUEST
} from '../ActionType';

const initialState = {
  otpData: null,        
  accessToken: null,   
  loading: false,       
  error: null,         
  profileData: null,    
};

// Auth reducer to handle the various actions
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for sending OTP request
    case SEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,    
        error: null,       
      };

    // Case when OTP is successfully sent
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,    
        otpData: action.payload,   
        error: null,      
      };

    // Case for when OTP sending fails
    case SEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,    
        error: action.payload,    
      };

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
        ...state,
        loading: false,    
        accessToken: action.payload,  
        // profileData: action.payload.profileData, 
        error: null,      
      };

    // Case for when OTP verification fails
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,    
        error: action.payload,  
      };


      case CREATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                profileData: action.payload,
                error: null,
            };

        case CREATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

    default:
      return state;
  }
};
