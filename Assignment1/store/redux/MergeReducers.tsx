import {combineReducers} from "redux";
import {ShiftReducer} from "./ShiftRedux/ShiftReducer";
import {MyShiftReducer} from "./MyShiftRedux/MyShiftReducer";
const MergeReducers = combineReducers({
    ShiftReducer,
    MyShiftReducer,
})

export default MergeReducers;
