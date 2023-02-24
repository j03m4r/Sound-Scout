import {
    AUTHENTICATION,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    TOKEN_SUCCESS,
    TOKEN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../Types/Authentication';
import axios from 'axios';

export const CheckAuthenticated = (authToken) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    try {
        const response = await axios.get(`http://127.0.0.1:8000/authentication/is-authenticated`, config);
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

export const GetToken = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, password });
    try {
        const response = await axios.post(`http://127.0.0.1:8000/authentication/get-auth-token`, body, config);
        dispatch({
            type: TOKEN_SUCCESS,
            payload: response.data.token
        })
    } catch {
        dispatch({
            type: TOKEN_FAIL
        });
    }
    dispatch(Login(username, password));
};

export const Register = (username, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ username, password, re_password });
    try {
        const response = await axios.post(`http://127.0.0.1:8000/authentication/register`, body, config);
        if (response.data.Success) {
            dispatch({
                type: REGISTER_SUCCESS,
            });
        } else {
            dispatch({
                type: REGISTER_FAIL
            });
        }
    } catch {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const Login = (username, password, authToken) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/authentication/login`, body, config);
        if (response.data.Success) {
            dispatch({
                type: LOGIN_SUCCESS
            });
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const Logout = (authToken) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    }; 

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/authentication/logout`, config);
        if (response.data.SUCCESS) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
        
    } catch {
        dispatch({
            type: LOGOUT_FAIL
        });
    } 
};