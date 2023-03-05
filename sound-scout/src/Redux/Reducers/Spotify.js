import {
    AUTHENTICATION,
    CREDS_SUCCESS,
    CREDS_FAIL,
    CODE_SUCCESS,
    CODE_FAIL 
} from '../Types/Spotify';

const initialState = {
    isAuthenticated: false,
    accessCode: '',
    clientId: '',
    clientSecret: ''
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case AUTHENTICATION:
            return {
                ...state,
                isAuthenticated: payload
            }
        case CREDS_SUCCESS:
            return {
                ...state,
                clientId: payload.clientId,
                clientSecret: payload.clientSecret,
            }
        case CODE_SUCCESS:
            return {
                ...state,
                accessCode: payload.code
            }
        case CODE_FAIL:
        case CREDS_FAIL:
        default:
            return state
    }
};