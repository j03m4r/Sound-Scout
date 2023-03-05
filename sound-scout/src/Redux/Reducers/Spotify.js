import {
    AUTHENTICATION,
    CREDS_SUCCESS,
    CREDS_FAIL,
    CODE_SUCCESS,
    CODE_FAIL,
    TRACKS_SUCCESS,
    TRACKS_FAIL
} from '../Types/Spotify';

const initialState = {
    isAuthenticated: false,
    accessCode: '',
    clientId: '',
    clientSecret: '',
    topTracks: {}
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
        case TRACKS_SUCCESS:
            return {
                ...state,
                topTracks: payload.tracks
            }
        case TRACKS_FAIL:
        case CODE_FAIL:
        case CREDS_FAIL:
        default:
            return state
    }
};