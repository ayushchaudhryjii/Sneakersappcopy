import { combineReducers } from "redux";
import Reducer from "./Reducer";
const rootReducer = combineReducers({
    auth : Reducer
})
export default rootReducer;