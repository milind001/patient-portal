import * as actionTypes from './actionTypes';
import axios from '../../resources/axios';
import history from '../../resources/history';

export const masterStart = () => {
    return {
        type: actionTypes.MASTER_START  
     }
};

export const masterPostcallSuccess = (postcallData) => {
    console.log('post-masterData',postcallData)
    return {
        type: actionTypes.MASTER_POSTCALL_SUCCESS,
        // userId: userId,
        payload:postcallData,
        
    }

};
export const masterGetcallSuccess = (getcallData) => {
    console.log('get-masterData',getcallData)
    return {
        type: actionTypes.MASTER_GETCALL_SUCCESS,
        // userId: userId,
        payload:getcallData,
        
    }

};
export const masterDeletecallSuccess = (deleteCallData) => {
    console.log('delete-masterData',deleteCallData)
    return {
        type: actionTypes.MASTER_DELETECALL_SUCCESS,
        // userId: userId,
        payload:deleteCallData,
        
    }

};
export const masterPutcallSuccess = (putCallData) => {
    console.log('delete-masterData',putCallData)
    return {
        type: actionTypes.MASTER_PUTCALL_SUCCESS,
        // userId: userId,
        payload:putCallData,
        
    }

};

export const masterFail = () => {
    return {
        type: actionTypes.MASTER_FAIL
    }
};

//master allergies


export const mAllergiesGetCall = () => {
     return dispatch => {
         dispatch(masterStart());
         axios.get('/masterallergies')
         .then(res => {
             dispatch(masterGetcallSuccess(res.data));
         })
         .catch(err => {
             dispatch(masterFail(err.message));
         })
     }
 }
 export const mAllergiesPostCall = (postData) => {
    return dispatch => {
        dispatch(masterStart());
        axios.post('/masterallergies', postData)
        .then(res => {
            dispatch(mAllergiesGetCall())
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}

 export const mAllergiesDeleteCall = (user) => {
     console.log('user from delete calll',user);
    return dispatch => {
        dispatch(masterStart());
        axios.delete('/masterallergies' + '/' + user.id)
        .then(res => {
            // dispatch(masterDeletecallSuccess(res.data))
            dispatch(mAllergiesGetCall())
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
export const mAllergiesPutCall = (Data) => {
    return dispatch => {
        dispatch(masterStart());
        axios.put('/masterallergies' + '/' + Data.id, Data)
        .then(res => {
            // dispatch(masterPutcallSuccess(res.data))
            dispatch(mAllergiesGetCall())

        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
//master diagnoses


export const mDiagnosesGetCall = () => {
     return dispatch => {
         dispatch(masterStart());
         axios.get('/masterdiagnoses')
         .then(res => {
             dispatch(masterGetcallSuccess(res.data));
         })
         .catch(err => {
             dispatch(masterFail(err.message));
         })
     }
 }
 export const mDiagnosesPostCall = (postData) => {
    return dispatch => {
        dispatch(masterStart());
        axios.post('/masterdiagnoses', postData)
        .then(res => {
            // dispatch(masterPostcallSuccess(res.data))
            dispatch(mDiagnosesGetCall());
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
 export const mDiagnosesDeleteCall = (user) => {
     console.log('user from delete calll',user);
    return dispatch => {
        dispatch(masterStart());
        axios.delete('/masterdiagnoses' + '/' + user.id)
        .then(res => {
            // dispatch(masterDeletecallSuccess(res.data))
            dispatch(mDiagnosesGetCall());
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
export const mDiagnosesPutCall = (Data) => {
    return dispatch => {
        dispatch(masterStart());
        axios.put('/masterdiagnoses' + '/' + Data.id, Data)
        .then(res => {
            // dispatch(masterPutcallSuccess(res.data));
            dispatch(mDiagnosesGetCall());

        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
//master procedurecodes


export const mCodesGetCall = () => {
     return dispatch => {
         dispatch(masterStart());
         axios.get('/masterprocedurecodes')
         .then(res => {
             dispatch(masterGetcallSuccess(res.data));
         })
         .catch(err => {
             dispatch(masterFail(err.message));
         })
     }
 }
 export const mCodesPostCall = (postData) => {
    return dispatch => {
        dispatch(masterStart());
        axios.post('/masterprocedurecodes', postData)
        .then(res => {
            dispatch(mCodesGetCall())
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
 export const mCodesDeleteCall = (user) => {
    return dispatch => {
        dispatch(masterStart());
        axios.delete('/masterprocedurecodes' + '/' + user.id)
        .then(res => {
            dispatch(mCodesGetCall())
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
export const mCodesPutCall = (Data) => {
    return dispatch => {
        dispatch(masterStart());
        axios.put('/masterprocedurecodes' + '/' + Data.id, Data)
        .then(res => {
            // dispatch(masterPutcallSuccess(res.data));
            dispatch(mCodesGetCall())
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}

//Medication


export const mMedicationGetCall = () => {
     return dispatch => {
         dispatch(masterStart());
         axios.get('/mastermedication')
         .then(res => {
             dispatch(masterGetcallSuccess(res.data));
         })
         .catch(err => {
             dispatch(masterFail(err.message));
         })
     }
 }
 export const mMedicationPostCall = (postData) => {
        return dispatch => {
            dispatch(masterStart());
            axios.post('/mastermedication', postData)
            .then(res => {
                dispatch(mMedicationGetCall())
            })
            .catch(err => {
                dispatch(masterFail(err.message));
            })
        }
    }
    
 export const mMedicationDeleteCall = (user) => {
     console.log('user from delete calll',user);
    return dispatch => {
        dispatch(masterStart());
        axios.delete('/mastermedication' + '/' + user.id)
        .then(res => {
            dispatch(mMedicationGetCall())
            // dispatch(masterDeletecallSuccess(res.data))
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}
export const mMedicationPutCall = (Data) => {
    return dispatch => {
        dispatch(masterStart());
        axios.put('/mastermedication' + '/' + Data.id, Data)
        .then(res => {
            // dispatch(masterPutcallSuccess(res.data));
            dispatch(mMedicationGetCall())
        })
        .catch(err => {
            dispatch(masterFail(err.message));
        })
    }
}

