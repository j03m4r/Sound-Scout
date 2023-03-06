import {
    AUTHENTICATION,
    CREDS_SUCCESS,
    CREDS_FAIL,
    CODE_SUCCESS,
    CODE_FAIL,
    TRACKS_SUCCESS,
    TRACKS_FAIL,
    PLAY_SUCCESS,
    PLAY_FAIL,
    PAUSE_SUCCESS,
    PAUSE_FAIL
} from '../Types/Spotify';

const initialState = {
    isAuthenticated: false,
    accessCode: '',
    clientId: '',
    clientSecret: '',
    topTracks: [],
    isPlaying: false
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
        case PLAY_SUCCESS:
        case PLAY_FAIL:
        case PAUSE_SUCCESS:
            return {
                ...state,
                isPlaying: payload.isPlaying
            }
        case PAUSE_FAIL:
        case TRACKS_FAIL:
        case CODE_FAIL:
        case CREDS_FAIL:
        default:
            return state
    }
};