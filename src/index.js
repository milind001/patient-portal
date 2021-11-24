import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import authReducer from './store/reducer/auth';
import phyReducer from './store/reducer/phy-lists';
import history from './resources/history';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-notifications/lib/notifications.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  physician: phyReducer
}) 

const store = createStore(rootReducer, composeEnhancer(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
