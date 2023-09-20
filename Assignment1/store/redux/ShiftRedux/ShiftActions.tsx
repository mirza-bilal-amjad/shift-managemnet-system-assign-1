import {ADD_TO_SHIFTS, CANCEL_SHIFTS_AND_SET_FALSE, SET_BOOKED_TRUE} from "./ShiftConstants";



export function addToShifts(item: any) {
    return {
        type: ADD_TO_SHIFTS,
        data: item,
    }
};

export function cancelShiftAndSetFalse(item: any) {
    return {
        type: CANCEL_SHIFTS_AND_SET_FALSE,
        data: item,
    }
};
export function setBookTrue(item: any) {
    return {
        type: SET_BOOKED_TRUE,
        data: item,
    }
};



