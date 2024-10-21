import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
const rootReducer = combineReducers({
    auth : authReducer,
    products:productReducer
})
export default rootReducer;