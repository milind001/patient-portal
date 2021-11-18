import React, { Suspense } from "react";
import Layout from './views/layout/Layout';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/Signup';
import NotFound from './views/NotFound404';
import { Route, Switch } from "react-router";
import Spinner from "./components/Spinner/Spinner";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <ProtectedRoute path="/dashboard" component={Layout}/>
            <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
  );
};

export default App;
