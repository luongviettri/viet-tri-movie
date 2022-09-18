import { DISPLAY_LOADING, HIDE_LOADING } from "../actions/types/LoadingTypes";

const initialState = {
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DISPLAY_LOADING: {
            console.log("Len day");
            return { ...state, isLoading: true }
        }
        case HIDE_LOADING: {
            console.log("ok");
            return { ...state, isLoading: false }
        }

        default:
            return state
    }
}
