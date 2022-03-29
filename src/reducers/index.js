import { combineReducers } from "redux";
import  userReducer  from "./userReducer";
import articalReducer from "./articleReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    articalState : articalReducer,
});

export default rootReducer;