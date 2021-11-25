
import { updateObject } from '../../resources/utility';
import * as actionTypes from '../action/actionTypes';
const INITIAL_STATE = {
    // userId: null,
    postcallData:null,
    getcallData:[],
    deleteCallData:null,
    putCallData:null,
    error: null,
    loading: false
};

const masterStart = (state, action) => {
    return updateObject(state, {error: action.payload, loading: false});
};

const masterPostcallSuccess = (state, action) => {
    console.log('action from post call reducer master---->',action.payload)
    return updateObject(state, {
        postcallData: action.payload,
        error: null,
        loading: false, 
    });
};
const masterGetcallSuccess = (state, action) => {
    console.log('action from get call reducer master---->',action.payload)
    return updateObject(state, {
        getcallData: action.payload,
        error: null,
        loading: false, 
    });
};
const masterDeletecallSuccess = (state, action) => {
    console.log('action from get call reducer master---->',action.payload)
    return updateObject(state, {
        deleteCallData: action.payload,
        error: null,
        loading: false, 
    });
};
const masterPutcallSuccess = (state, action) => {
    console.log('action from put call reducer master---->',action.payload)
    return updateObject(state, {
        putCallData: action.payload,
        error: null,
        loading: false, 
    });
};
const masterFail = (state, action) => {
    return updateObject(state, {error: action.payload, loading: false});
};

const mAllergiesReducer = (state = INITIAL_STATE, action) => {
    console.log('action put call--->',action)
    switch(action.type){
        case actionTypes.MASTER_START : return masterStart(state, action);
        case actionTypes.MASTER_POSTCALL_SUCCESS: return masterPostcallSuccess(state, action);
        case actionTypes.MASTER_GETCALL_SUCCESS: return masterGetcallSuccess(state, action);
        case actionTypes.MASTER_DELETECALL_SUCCESS: return masterDeletecallSuccess(state, action); 
        case actionTypes.MASTER_PUTCALL_SUCCESS: return masterPutcallSuccess(state, action); 
        case actionTypes.MASTER_FAIL: return masterFail(state, action);
        default: return state;
    }
};

export default mAllergiesReducer;