import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import BASE_URL, {
  BRAND_LIST,
  PRODUCTS_LIST,
  SEND_OTP,
  VERIFY_OTP,
} from "../../utils/EndPoint";
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  PROFILE_CREATION_FAILURE,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_REQUEST,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  FETCH_BRAND_REQUEST,
} from "../ActionType";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../actions/authAction";
import { fetchBrandsFailure, fetchBrandsSuccess } from "../actions/brandAction";

function* sendOtpSaga(action) {
  console.log("action", action);
  try {
    const phone_number = action.payload;
    console.log("phone_number", phone_number);
    const response = yield call(axios.post, BASE_URL + SEND_OTP, {
      phone_number,
    });
    console.log("API Response:", response);
    yield put({ type: SEND_OTP_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error in sendOtpSaga:", error.message);
    yield put({ type: SEND_OTP_FAILURE, payload: error.message });
  }
}

function* verifyOtpSaga(action) {
  console.log("action:::::", action);
  try {
    const { phone, code } = action.payload;
    const response = yield call(axios.post, BASE_URL + VERIFY_OTP, {
      phone_number: phone,
      otp_code: code,
    });
    console.log("API Response: VERFYY", response);
    // if (response.status === 200) {
    yield put({ type: VERIFY_OTP_SUCCESS, payload: response.data });
    // } else {
    //   yield put({ type: VERIFY_OTP_FAILURE, payload: "OTP verification failed." });
    // }
  } catch (error) {
    yield put({
      type: VERIFY_OTP_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
}

function* fetchProductsSaga() {
  try {
    const response = yield call(axios.get, BASE_URL + PRODUCTS_LIST);
    console.log("Product API Response:", response);
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    console.error("Error in fetchProductsSaga:", error.message);
    yield put(fetchProductsFailure(error.message));
  }
}

function* fetchBrandSaga() {
  try {
    const response = yield call(axios.get, BASE_URL + BRAND_LIST);
    console.log("BRand API Response:", response.data);
    yield put(fetchBrandsSuccess(response.data));
  } catch (error) {
    console.error("Error in fetchProductsSaga:", error.message);
    yield put(fetchBrandsFailure(error.message));
  }
}



function* createProfileSaga(action) {
  try {
    const { profileData, token } = action.payload;
    const response = yield call(axios.post, BASE_URL + '/create-profile', profileData, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token in the header
        'Content-Type': 'application/json',
      },
    });
    yield put({ type: CREATE_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: CREATE_PROFILE_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
}
export default function* authSaga() {
  yield takeLatest(SEND_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(FETCH_BRAND_REQUEST, fetchBrandSaga);
  yield takeLatest(CREATE_PROFILE_REQUEST, createProfileSaga);
}
