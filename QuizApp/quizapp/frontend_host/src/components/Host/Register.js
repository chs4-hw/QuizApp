import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/auth';

export class Register extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
        passwordError: false
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { password, passwordConfirm } = this.state;
        if (password == passwordConfirm) {
            this.props.registerUser(this.state.username, this.state.email, this.state.password);
        } else {
            this.setState({ passwordError: true });
            alert("Passwords do not match");
        }

    };

    onClick = (e) => this.setState({ passwordError: false })

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {

        if (this.props.authReducer.isAuth) {
            return <Redirect to="/host/dashboard" />
        }

        const { username, email, password, passwordConfirm } = this.state;

        return (
            <div className="col-md-6 m-auto">

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="text" className="form-control" name="username" onChange={this.onChange} value={username} placeholder="Enter Username" />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" name="email" onChange={this.onChange} value={email} placeholder="Enter Email" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.onChange} value={password} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="passwordConfirm" onChange={this.onChange} value={passwordConfirm} placeholder="Confirm Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer
});

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    // authReducer: PropTypes.shape({
    //     isAuth: PropTypes.bool
    // }),
}

export default connect(mapStateToProps, { registerUser })(Register);
