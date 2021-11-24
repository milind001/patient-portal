import React, { Suspense } from "react";
import Layout from './views/layout/Layout';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/Signup';
import TestForm from './views/testForm/testform';
import NotFound from './views/NotFound404';
import { Route, Switch } from "react-router";
import Spinner from "./components/Spinner/Spinner";
import ProtectedRoute from "./routes/ProtectedRoute";
import {NotificationContainer} from 'react-notifications';

function App() {
  return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/testform" component={TestForm} />
            <ProtectedRoute path="/dashboard" component={Layout}/>
            <Route path="*" component={NotFound} />
        </Switch>
        <NotificationContainer/>
      </Suspense>
  );
};

export default App;
