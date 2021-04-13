import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { activeUser } from '../../actions/userActions';
import { loadQuiz } from '../../actions/quizActions';
//import { startQuestion, navQuestion, answerSubmit, activeQuestion } from '../../actions/questionActions';
import { startQuestion, navQuestion, activeQuestion } from '../../actions/questionActions';
import { answerSubmit } from '../../actions/answerActions';
import answerReducer from '../../reducers/answerReducer';

class HostControl extends Component {

    state = {
        group_quiz: true,
        lastQuestion: false,
        firstQuestion: true,
        answer_a: false,
        answer_b: false,
        answer_c: false,
        answer_d: false,
        question: '',
        didSubmit: false, // usersubmit
    };


    componentDidMount() {
        this.props.activeUser();
        if (this.state.firstQuestion) {
            this.props.startQuestion();
            this.setState({ firstQuestion: false })
        } else {
            this.props.activeQuestion(this.props.next)
        }

        this.props.loadQuiz();
        this.interval = setInterval(() => this.props.activeQuestion(this.props.next), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onChangeA = e => { this.setState({ answer_a: !this.state.answer_a, answer_b: false, answer_c: false, answer_d: false }); };
    onChangeB = e => { this.setState({ answer_b: !this.state.answer_b, answer_a: false, answer_c: false, answer_d: false }); };
    onChangeC = e => { this.setState({ answer_c: !this.state.answer_c, answer_a: false, answer_b: false, answer_d: false }); };
    onChangeD = e => { this.setState({ answer_d: !this.state.answer_d, answer_a: false, answer_b: false, answer_c: false }); };

    onSubmit = (e) => {
        e.preventDefault();

        this.props.answerSubmit(this.state.answer_a, this.state.answer_b, this.state.answer_c, this.state.answer_d, this.state.group_quiz);

        this.setState({ answer_a: false });
        this.setState({ answer_b: false });
        this.setState({ answer_c: false });
        this.setState({ answer_d: false });

        this.setState({ didSubmit: true });

    };

    onClick = (e) => {
        this.props.navQuestion(this.props.next);
        this.setState({ didSubmit: false });

        if (this.props.next == null) {
            this.setState({ lastQuestion: true });
        }
    }

    render() {

        if (this.state.lastQuestion) {
            return <Redirect to="/participant/quiz/end" />
        }

        const cardStyle = {
            paddingLeft: 10,
            paddingRight: 5,
            paddingTop: 5,
            paddingBottom: 50,
        };

        const containerStyle = {
            background: '#B5BCC7',
            paddingTop: 40,
            paddingBottom: 40,
            paddingRight: 5,
            paddingLeft: 5,
            marginTop: 40,
        };

        // Answer A
        const isCorrect_a = (
            <button className="btn btn-success btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_a).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_a).toString()}
                </span>
            </button>
        );
        const answer_A = (
            <button className="btn btn-outline-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_a).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_a).toString()}
                </span>
            </button>
        );
        const notCorrect_a = (
            <button className="btn btn-outline-danger btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_a).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_a).toString()}
                </span>
            </button>
        );
        const selected_a = (
            <button className="btn btn-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_a).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_a).toString()}
                </span>
            </button>
        );

        // Answer B
        const isCorrect_b = (
            <button className="btn btn-success btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_b).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_b).toString()}
                </span>
            </button>
        );
        const answer_B = (
            <button className="btn btn-outline-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_b).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_b).toString()}
                </span>
            </button>
        );
        const notCorrect_b = (
            <button className="btn btn-outline-danger btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_b).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_b).toString()}
                </span>
            </button>
        );
        const selected_b = (
            <button className="btn btn-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_b).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_b).toString()}
                </span>
            </button>
        );

        // Answer C
        const isCorrect_c = (
            <button className="btn btn-success btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_c).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_c).toString()}
                </span>
            </button>
        );
        const answer_C = (
            <button className="btn btn-outline-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_c).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_c).toString()}
                </span>
            </button>
        );
        const notCorrect_c = (
            <button className="btn btn-outline-danger btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_c).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_c).toString()}
                </span>
            </button>
        );
        const selected_c = (
            <button className="btn btn-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_c).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_c).toString()}
                </span>
            </button>
        );

        // Answer D
        const isCorrect_d = (
            <button className="btn btn-success btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_d).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_d).toString()}
                </span>
            </button>
        );
        const answer_D = (
            <button className="btn btn-outline-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_d).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_d).toString()}
                </span>
            </button>
        );
        const notCorrect_d = (
            <button className="btn btn-outline-danger btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_d).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_d).toString()}
                </span>
            </button>
        );
        const selected_d = (
            <button className="btn btn-primary btn-block d-flex disabled">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.q_answer_d).toString()}
                <span className="badge badge-pill badge-secondary ml-auto p-2 " data-toggle="tooltip" data-placement="left" title="Submits on this answer">
                    {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.groupvote_d).toString()}
                </span>
            </button>
        );

        var correct = null;

        if (this.props.answerReducer.correct_a == true && this.props.answerReducer.answer_a == true) {
            correct = true;
        }
        if (this.props.answerReducer.correct_b == true && this.props.answerReducer.answer_b == true) {
            correct = true;
        }
        if (this.props.answerReducer.correct_c == true && this.props.answerReducer.answer_c == true) {
            correct = true;
        }
        if (this.props.answerReducer.correct_d == true && this.props.answerReducer.answer_d == true) {
            correct = true;
        }

