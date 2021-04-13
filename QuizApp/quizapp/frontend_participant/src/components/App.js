// Paricipant App

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// //Redux 
import { Provider } from 'react-redux';
import store from '../store';

import Alerts from './Participant/Alerts';
import Participant from './Participant/Participant';
import QuizStart from './Participant/QuizStart';
import ActiveQuiz from './Participant/ActiveQuiz';
import GroupQuiz from './Participant/GroupQuiz';
import QuizEnd from './Participant/QuizEnd';
import HostControl from './Participant/HostControl';
import PrivateRoute from './Private/PrivateRoute';


class App extends Component {

    render() {
        const footerStyle = {
            paddingBottom: 10,
            marginTop: 20,
        };

        return (
            <div>
                <div className="container">
                    {/* <Alerts /> */}
                    <Switch>
                        <Route exact path="/participant" component={Participant}></Route>
                        <PrivateRoute path="/participant/quiz/start" component={QuizStart}></PrivateRoute>
                        <PrivateRoute path="/participant/quiz/active" component={ActiveQuiz}></PrivateRoute>
                        <PrivateRoute path="/participant/quiz/group" component={GroupQuiz}></PrivateRoute>
                        <PrivateRoute path="/participant/quiz/controlled_quiz" component={HostControl}></PrivateRoute>
                        <PrivateRoute path="/participant/quiz/end" component={QuizEnd}></PrivateRoute>
                    </Switch>
                </div>

                {/* {Footer} */}
                <div className="container-fluid" style={footerStyle}>
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