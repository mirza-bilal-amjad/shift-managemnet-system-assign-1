import {combineReducers} from "redux";
import {ShiftReducer} from "./ShiftRedux/ShiftReducer";
import {MyShiftReducer} from "./MyShiftRedux/MyShiftReducer";
import {LightDarkModeReducer} from "./LightDarkModeRedux/LightDarkModeReducer";
const MergeReducers = combineReducers({
    ShiftReducer,
    MyShiftReducer,
    LightDarkModeReducer,
})

export default MergeReducers;
