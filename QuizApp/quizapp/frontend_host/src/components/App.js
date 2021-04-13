// Host App

import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Redux 
import { Provider } from 'react-redux';
import store from '../store';

// // Auth
import PrivateRoute from '../components/Private/PrivateRoute';
// import { loadUser } from '../actions/auth';


// Components
import Login from './Host/Login';
import Register from './Host/Register';
import Dashboard from './Host/Dashboard';


class App extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <h1>Host Frontend</h1>
                    {/* <Alerts /> */}
                    <Switch>
                        <Route exact path="/host/login" component={Login}></Route>
                        <Route exact path="/host/register" component={Register}></Route>
                        <PrivateRoute path="/host/dashboard" component={Dashboard}></PrivateRoute>
                    </Switch>
                </div>

                {/* {Footer} */}
                <div className="container-fluid">
                    <div className="panel-footer text-center">
                        <small className="text-muted">Quiz App Project</small>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app'));