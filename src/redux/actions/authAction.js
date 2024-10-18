import {
    SEND_OTP_REQUEST,
    VERIFY_OTP_REQUEST
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
