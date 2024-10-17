import axios from "axios";
import BASE_URL from './EndPoint'
import { SEND_OTP } from "./EndPoint";

export const sentOTP = async (phone) => {
    try {
        const response = await axios.post(
          BASE_URL+SEND_OTP,
          {
            phone_number:phone,
          }
        );
        return response.data
      } catch (error) {
        return error;
      }
}