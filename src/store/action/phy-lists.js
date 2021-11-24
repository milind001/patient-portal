import * as actionTypes from './actionTypes';
import axios from '../../resources/axios';
import {NotificationManager} from 'react-notifications';

export const phyStart = () => {
    return {
        type: actionTypes.PHY_DATA_START
    }
};

export const phySuccess = (phyData) => {
    // console.log('phyData',phyData)
    return {
        type: actionTypes.PHY_DATA_SUCCESS,
        payload: phyData
    }
};

export const phyEditSuccess = () => {
    return {
        type: actionTypes.PHY_DATA_EDIT_SUCCESS
    }
};

export const phyFail = (err) => {
    return {
        type: actionTypes.PHY_DATA_FAIL,
        payload: err
    }
};


export const phyFetchDemographicData = () => {
    return dispatch => {
        dispatch(phyStart());
        axios.get('/demographics')
        .then(res => {
            dispatch(phySuccess(res.data));
        })
        .catch(err => {
            dispatch(phyFail(err));
        })
    }
};

export const phySaveDemographicData = (phySaveData) => {
    console.log('add action')
    return dispatch => {
        dispatch(phyStart());
        axios.post('/demographics', phySaveData)
        .then(res => {
            // dispatch(phySuccess(res.data));
            NotificationManager.success("User Added Successfully")
        })
        .catch(err => {
            dispatch(phyFail(err));
        })
    }
};

export const phyEditDemographicData = (userId, userData) => {
    // console.log('edit action')
    return dispatch => {
        dispatch(phyStart());
        axios.put('/demographics/' + userId, userData)
        .then(res => {
            dispatch(phyEditSuccess());
            dispatch(phyFetchDemographicData());
           
        })
        .catch(err => {
            dispatch(phyFail(err));
        })
    }
};

export const phyDeleteDemographicData = (userID) => {
    // console.log('edit action')
    return dispatch => {
        dispatch(phyStart());
        axios.delete('/demographics/' + userID)
        .then(res => {
            dispatch(phyFetchDemographicData());
            NotificationManager.success("User Deleted Successfully");
        })
        .catch(err => {
            dispatch(phyFail(err));
        })
    }
};
