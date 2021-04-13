import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/userActions';


export class QuizEnd extends Component {
    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <p className="lead">Thanks for participating.</p>
                </div>
                <div className="d-flex justify-content-center">
                    <form>
                        <button className="btn btn-primary" onClick={this.props.logoutUser}>Logout</button>
                    </form>
                </div>
            </div>
        );
    }
}

QuizEnd.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
});

export default connect(mapStateToProps, { logoutUser })(QuizEnd);