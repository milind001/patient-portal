import React from 'react';

import './Dashboardinformation.css';

const DashboardInformation = ({ username }) => {
  return (
    <div className='dashboard_info_text_container'>
      <span className='dashboard_info_text_title'>
        Hello {username} welcome in Patient-Portal Video Call .
      </span>
      <span className='dashboard_info_text_description'>
        You can start a call calling directy to a Physician from the list
      </span>
    </div>
  );
};

export default DashboardInformation;
