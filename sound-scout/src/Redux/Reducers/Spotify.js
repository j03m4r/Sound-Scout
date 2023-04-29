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
    PAUSE_FAIL,
    CURRENT_TRACK_SUCCESS,
    CURRENT_TRACK_FAIL,
    REPEAT_TRACK_SUCCESS,
    REPEAT_TRACK_FAIL,
    GET_GENRES_SUCCESS,
    GET_GENRES_FAIL,
    LIKE_TRACK_SUCCESS,
    LIKE_TRACK_FAIL,
    DISCOVER_TRACKS_SUCCESS,
    DISCOVER_TRACKS_FAIL
} from '../Types/Spotify';

const initialState = {
    isAuthenticated: false,
    accessCode: '',
    clientId: '',
    clientSecret: '',
    topTracks: [],
    tracks: [],
    genres: [],
    isPlaying: false,
    progress: 0,
    trackLikes: [],
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
                topTracks: payload.tracks,
                tracks: payload.tracks
            }
        case PLAY_SUCCESS:
            return {
                ...state,
                isPlaying: payload.isPlaying
            }
        case PLAY_FAIL:
        case PAUSE_SUCCESS:
            return {
                ...state,
                isPlaying: payload.isPlaying
            }
        case CURRENT_TRACK_SUCCESS:
            return {
                ...state,
                progress: payload.progress
            }
        case GET_GENRES_SUCCESS:
            return {
                ...state,
                genres: payload
            }
        case DISCOVER_TRACKS_SUCCESS:
            return {
                ...state,
                tracks: payload.tracks
            }
        case LIKE_TRACK_SUCCESS:
            return {
                ...state,
                trackLikes: payload.likes
            }
        case DISCOVER_TRACKS_FAIL:
        case LIKE_TRACK_FAIL:
        case GET_GENRES_FAIL:
        case REPEAT_TRACK_SUCCESS:
        case REPEAT_TRACK_FAIL:
        case CURRENT_TRACK_FAIL:
        case PAUSE_FAIL:
        case TRACKS_FAIL:
        case CODE_FAIL:
        case CREDS_FAIL:
        default:
            return state
    }
};