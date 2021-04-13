import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { loadQuiz } from '../../actions/quizActions';
import { activeUser } from '../../actions/userActions';




class QuizStart extends Component {

    componentDidMount() {
        this.props.activeUser();
        this.props.loadQuiz();
    }


    render() {

        const headerStyle = {
            paddingBottom: 10,
            marginBottom: 20,
        };

        if (this.props.quizReducer.host_control) {
            return (
                <div className="container">
                    <div className="d-flex flex-column" style={headerStyle}>
                        <div className="d-flex justify-content-center">
                            <h1 className="display-3">Group</h1>
                        </div>
                        <div className="d-flex justify-content-center">
                            <h1 className="display-4">Quiz</h1>
                        </div>
                        <div className="d-flex justify-content-center">

                            <p className="lead">Welcome to the group quiz section of this application.
                            The following questions are designed to be difficult, but you may use any
                            resource to find the answers (for example Google search). In this section, you may
                            collaborate with the group and discuss answers you have found. The questions will
                            be the same as the questions in an individual quiz, but now you have the option to
                            validate your answers with the group. This quiz uses a polling system to show what
                            other users in the group have submitted, but once you submit an answer your answer
                            cannot be changed. In a real-world situation, you will be competing against
                            other groups for the best score. You can either agree with the group's suggestion or
                            submit an answer of your own choice. Answers with the most user submits will be
                            considered as the group's input, while your individual answer inputs will be
                            considered as yours. Both should carry value. If you are confident in an answer
                            that you have found, you can share it over the chat before submitting it.
                            After submitting an answer to a question, you will be directed to the question
                            lobby page while waiting for the rest of the group to submit their answers.
                            The lobby page is controlled by the host, and when deactivated will load the
                            correct answers to the question, including a button to continue to the next
                            question. Once you have completed the 5 questions, log out of the quiz and
                            you will be directed back to the login page, then inform the quiz host via
                                 chat that you have completed this section.</p>

                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link to="/participant/quiz/controlled_quiz">
                            <button className="btn btn-primary">Continue</button>
                        </Link>
                    </div>
                </div>
            );
        } else {
            if (this.props.quizReducer.groupwork) {
                return (
                    <div>
                        <p>Group Quiz</p>
                        <div className="col-md-6 m-auto">
                            <Link to="/participant/quiz/group">
                                <button className="btn btn-primary">Continue</button>
                            </Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="container">
                        <div className="d-flex flex-column" style={headerStyle}>
                            <div className="d-flex justify-content-center">
                                <h1 className="display-3">Individual</h1>
                            </div>
                            <div className="d-flex justify-content-center">
                                <h1 className="display-4">Quiz</h1>
                            </div>
                            <div className="d-flex justify-content-center">

                                <p className="lead">Welcome to the individual quiz section of this application.
                                The following questions are designed to be difficult, but you may use any resource to
                                find the answers (for example Google search). For this usability test answer feedback will
                                not be provided during the quiz. Once you have completed the 5 questions,
                                log out of the quiz and you will be directed back to the login page,
                         then inform the quiz host via chat that you have completed this section.</p>

                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/participant/quiz/active">
                                <button className="btn btn-lg btn-primary">Continue</button>
                            </Link>
                        </div>
                    </div>
                );
            }
        }
    }
}

QuizStart.propTypes = {
    activeUser: PropTypes.func.isRequired,
    //activeQuestion: PropTypes.func.isRequired,
    loadQuiz: PropTypes.func.isRequired,
    //groupwork: PropTypes.bool // Redrect if quiz not active
    quizReducer: PropTypes.shape({
        groupwork: PropTypes.bool,
        host_control: PropTypes.bool
    })
}

const mapStateToProps = (state) => ({
    quizReducer: state.quizReducer,
    userReducer: state.userReducer,
});

export default connect(mapStateToProps, { loadQuiz, activeUser })(QuizStart);