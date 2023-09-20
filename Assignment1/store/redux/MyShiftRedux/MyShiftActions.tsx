import {ADD_TO_MY_SHIFTS, CANCEL_MY_SHIFT} from "./MyShiftConstants";



export function addToMyShifts(item: any) {
    return {
        type: ADD_TO_MY_SHIFTS,
        data: item,
    }
};

export function cancelMyShifts(item: any) {
    return {
        type: CANCEL_MY_SHIFT,
        data: item,
    }
};



