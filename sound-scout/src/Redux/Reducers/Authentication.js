import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    TOKEN_SUCCESS,
    TOKEN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    IS_AUTHENTICATED_SUCCESS
} from '../Types/Authentication';

const initialState = {
    isAuthenticated: false,
    authToken: '',
    username: ''
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case IS_AUTHENTICATED_SUCCESS:
            return {
                ...state,
                authToken: payload.token,
                username: payload.username,
                isAuthenticated: true
            }
        case TOKEN_SUCCESS:
            return {
                ...state,
                authToken: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: payload
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