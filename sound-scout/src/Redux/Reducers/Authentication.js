import {
    AUTHENTICATION,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../Types/Authentication';

const initialState = {
    isAuthenticated: false
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTHENTICATION:
            return {
                ...state,
                isAuthenticated: payload
            }
        default:
            return state
    }
};