import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../resources/utility';
 
const INITIAL_STATE = {
    demographicData: [],
    error: null,
    loading: false,
    editStatus: false,
};

const phyStart = (state, action) => {
    return updateObject(state, {error: action.payload, loading: false,editStatus: false});
};

const phySuccess = (state, action) => {
    return updateObject(state, {
        demographicData: action.payload,
        error: null,
        loading: false, 
        editStatus: false
    });
};

const phyEditSuccess = (state, action) => {
    return updateObject(state, {
        editStatus: true
    });
};

const phyFail = (state, action) => {
    return updateObject(state, {error: action.payload, loading: false,editStatus: false});
};


const phyReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case actionTypes.PHY_DATA_START: return phyStart(state, action);
        case actionTypes.PHY_DATA_SUCCESS: return phySuccess(state, action);
        case actionTypes.PHY_DATA_EDIT_SUCCESS: return phyEditSuccess(state, action);
        case actionTypes.PHY_DATA_FAIL: return phyFail(state, action);
        default: return state;
    }
};

export default phyReducer;