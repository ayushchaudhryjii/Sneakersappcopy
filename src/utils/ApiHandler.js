import axios from "axios";
import BASE_URL from "./EndPoint";

import {
  SEND_OTP,
  VERIFY_OTP,
  CREATE_PROFILE,
  GET_PROFILE,
  BRAND_LIST,
  SIZE_LIST,
  RLEASE_YEAR_LIST,
  SEARCH_PRODUCT,
  SOCIAL_LOGIN,
} from "./EndPoint";

// send otp
export const sendOtpAPI = async (phone) => {
  console.log(phone, "calll");
  try {
    const response = await axios.post(BASE_URL + SEND_OTP, {
      phone_number: phone,
    });
    console.log("response", response);
    return response;
  } catch (error) {
    return error;
  }
};

// verify otp
export const verifyOtpAPI = async (phone, otp) => {
  try {
    const response = await axios.post(BASE_URL + VERIFY_OTP, {
      phone_number: phone,
      otp_code: otp,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const createProfileAPI = async (profileData, token) => {
  console.log("Token:", token);

  // Create FormData
  const formData = new FormData();
  formData.append("user[first_name]", profileData.firstName);
  formData.append("user[last_name]", profileData.lastName);
  formData.append("user[email]", profileData.email);

  if (profileData.imageUri) {
    formData.append("user[image]", {
      uri: profileData.imageUri,
      type: "image/jpeg", 
      name: "profile_image.jpg", 
    });
  }

  try {
    const response = await axios({
      method: "put",
      url: `${BASE_URL}${CREATE_PROFILE}`,
      data: formData,
      headers: {
        Authorization: token, // Ensure the token is correctly passed
        "Content-Type": "multipart/form-data", // Required for FormData
      },
    });

    console.log("Profile updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while creating profile:", error);
    return error;
  }
};

// export const createProfileAPI = async (profileData, token) => {
//   console.log("profileData", profileData, token);

//   // const formData = new FormData();
//   // formData.append("user[first_name]", profileData.firstName);
//   // formData.append("user[last_name]", profileData.lastName);
//   // formData.append("user[email]", profileData.email);

//   // Assuming `profileData.imageUri` is a URI string, use a file object if required by the server.
//   const imageFile = {
//     uri: profileData.imageUri,
//     type: "image/jpeg", // or 'image/png'
//     name: "profileImage.jpg", // A filename is required here
//   };
//   formData.append("user[image]", imageFile);

//   console.log("FormData", formData);
//   const data ={
//     user[first_name]: profileData.firstName,
//     user[last_name]: profileData.lastName,
//     user[email]: profileData.email,
//     user[image]: imageFile,

//   }

//   try {
//     const response = await axios.put(`${BASE_URL}${CREATE_PROFILE}`, formData, {
//       headers: {
//         Authorization: token,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("Profile updated successfully", response);
//     return response;
//   } catch (error) {
//     console.log("Error while creating profile:", error);
//     return error;
//   }
// };

// Function to fetch brand list
export const fetchBrandListAPI = async () => {
  try {
    const response = await axios.get(BASE_URL + BRAND_LIST);
    return response;
  } catch (error) {
    console.error("Error fetching brand list:", error);
    throw error;
  }
};

// Function to fetch size list
export const fetchSizeListAPI = async () => {
  try {
    const response = await axios.get(BASE_URL + SIZE_LIST);
    return response;
  } catch (error) {
    console.error("Error fetching size list:", error);
    throw error;
  }
};

// Function to fetch release year list
export const fetchReleaseYearListAPI = async () => {
  try {
    const response = await axios.get(BASE_URL + RLEASE_YEAR_LIST);
    return response;
  } catch (error) {
    console.error("Error fetching release year list:", error);
    throw error;
  }
};

export const searchProductAPI = async ({
  query,
  brand = "",
  size = "",
  release_year = "",
}) => {
  console.log("Query Params:", { query, brand, size, release_year });

  try {
    const response = await axios.get(BASE_URL + SEARCH_PRODUCT, {
      params: {
        name: query || "",
        brands: brand || "",
        sizes: size || "",
        release_year: release_year || "",
      },
    });
    return response;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

// Function to get the profile data
export const getProfileAPI = async (token) => {
  try {
    const response = await axios.get(BASE_URL + GET_PROFILE, {
      headers: {
        Authorization: token,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
