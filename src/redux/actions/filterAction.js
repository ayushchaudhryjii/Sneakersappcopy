import {
    FETCH_BRAND_REQUEST,
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_FAILURE,
    FETCH_SIZES_REQUEST,
    FETCH_SIZES_SUCCESS,
    FETCH_SIZES_FAILURE,
    FETCH_RELEASE_YEARS_REQUEST,
    FETCH_RELEASE_YEARS_SUCCESS,
    FETCH_RELEASE_YEARS_FAILURE,
    SEARCH_PRODUCT_REQUEST, 
    SEARCH_PRODUCT_SUCCESS, 
    SEARCH_PRODUCT_FAILURE
  } from '../ActionType';
  
  // Fetch Brands
  export const fetchBrandsRequest = () => ({
    type: FETCH_BRAND_REQUEST,
  });

  export const fetchBrandsSuccess = (brands) => ({
    type: FETCH_BRAND_SUCCESS,
    payload: brands,
  });
  
  export const fetchBrandsFailure = (error) => ({
    type: FETCH_BRAND_FAILURE,
    error,
  });
  
  // Fetch Sizes
  export const fetchSizesRequest = () => ({
    type: FETCH_SIZES_REQUEST,
  });
  
  export const fetchSizesSuccess = (sizes) => ({
    type: FETCH_SIZES_SUCCESS,
    payload: sizes,
  });
  
  export const fetchSizesFailure = (error) => ({
    type: FETCH_SIZES_FAILURE,
    error,
  });
  
  // Fetch Release Years
  export const fetchReleaseYearsRequest = () => ({
    type: FETCH_RELEASE_YEARS_REQUEST,
  });
  
  export const fetchReleaseYearsSuccess = (releaseYears) => ({
    type: FETCH_RELEASE_YEARS_SUCCESS,
    payload: releaseYears,
  });
  
  export const fetchReleaseYearsFailure = (error) => ({
    type: FETCH_RELEASE_YEARS_FAILURE,
    error,
  });
  
  // Search Product Request
export const searchProductRequest = (query) => ({
  type: SEARCH_PRODUCT_REQUEST,
  payload: query,
});

export const searchProductSuccess = (products) => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: products,
});

export const searchProductFailure = (error) => ({
  type: SEARCH_PRODUCT_FAILURE,
  error,
});