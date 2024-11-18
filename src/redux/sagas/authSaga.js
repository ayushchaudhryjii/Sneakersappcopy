import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import BASE_URL, {
  BRAND_LIST,
  CREATE_PROFILE,
  GET_PROFILE,
  PRODUCTS_LIST,
  RLEASE_YEAR_LIST,
  SEARCH_PRODUCT,
  SEND_OTP,
  SIZE_LIST,
  VERIFY_OTP,
} from "../../utils/EndPoint";
import {
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
  FETCH_PRODUCTS_REQUEST,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAILURE,
  FETCH_BRAND_REQUEST,
  SEARCH_PRODUCT_REQUEST,
  FETCH_SIZES_REQUEST,
  FETCH_RELEASE_YEARS_REQUEST,
  GET_PROFILE_REQUEST,
} from "../ActionType";
import {
  fetchProductsSuccess,
  fetchProductsFailure,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  createProfileSuccess,
  createProfileFailure,
  getProfileSuccess,
  getProfileFailure,
} from "../actions/authAction";

import {
  fetchBrandsFailure,
  fetchBrandsSuccess,
  fetchReleaseYearsFailure,
  fetchReleaseYearsSuccess,
  fetchSizesFailure,
  fetchSizesSuccess,
  searchProductSuccess,
  searchProductFailure,
} from "../actions/filterAction";

function* sendOtpSaga(action) {
  console.log("action", action);
  try {
    const phone_number = action.payload;
    console.log("phone_number", phone_number);
    const response = yield call(axios.post, BASE_URL + SEND_OTP, {
      phone_number,
    });
    console.log("API Response: SENT OTP", response);
    yield put(sendOtpSuccess(response.data));
  } catch (error) {
    console.error("Error in sendOtpSaga:", error.message);
    yield put(sendOtpFailure(error.message));
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
    yield put({ type: VERIFY_OTP_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({
      type: VERIFY_OTP_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
}

function* getProfileSaga(action) {
  console.log("Fetching profile with token:", action.payload);
  try {
    const response = yield call(axios.get, BASE_URL + GET_PROFILE, {
      headers: { Authorization: `${action.payload}` },
    });
    console.log("API Response: PROFILE FETCH", response.data);
    yield put(getProfileSuccess(response.data));
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    yield put(getProfileFailure(error.message));
  }
}

function* createProfileSaga(action) {
  try {
    const { profileData, token } = action.payload;
    const profileData1 = new FormData();
    profileData1.append("user[first_name]", profileData.firstName);
    profileData1.append("user[last_name]", profileData.lastName);
    profileData1.append("user[email]", profileData.email);

    // Check if imageUri is a base64 string
    if (profileData.imageUri.startsWith("data:image")) {
      profileData1.append("user[image]", profileData.imageUri); // Sending as a base64 string directly
    } else {
      profileData1.append("user[image]", {
        uri: profileData.imageUri,
        name: 'profile.jpg', // Adjust the name as needed
        type: 'image/jpeg',  // Adjust the type based on your image format
      });
    }

    const response = yield call(
      axios.post,
      BASE_URL + CREATE_PROFILE,
      profileData1,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("API CREATE PROFILE", response.data);
    yield put(createProfileSuccess(response.data));
  } catch (error) {
    yield put(
      createProfileFailure(
        error.response ? error.response.data.message : error.message
      )
    );
  }
}


function* fetchProductsSaga() {
  try {
    const response = yield call(axios.get, BASE_URL + PRODUCTS_LIST);
    // console.log("Product API Response:", response);
    yield put(fetchProductsSuccess(response.data));
  } catch (error) {
    console.error("Error in fetchProductsSaga:", error.message);
    yield put(fetchProductsFailure(error.message));
  }
}

function* searchProductSaga(action) {
  console.log("action eeee", action);
  try {
    const name = action.payload;
    // Pass the name as a query parameter using 'params' in Axios
    const response = yield call(axios.get, `${BASE_URL + SEARCH_PRODUCT}`, {
      params: { name },
    });
    console.log("seachhhh API Response:", response.data);
    yield put(searchProductSuccess(response.data));
  } catch (error) {
    console.log("Error in searchProductSaga:", error.message);
    yield put(searchProductFailure(error.message));
  }
}

function* fetchBrandSaga() {
  try {
    const response = yield call(axios.get, BASE_URL + BRAND_LIST);
    // console.log("BRand API Response:", response.data);
    yield put(fetchBrandsSuccess(response.data));
  } catch (error) {
    console.error("Error in fetchProductsSaga:", error.message);
    yield put(fetchBrandsFailure(error.message));
  }
}

function* fetchSizesSaga() {
  try {
    const response = yield call(axios.get, BASE_URL + SIZE_LIST);
    // console.log("Size API Response:", response.data);
    yield put(fetchSizesSuccess(response.data));
  } catch (error) {
    console.error("Error in fetchProductsSaga:", error.message);
    yield put(fetchSizesFailure(error.message));
  }
}

function* fetchReleaseYearsSaga() {
  try {
    const response = yield call(axios.get, BASE_URL + RLEASE_YEAR_LIST);
    // console.log("Release API Response:", response.data);
    yield put(fetchReleaseYearsSuccess(response.data));
  } catch (error) {
    console.error("Error in fetchProductsSaga:", error.message);
    yield put(fetchReleaseYearsFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(SEND_OTP_REQUEST, sendOtpSaga);
  yield takeLatest(VERIFY_OTP_REQUEST, verifyOtpSaga);
  yield takeLatest(GET_PROFILE_REQUEST, getProfileSaga);
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
  yield takeLatest(FETCH_BRAND_REQUEST, fetchBrandSaga);
  yield takeLatest(FETCH_SIZES_REQUEST, fetchSizesSaga);
  yield takeLatest(FETCH_RELEASE_YEARS_REQUEST, fetchReleaseYearsSaga);
  yield takeLatest(CREATE_PROFILE_REQUEST, createProfileSaga);
  yield takeLatest(SEARCH_PRODUCT_REQUEST, searchProductSaga);
}
