import {ADD_TO_MY_SHIFTS, CANCEL_MY_SHIFT} from "./MyShiftConstants";

const initialState: any[] = []

export const MyShiftReducer = (state = initialState, action: any) => {

    switch (action.type) {

        case ADD_TO_MY_SHIFTS:
            if (state.some(item => item.id === action.data.id)) {
                return state; // Item already exists, return the same state
            } else {
                return [...state, action.data]; // Item doesn't exist, add it to the cart
            }
        case CANCEL_MY_SHIFT:
            return state.filter(item => item.id !== action.data.id);
        default:
            return state;
    }
};
