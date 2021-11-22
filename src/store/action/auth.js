import * as actionTypes from './actionTypes';
import axios from '../../resources/axios';
import history from '../../resources/history';

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
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};



export const signin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('/login', {email: username, password: password})
        .then(res => {
            console.log(res.data)
            dispatch(authSuccess(res.data.user.id))
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('email', res.data.user.email);
            localStorage.setItem('role', res.data.user.role);
            history.push('/dashboard');
        })
        .catch(err => {
            dispatch(authFail(err.message));
        })
    }
}