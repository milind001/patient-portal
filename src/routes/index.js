import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PATH from '../resources/slugs';

const Dashboard = lazy(() => import('../views/patient/Dashboard'));

function AppRoutes() {
    return(
        <Switch>
            <Route exact path={PATH.dashboardp} component={Dashboard} />
            <Route exact path={PATH.patientdemographics} render={() => <p>Demograpichs Page</p> } />
            <Redirect to={PATH.dashboard} />
        </Switch>
    )
};

export default AppRoutes;