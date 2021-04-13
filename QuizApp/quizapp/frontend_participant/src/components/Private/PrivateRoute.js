import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const PrivateRoute = ({ component: Component, userReducer, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            // // Bypass Private Route (temp)
            // return <Component {...props} />;

            const isJoined = localStorage.getItem('isJoined');

            // Private Route
            // if (userReducer.loading) {
            //     return <h2>Loading...</h2>;
            // }
            if (!isJoined) {
                return <Redirect to="/participant" />;
            }
            if (isJoined) {
                return (
                    <Component {...props} />
                );                  
            }
        }}
    />
);

const mapStateToProps = state => ({
    userReducer: state.userReducer
});

export default connect(mapStateToProps)(PrivateRoute);
