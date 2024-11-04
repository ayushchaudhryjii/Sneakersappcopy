import { combineReducers } from "redux";
import { authReducer } from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import brandReducer from "./reducers/brandReducer";
const rootReducer = combineReducers({
    auth : authReducer,
    products:productReducer,
    brand:brandReducer,
})
export default rootReducer;