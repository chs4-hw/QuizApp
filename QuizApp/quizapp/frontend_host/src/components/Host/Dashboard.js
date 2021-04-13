import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import NavBar from '../Host/NavBar';

// Actions
import { loadUser } from '../../actions/auth';

export class Dashboard extends Component {

    // componentDidMount() {
    //     this.props.loadUser();
    // }

    render() {
        return (
            <div>
                {/* <NavBar /> */}
                <p>Host Dashboard or redirect to login</p>
            </div>
        );
    }
}

Dashboard.propTypes = {
    loadUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
