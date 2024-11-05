import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import filtersReducer from "./reducers/filterReducer";
const rootReducer = combineReducers({
    auth : authReducer,
    products:productReducer,
    filter:filtersReducer
})
export default rootReducer;