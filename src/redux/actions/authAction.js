import {
    SEND_OTP_REQUEST,
    VERIFY_OTP_REQUEST,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
} from '../ActionType';

export const sendOtpRequest = (phone) => {
    console.log(phone); 
    return {
        type: SEND_OTP_REQUEST,
        payload: phone
    };
};

export const verifyOtpRequest = (phone, code) => {
    return {
        type: VERIFY_OTP_REQUEST,
        payload: { phone, code }
    };
};



export const fetchProductsRequest = () => ({
    type: 'FETCH_PRODUCTS_REQUEST',
  });
  
  export const fetchProductsSuccess = (products) => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  });
  
  export const fetchProductsFailure = (error) => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  });