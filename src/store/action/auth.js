import * as actionTypes from './actionTypes';
import axios from '../../resources/axios';
import history from '../../resources/history';
import {NotificationManager} from 'react-notifications';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: userId
    }
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
};

export const authLogout = () => {
    localStorage.clear();
    history.push('/');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const signin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/login', {email: username, password: password})
        .then(res => {
            dispatch(authSuccess(res.data.user.id))
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('role', res.data.user.role);
            localStorage.setItem('user_id', res.data.user.id);
            history.push('/dashboard');
            NotificationManager.success("Login Successfully")
        })
        .catch(err => {
            dispatch(authFail(err.message));
        })
    }
}