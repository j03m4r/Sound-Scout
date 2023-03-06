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
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';

export const CheckSpotifyAuthenticated = () => async (dispatch, getState) => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    try {
        const response = await axios.get(`http://127.0.0.1:8000/spotify/is-authenticated`, config);
        if (response.data.isAuthenticated) {
            dispatch({
                type: AUTHENTICATION,
                payload: response.data.isAuthenticated
            });
        } else {
            dispatch({
                type: AUTHENTICATION,
                payload: false
            });
        }
        
    } catch {
        dispatch({
            type: AUTHENTICATION,
            payload: false
        });
    }
};

export const GetSpotifyCreds = () => async (dispatch, getState)  => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    try {
        const response = await axios.get(`http://127.0.0.1:8000/spotify/get-credentials`, config);
        dispatch({
            type: CREDS_SUCCESS,
            payload: response.data
        });
    } catch {
        dispatch({
            type: CREDS_FAIL
        });
    }
};

export const GetSpotifyCode = () => async (dispatch, getState) => {
    await dispatch(GetSpotifyCreds());
    const { clientId, isAuthenticated } = getState().Spotify;
    const { authToken } = getState().Authentication;
    const redirectUri = AuthSession.getRedirectUrl();
    const scopesArr = ['user-read-playback-state', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-private',
    'user-top-read', 'app-remote-control', 'user-read-playback-position']
    const scopes = scopesArr.join(' ');
    let code = '';

    if (!isAuthenticated) {
        try {
            const result = await AuthSession.startAsync({
            authUrl:
                `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`,
            })
            code = result.params.code
        } catch (err) {
            console.error(err)
        }

        if (code !== '') {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                }
            };

            const body = JSON.stringify({ code });
            try {
                const response = await axios.post('http://127.0.0.1:8000/spotify/token', body, config);
                if (response.Success) {
                    dispatch({
                        type: CODE_SUCCESS,
                        payload: response.data
                    });
                }
            } catch {
                dispatch({
                    type: CODE_FAIL
                });
            }
        }
    }
    dispatch(GetPersonalTracks());
};

export const GetPersonalTracks = () => async (dispatch, getState)  => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    try {
        const response = await axios.get(`http://127.0.0.1:8000/spotify/get-personal-tracks`, config);
        dispatch({
            type: TRACKS_SUCCESS,
            payload: response.data
        });
    } catch {
        dispatch({
            type: TRACKS_FAIL
        });
    }
}; 

export const PlayTrack = (song_id) => async (dispatch, getState) => {
    const { authToken } = getState().Authentication; 
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    const body = JSON.stringify({ song_id });
    try {
        const response = await axios.post('http://127.0.0.1:8000/spotify/play-track', body, config);
        dispatch({
            type: PLAY_SUCCESS,
            payload: response.data
        });
    } catch {
        dispatch({
            type: PLAY_FAIL,
            payload: false
        });
    }
};

export const PauseTrack = () => async (dispatch, getState) => {
    const { authToken } = getState().Authentication;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${authToken}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders
    };

    fetch("http://127.0.0.1:8000/spotify/pause-track", requestOptions)
    .then(response => {
        dispatch({
            type: PAUSE_SUCCESS,
            payload: response
        })
    })
};