import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    TOKEN_SUCCESS,
    TOKEN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../Types/Authentication';

const initialState = {
    isAuthenticated: false,
    authToken: ''
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case TOKEN_SUCCESS:
            return {
                ...state,
                authToken: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
        case LOGIN_SUCCESS:
        case LOGIN_FAIL:
        case TOKEN_FAIL:
        case LOGOUT_FAIL:
        default:
            return state
    }
};