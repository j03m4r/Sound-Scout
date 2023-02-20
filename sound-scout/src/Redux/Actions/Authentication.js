import {
    AUTHENTICATION,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from '../Types/Authentication';
import axios from 'axios';

export const CheckAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const response = await axios.get(`http://127.0.0.1:8000/authentication/is-authenticated`, config);
    try {
        dispatch({
            type: AUTHENTICATION,
            payload: response.data.isAuthenticated
        });
    } catch (error) {
        dispatch({
            type: AUTHENTICATION,
            payload: false
        })
    }
};