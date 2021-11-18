import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PATH from '../resources/slugs';

const Dashboard = lazy(() => import('../views/patient/Dashboard'));
const PatientDemographics = lazy(() => import('../views/patient/patientDemographics/patientDemographics'));

function AppRoutes() {
    return(
        <Switch>
            <Route exact path={PATH.dashboardp} component={Dashboard} />
            {/* <Route exact path={PATH.patientdemographics} render={()=><h2>Patient Demographics</h2>} /> */}
            <Route exact path={PATH.patientdemographics} component={PatientDemographics} />
            <Route exact path={PATH.dashboardph} render={()=> <h1>Welcome to Physician Dashbaord</h1>} />
            <Route exact path={PATH.dashboardad} render={()=> <h1>Welcome to Admin Dashbaord</h1>} />
            <Redirect to={PATH.dashboard} />
        </Switch>
    )
};

export default AppRoutes;