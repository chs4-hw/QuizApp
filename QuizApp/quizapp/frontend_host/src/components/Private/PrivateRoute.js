import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import authReducer from '../../reducers/authReducer';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={props => {
        if (!authReducer.isAuth) {
            return <Redirect to="/host/login" />;
        }
        if (!authReducer.isAuth) {
            return <Component {...props} />;
        }
    }} />
);

const mapStateToProps = state => ({
    authReducer: state.authReducer
});

export default connect(mapStateToProps)(ProtectedRoute);