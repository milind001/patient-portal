import React, { Suspense } from "react";
import Layout from './views/layout/Layout';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/Signup';
import NotFound from './views/NotFound404';
import { Redirect, Route, Switch } from "react-router";
import Spinner from "./components/Spinner/Spinner";

function App() {

  const isAuthenticated  = true; 

  return (
      <Suspense fallback={<Spinner/>}>
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            { isAuthenticated ? 
              (<Route path="/dashboard" component={Layout} />) : 
              (<Redirect to="/" />) 
            }
            <Route path="*" component={NotFound} />
        </Switch>
      </Suspense>
  );
};

export default App;
