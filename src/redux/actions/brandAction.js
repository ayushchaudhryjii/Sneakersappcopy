import {FETCH_BRAND_REQUEST,FETCH_BRAND_SUCCESS,FETCH_BRAND_FAILURE} from '../ActionType';


export const fetchBrandsRequest = () => ({
    type: FETCH_BRAND_REQUEST,
  });
  
  export const fetchBrandsSuccess = (products) => ({
    type: FETCH_BRAND_SUCCESS,
    payload: products,
  });
  
  export const fetchBrandsFailure = (error) => ({
    type: FETCH_BRAND_FAILURE,
    payload: error,
  });

