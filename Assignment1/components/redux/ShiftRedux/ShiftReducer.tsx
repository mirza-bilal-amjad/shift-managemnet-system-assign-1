import {ADD_TO_SHIFTS, CANCEL_SHIFTS_AND_SET_FALSE, SET_BOOKED_TRUE} from "./ShiftConstants";

const initialState: any[] = []

export const ShiftReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case SET_BOOKED_TRUE:
            return state.map(shift =>
                shift.id === action.data.id
                    ? {...shift, booked: true}
                    : shift
            );
        case ADD_TO_SHIFTS:
            if (state.some(item => item.id === action.data.id)) {

                return state; // Item already exists, return the same state
            } else {
                let flag = action.data.startTime > new Date().getTime();
                if (flag)
                    return [...state, action.data]; // Item doesn't exist, add it to the cart

            }
        case CANCEL_SHIFTS_AND_SET_FALSE:
            return state.map(shift =>
                shift.id === action.data.id
                    ? {...shift, booked: false}
                    : shift
            );
        default:
            return state;
    }
};
