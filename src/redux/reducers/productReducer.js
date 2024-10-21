import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST,FETCH_PRODUCTS_SUCCESS } from "../ActionType";


const initialState = {
    loading: false,
    products: [],
    error: null,
  };
  

  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return { ...state, loading: true }; // Sets loading to true when request starts
  
      case 'FETCH_PRODUCTS_SUCCESS':
        return { ...state, loading: false, products: action.payload }; // Updates state with the fetched products
  
      case 'FETCH_PRODUCTS_FAILURE':
        return { ...state, loading: false, error: action.payload }; // Sets error in case of failure
  
      default:
        return state;
    }
  };
  
  
  export default productReducer;
  