        const showButton = (
            <Fragment>
                <div className="container" style={containerStyle}>
                    <div className="form-group d-flex justify-content-center">
                        {correct ? <h3>Well Done</h3> : <h3>Incorrect</h3>}
                    </div>
                    <div className="card" style={cardStyle}>
                        <div>
                            < div className="card-body" >
                                <h5 className="card-title">Question {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.question_num).toString()}</h5>
                                <p className="card-text">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.question).toString()}</p>
                                <div >
                                    <form >
                                        <div className="btn-group btn-group-toggle btn-group-vertical btn-lg btn-block" data-toggle="buttons">
                                            {this.props.answerReducer.correct_a ? isCorrect_a : this.props.answerReducer.answer_a ? notCorrect_a : answer_A}
                                            <br />
                                            {this.props.answerReducer.correct_b ? isCorrect_b : this.props.answerReducer.answer_b ? notCorrect_b : answer_B}
                                            <br />
                                            {this.props.answerReducer.correct_c ? isCorrect_c : this.props.answerReducer.answer_c ? notCorrect_c : answer_C}

                                            <br />
                                            {this.props.answerReducer.correct_d ? isCorrect_d : this.props.answerReducer.answer_d ? notCorrect_d : answer_D}
                                            <br />

                                            <br />
                                        </div>
                                        <br />
                                    </form>
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <button onClick={this.onClick} className="btn btn-lg btn-primary">Next</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>

        );

        const hiddenButton = (
            <Fragment>
                <div className="container" style={containerStyle}>
                    <div className="card" style={cardStyle}>
                        <div>
                            < div className="card-body" >
                                <h5 className="card-title">Question {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.question_num).toString()}</h5>
                                <p className="card-text">{this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.question).toString()}</p>
                                <div >
                                    <form >
                                        <div className="btn-group btn-group-toggle btn-group-vertical btn-lg btn-block" data-toggle="buttons">
                                            {this.props.answerReducer.answer_a ? selected_a : answer_A}
                                            <br />
                                            {this.props.answerReducer.answer_b ? selected_b : answer_B}
                                            <br />
                                            {this.props.answerReducer.answer_c ? selected_c : answer_C}
                                            <br />
                                            {this.props.answerReducer.answer_d ? selected_d : answer_D}
                                            <br />
                                        </div>
                                        <br />
                                    </form>
                                    < div className="alert alert-info" role="alert">
                                        <div className="form-group d-flex justify-content-center">
                                            <h5>Button to Next Question</h5>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <h5>Will be available shortly.</h5>
                                        </div>
                                    </ div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

        if (this.props.answerReducer.isLoading) {

            return (
                <div className="d-flex justify-content-center"></div>
            );
        } else {
            if (this.state.didSubmit && !this.props.answerReducer.isLoading) {
                return (
                    <div>
                        {this.props.questionReducer.results && this.props.questionReducer.results.map(entry => entry.load_next).valueOf()[0] ? showButton : hiddenButton}
                    </div>
                );
            } else {

                return (
                    <div className="container" style={containerStyle}>
                        {this.props.results && this.props.results.map(entry => (
                            <div key={entry.id} className="card" style={cardStyle}>
                                <div>
                                    < div className="card-body" >
                                        <h5 className="card-title">Question {entry.question_num}</h5>
                                        <p className="card-text">{entry.question}</p>
                                    </div>
                                </div>
                                <form onSubmit={this.onSubmit}>

                                    <div className="btn-group btn-group-toggle btn-group-vertical btn-lg btn-block" data-toggle="buttons">

                                        <label className="btn btn-outline-primary" onClick={this.onChangeA}>
                                            <input type="radio" autoComplete="off" name="answer_a" /> {entry.q_answer_a}
                                        </label>
                                        <br />
                                        <label className="btn btn-outline-primary" onClick={this.onChangeB}>
                                            <input type="radio" name="answer_b" autoComplete="off" /> {entry.q_answer_b}
                                        </label>
                                        <br />
                                        <label className="btn btn-outline-primary" onClick={this.onChangeC}>
                                            <input type="radio" name="answer_b" autoComplete="off" /> {entry.q_answer_c}
                                        </label>
                                        <br />
                                        <label className="btn btn-outline-primary" onClick={this.onChangeD}>
                                            <input type="radio" autoComplete="off" /> {entry.q_answer_d}
                                        </label>
                                        <br />
                                    </div>

                                    <div className="form-group d-flex justify-content-center">
                                        <button type="submit" className="btn btn-lg btn-primary">Save Answer</button>
                                    </div>
                                    <br />
                                </form>

                            </div>
                        ))}

                    </div >
                );
            }
        }
    }
}

HostControl.propTypes = {
    loadQuiz: PropTypes.func.isRequired,
    activeUser: PropTypes.func.isRequired,
    navQuestion: PropTypes.func.isRequired,
    activeQuestion: PropTypes.func.isRequired,
    answerSubmit: PropTypes.func.isRequired,
    questionReducer: PropTypes.array.isRequired,
    end: PropTypes.bool,
    questionReducer: PropTypes.shape({
        next: PropTypes.string,
        results: PropTypes.arrayOf(PropTypes.object)
    }),
};

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
    quizReducer: state.quizReducer,
    answerReducer: state.answerReducer,
    questionReducer: state.questionReducer,
    next: state.questionReducer.next,
    previous: state.questionReducer.previous,
    results: state.questionReducer.results
});

export default connect(mapStateToProps, { activeUser, startQuestion, navQuestion, answerSubmit, activeQuestion, loadQuiz })(HostControl);