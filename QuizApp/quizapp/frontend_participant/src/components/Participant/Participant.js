import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Action Methods
import { joinSession } from '../../actions/userActions';

class Participant extends Component {

    state = {
        username: "",
        quiz_key: ""
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { username, quiz_key } = this.state;

        const user = {
            username,
            quiz_key
        }
        this.props.joinSession(user);
    };
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {

        if (this.props.userReducer.isJoined) {
            return <Redirect to="/participant/quiz/start" />
        }

        const cardStyle = {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 50,
            marginTop: 0,
            background: '#B5BCC7'
        };

        const headerStyle = {
            paddingBottom: 10,
            marginBottom: 20,
        };

        const { username, quiz_key } = this.state;

        return (
            <Fragment>
                <div className="d-flex flex-column" style={headerStyle}>
                    <div className="d-flex justify-content-center">
                        <h1 className="display-3">Participant</h1>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h1 className="display-4">Quiz Login</h1>
                    </div>
                    <div className="d-flex justify-content-center">

                        <p className="lead">The application has been built as an attempt to implement the group working
                        aspects from Think-Pair-Share (Frank Lyman, 1981) and
                        Eric Mazur’s “Peer Instruction” (1997). These approaches have been
                        found to be effective in learning new material and knowledge retention.
                        These strategies both require that quiz takers attempt to find an answer to a
                        complex question first individually, then to discuss their proposed answers in groups,
                        this would be followed by asking the same question again and letting the students
                        answer the question as individuals again. You will first attempt a quiz of 5 questions
                        on your own. This will be followed by asking the same questions again, but in this case, you
                        will be able to collectively discuss the best answers with a group.
                        <strong> When you are ready please login with your Username and Quizkey provided.</strong></p>

                    </div>
                </div>
                <div className="col-md-8 m-auto">
                    <div className="card" style={cardStyle}>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="lead">Username</label>
                                <input type="text" className="form-control" name="username" onChange={this.onChange} value={username} />
                            </div>
                            <div className="form-group">
                                <label className="lead">Quiz Key</label>
                                <input type="text" className="form-control" name="quiz_key" onChange={this.onChange} value={quiz_key} />
                            </div>
                            <div className="form-group d-flex justify-content-center">
                                <button type="submit" className="btn btn-lg btn-primary">Join Quiz</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

Participant.propTypes = {
    joinSession: PropTypes.func.isRequired,
    isJoined: PropTypes.bool
};

export default connect(mapStateToProps, { joinSession })(Participant);
