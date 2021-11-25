import { combineReducers } from 'redux';
import dashboardReducer from '../reducer/videoReducer/dashboardReducer';
import callReducer from '../reducer/videoReducer/callReducer';

export default combineReducers({
  dashboard: dashboardReducer,
  call: callReducer
});
