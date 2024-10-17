import axios from "axios";
import BASE_URL from "./EndPoint";
import { SEND_OTP, PRODUCTS_LIST } from "./EndPoint";

export const sentOTP = async (phone) => {
  try {
    const response = await axios.post(BASE_URL + SEND_OTP, {
      phone_number: phone,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchProductListAPI = async () => {
  try {
    const response = await axios.get(BASE_URL + PRODUCTS_LIST);
    return response.data;
  } catch (error) {
    return error;
  }
};
