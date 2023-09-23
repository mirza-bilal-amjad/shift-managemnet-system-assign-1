import {SET_THEME} from "./LightDarkModeConstants";

const initialState = {
    darkMode: false,
}
export const LightDarkModeReducer = (state = initialState, action: { type: string; data: boolean; }) => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                darkMode: action.data
            }
        default:
            return state
    }
}
