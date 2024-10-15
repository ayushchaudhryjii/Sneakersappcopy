import {
    PHONE_LOGIN_REQUEST,
    PHONE_LOGIN_SUCCESS,
    PHONE_LOGIN_FAILURE,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAILURE,
    OTP_VERIFY_FAILURE,
    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
  } from "./ActionType";
 const initialState = {
    user : null,
    error : null,
    session_id : null
 }
 const Reducer = (state=initialState,action) => {
   switch(action.type) {

        case PHONE_LOGIN_REQUEST : 
        // case PHONE_LOGIN_SUCCESS : return {...state , action.session_id}
        default : return state

    }
 }
 export default Reducer;