import {
  FETCH_BRAND_REQUEST,
  FETCH_BRAND_SUCCESS,
  FETCH_BRAND_FAILURE,
} from "../ActionType";

const initialState = {
  loading: false,
  brand: [],
  error: null,
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRAND_REQUEST:
      return { ...state, loading: true };

    case FETCH_BRAND_SUCCESS:
      return { ...state, loading: false, brand: action.payload };

    case FETCH_BRAND_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default brandReducer;
