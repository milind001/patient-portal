import React, { useEffect } from 'react';
import ActiveUsersList from '../../components/VideoCall/ActiveUsersList/ActiveUsersList';
import * as webRTCHandler from '../../utils/webRTC/webRTCHandler';
import DirectCall from '../../components/VideoCall/DirectCall/DirectCall';
import { connect } from 'react-redux';
import DashboardInformation from '../../components/VideoCall/Dashboardinformation/Dashboardinformation';
import { callStates } from '../../store/action/videoAcion/callActions';
import './video-call.scss';

const VideoCallDashboard = ({ username, callState }) => {
  useEffect(() => {
    webRTCHandler.getLocalStream();
  }, []);

  return (
    <div className='dashboard_container background_main_color'>
      <div className='dashboard_left_section'>
        <div className='dashboard_content_container'>
          <DirectCall />
          {callState !== callStates.CALL_IN_PROGRESS && <DashboardInformation username={username} />}
        </div>
      </div>
      <div className='dashboard_right_section background_secondary_color'>
        <div className='dashboard_active_users_list'>
          <ActiveUsersList />
        </div>
        <div className='dashboard_logo_container'>
          <h6>Online User</h6>
        </div>
      </div>
      <footer> <small>&#9400; Patient-Portal 2021 Team:02</small> </footer>
    </div>
  );
};

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard
});

export default connect(mapStateToProps)(VideoCallDashboard);
