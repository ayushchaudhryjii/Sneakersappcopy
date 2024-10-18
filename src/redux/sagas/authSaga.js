import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import BASE_URL, { SEND_OTP, VERIFY_OTP, } from "../../utils/EndPoint"; // Import the endpoints
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from "../ActionType";

// API call to send OTP
function* sendOtpSaga(action) {
  try {
    const phone_number = `+91${action.payload}`;
    const response = yield call(axios.post, BASE_URL+SEND_OTP, { phone_number }); // Use SEND_OTP endpoint
    yield put({ type: SEND_OTP_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: SEND_OTP_FAILURE, payload: error.message });
  }
}

// API call to verify OTP
function* verifyOtpSaga(action) {
  try {
    const { phone, code } = action.payload;
    const response = yield call(axios.post, BASE_URL+VERIFY_OTP, {
      phone_number: `+91${phone}`,
      otp_code: code,
    }); // Use VERIFY_OTP endpoint
    yield put({ type: VERIFY_OTP_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: VERIFY_OTP_FAILURE, payload: error.message });
  }
}

export default function* authSaga() {
  yield takeLatest(SEND_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
}
