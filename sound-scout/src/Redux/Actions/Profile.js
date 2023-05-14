import {
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,
    PERSONAL_PROFILE_SUCCESS,
    PERSONAL_PROFILE_FAIL,
    OTHER_PROFILE_SUCCESS,
    SET_PROFILE_SUCCESS,
    SENT_MESSAGE_SUCCESS,
    SENT_MESSAGE_FAIL,
    GET_CONVERSATIONS_SUCCESS,
    GET_CONVERSATIONS_FAIL,
    GET_CONVERSATION_SUCCESS,
    GET_CONVERSATION_FAIL,
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
    dispatch(GetProfile(username));
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
    dispatch(GetProfile(username));
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

export const SetConversation = (conversation) => dispatch => {
    dispatch({
        type: SET_PROFILE_SUCCESS,
        payload: conversation
    })
}

export const GetConversations = () => async (dispatch, getState) => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };
    try {
        const response = await axios.get(`${API_URL}/authentication/get-conversations`, config);
        if (response.data.Success) {
            dispatch({
                type: GET_CONVERSATIONS_SUCCESS,
                payload: response.data
            });
        } else {
            dispatch({
                type: GET_CONVERSATIONS_FAIL
            });
        }
    } catch {
        dispatch({
            type: GET_CONVERSATIONS_FAIL
        }); 
    }
};

export const GetConversation = (username) => async (dispatch, getState) => {
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
        const response = await axios.post(`${API_URL}/authentication/get-conversation`, body, config);
        if (response.data.Success) {
            dispatch({
                type: GET_CONVERSATION_SUCCESS,
                payload: response.data
            });
        } else {
            dispatch({
                type: GET_CONVERSATION_FAIL
            });
        }
        
    } catch {
        dispatch({
            type: GET_CONVERSATION_FAIL
        });
    }
};

export const SendTextMessage = (username, text) => async (dispatch, getState) => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };
    const type = 'text'
    const body = JSON.stringify({ username, text, type });
    try {
        const response = await axios.post(`${API_URL}/authentication/send-message`, body, config);
        dispatch({
            type: SENT_MESSAGE_SUCCESS,
            payload: response.data
        });
    } catch {
        dispatch({
            type: SENT_MESSAGE_FAIL
        });
    }
    dispatch(GetConversation(username));
    dispatch(GetConversations());
};

export const SendTrackMessage = (username, song_id) => async (dispatch, getState) => {
    const { authToken } = getState().Authentication;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };
    const type = 'track'
    const body = JSON.stringify({ username, song_id, type });
    try {
        const response = await axios.post(`${API_URL}/authentication/send-message`, body, config);
        dispatch({
            type: SENT_MESSAGE_SUCCESS,
            payload: response.data
        });
    } catch {
        dispatch({
            type: SENT_MESSAGE_FAIL
        });
    }
    dispatch(GetConversation(username));
    dispatch(GetConversations());
};