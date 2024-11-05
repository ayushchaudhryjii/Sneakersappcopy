import {
  FETCH_BRAND_FAILURE,
  FETCH_BRAND_SUCCESS,
  FETCH_SIZES_SUCCESS,
  FETCH_SIZES_FAILURE,
  FETCH_RELEASE_YEARS_SUCCESS,
  FETCH_RELEASE_YEARS_FAILURE,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_FAILURE,
} from "../ActionType";

const initialState = {
  brands: [],
  sizes: [],
  releaseYears: [],
  searchResults: [],
  error: null,
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRAND_SUCCESS:
      return { ...state, brands: action.payload, error: null };
    case FETCH_SIZES_SUCCESS:
      return { ...state, sizes: action.payload, error: null };
    case FETCH_RELEASE_YEARS_SUCCESS:
      return {
        ...state,
        releaseYears: action.payload.release_years,
        error: null,
      };
    case SEARCH_PRODUCT_SUCCESS:
      return { ...state, searchResults: action.payload, error: null };
    case FETCH_BRAND_FAILURE:
    case FETCH_SIZES_FAILURE:
    case FETCH_RELEASE_YEARS_FAILURE:
      return { ...state, error: action.error };
    case SEARCH_PRODUCT_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default filtersReducer;
