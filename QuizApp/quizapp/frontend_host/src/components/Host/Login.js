import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';

export class Login extends Component {

    state = {
        username: "",
        password: "",
    };

    // componentDidMount() {
    //     this.props.loadUser();
    // }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state.username, this.state.password);
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {

        //console.log(this.props.authReducer);

        console.log(this.props.authReducer.isAuth);

        if (this.props.authReducer.isAuth) {
            return <Redirect to="/host/dashboard" />
        }



        const { username, password } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Enter Username</label>
                        <input type="text" className="form-control" name="username" onChange={this.onChange} value={username} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.onChange} value={password} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <Link to="/host/register">
                    <button className="btn btn-primary">Register</button>
                </Link>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    authReducer: state.authReducer
});

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    // authReducer: PropTypes.shape({
    //     isAuth: PropTypes.bool
    // }),
};

export default connect(mapStateToProps, { loginUser })(Login);
