import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../resources/utility';
 
const INITIAL_STATE = {
    userId: null,
    error: null,
    loading: false 
};

const authStart = (state, action) => {
    return updateObject(state, {error: action.payload, loading: false});
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.payload,
        error: null,
        loading: false, 
    });
};

const authFail = (state, action) => {
    return updateObject(state, {error: action.payload, loading: false});
};

const authLogout = (state) => {
    return updateObject(state, {
        userId: null,
        error: null,
        loading: false, 
    });
}

const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default authReducer;