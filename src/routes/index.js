import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import PATH from '../resources/slugs';

const Dashboard = lazy(() => import('../views/patient/Dashboard'));
const PatientDemographics = lazy(() => import('../views/patient/patientDemographics/patientDemographics'));
const ScheduleAppoinement = lazy(() => import('../views/patient/appointments/scheduleAppoinement'));
const ScheduledAppoinement = lazy(() => import('../views/patient/appointments/scheduled-appoinment'));
const AppoinmentHistory = lazy(() => import('../views/patient/appointments/appoinmentHistory'));
const PhysicianRecord = lazy(() => import('../views/patient/physicianrecords'));
const PaymentCheckout = lazy(() => import('../views/billing/Checkout'));
const PaymentHistory = lazy(() => import('../views/patient/paymenthistory'));
const PatientMedication2 = lazy(() => import('../views/patient/patientMedication/patientMedication2'));

const PhysicianDashboard = lazy(() => import('../views/physician/PhysicianDashboard'));
const ScheduledApoointment = lazy(() => import('../views/physician/ScheduledApoointment'));   
const AppointmentHistory = lazy(() => import('../views/physician/Profile'));   

const AdminDashboard = lazy(()=>import('../views/admin/dashboard/admin-dashboard'));
const PatientRecords=lazy(()=>import('../views/admin/patient-records/patient-records'));
const PhysicianRecords = lazy(()=>import('../views/admin/physician-records/physician-records'));
const masterdataTables = lazy(()=>import('../views/admin/master/details/detail'));

function AppRoutes() {
    return(
        <Switch>
            {/* Patient Dashboard */}
            <Route exact path={PATH.dashboardp} component={Dashboard} />
            <Route exact path={PATH.patientdemographics} component={PatientDemographics} />
            <Route exact path={PATH.patientmedication2} component={PatientMedication2}/>
            <Route exact path={PATH.scheduleappointment} component={ScheduleAppoinement} />
            <Route exact path={PATH.appoinmentsscheduled} component={ScheduledAppoinement} />
            <Route exact path={PATH.appointmenthistory} component={AppoinmentHistory} />
            <Route exact path={PATH.physicianrecord2} component={PhysicianRecord} />
            <Route exact path={PATH.paymentcheckout} component={PaymentCheckout} />
            <Route exact path={PATH.paymenthistory} component={PaymentHistory} />

            {/* Physician Dashboard */}
            <Route exact path={PATH.dashboardph} component={PhysicianDashboard} />
            <Route exact path={PATH.scheduleappointmentphy} component={ScheduledApoointment} />
            <Route exact path={PATH.appointmenthistoryphy} component={AppointmentHistory} />
            
            {/* Admin Dashboard */}
            <Route exact path={PATH.dashboardad} component = {AdminDashboard} />
            <Route exact path={PATH.patientRecords} component={PatientRecords} />
            <Route exact path={PATH.physicianRecords} component={PhysicianRecords}/>    
            <Route exact path={PATH.masterdataTables} component={masterdataTables}/>
            <Redirect to={PATH.dashboard} />
        </Switch>
    )
};

export default AppRoutes;