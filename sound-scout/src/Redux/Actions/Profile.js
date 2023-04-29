import {
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,
    PERSONAL_PROFILE_SUCCESS,
    PERSONAL_PROFILE_FAIL,
    OTHER_PROFILE_SUCCESS,
    OTHER_PROFILE_FAIL
} from '../Types/Profile';
import axios from 'axios';
import { API_URL } from '../ApiVariables'

export const follow = (username) => async (dispatch, getState) => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    const body = JSON.stringify({ username });
    try {
        const response = await axios.post(`${API_URL}/authentication/follow`, body, config);
        if (response.Success) {
            dispatch({
                type: FOLLOW_SUCCESS,
                payload: response.data
            });
        }
    } catch {
        dispatch({
            type: FOLLOW_FAIL
        });
    }
}

export const unfollow = (username) => async (dispatch, getState) => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    const body = JSON.stringify({ username });
    try {
        const response = await axios.post(`${API_URL}/authentication/unfollow`, body, config);
        if (response.Success) {
            dispatch({
                type: UNFOLLOW_SUCCESS,
                payload: response.data
            });
        }
    } catch {
        dispatch({
            type: UNFOLLOW_FAIL
        });
    }
}

export const GetProfile = (user) => async (dispatch, getState) => {
    const { authToken, username} = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    const body = JSON.stringify({ user });
    try {
        const response = await axios.post(`${API_URL}/authentication/profile`, body, config);
        if (username===user) {
            // console.log(response.data)
            dispatch({
                type: PERSONAL_PROFILE_SUCCESS,
                payload: response.data
            });
        } else {
            dispatch({
                type: OTHER_PROFILE_SUCCESS,
                payload: response.data
            }); 
        }
        
    } catch {
        dispatch({
            type: PERSONAL_PROFILE_FAIL
        });
    }
};