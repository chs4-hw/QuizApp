import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { activeUser } from '../../actions/userActions';
import { loadQuiz } from '../../actions/quizActions';
import { startQuestion, navQuestion, answerSubmit, activeQuestion } from '../../actions/questionActions';

class QuestionLobby extends Component {
    state = {
        group_quiz: true,
        lastQuestion: false,
        answer_a: false,
        answer_b: false,
        answer_c: false,
        answer_d: false,
        question: '',
        host_control: false
    };


    componentDidMount() {
        this.props.activeUser();
        this.props.startQuestion();

        this.props.loadQuiz();

        // // if (this.props.quizReducer.host_control) {
        // this.setState({ host_control: this.props.quizReducer.host_control });
        // // }


        // //console.log(this.state.host_control);
        // console.log(this.props.quizReducer.host_control);



        this.interval = setInterval(() => this.props.activeQuestion(this.props.next), 5000);
    }



    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onChangeA = e => { this.setState({ [e.target.name]: !this.state.answer_a }); };
    onChangeB = e => { this.setState({ [e.target.name]: !this.state.answer_b }); };
    onChangeC = e => { this.setState({ [e.target.name]: !this.state.answer_c }); };
    onChangeD = e => { this.setState({ [e.target.name]: !this.state.answer_d }); };

    onSubmit = (e) => {
        e.preventDefault();

        this.props.answerSubmit(this.state.answer_a, this.state.answer_b, this.state.answer_c, this.state.answer_d, this.state.group_quiz);


        // if (hostcontrol) { redirct to a lobby page, save the current page number, add a sumbited bool, call activeQuestion }
        if (this.props.quizReducer.host_control) {

        } else {

        }

        if (this.props.next == null) {
            this.setState({ lastQuestion: true });
        }
        else {
            this.props.navQuestion(this.props.next);
        }
    };

    render() {

        console.log(this.props.quizReducer.host_control);



        if (this.state.lastQuestion) {
            this.setState({ lastQuestion: null });
            return <Redirect to="/participant/quiz/end" />
        }



        return (
            <div>

                <div className="d-flex justify-content-between" >
                    <div className="form-group">
                        <button onClick={this.props.navQuestion.bind(this, this.props.previous)} className="btn btn-primary">Back</button>
                    </div>

                    <div className="form-group">
                        <button onClick={this.props.navQuestion.bind(this, this.props.next)} className="btn btn-primary">Next</button>
                    </div>
                </div>


                {this.props.results && this.props.results.map(entry => (
                    <div key={entry.id} className="card">
                        <div>
                            {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
                            < div className="card-body" >
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">{entry.question}</p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>


                        <form onSubmit={this.onSubmit}>

                            <div className="btn-group btn-group-toggle btn-group-vertical btn-lg btn-block" data-toggle="buttons">

                                {/* {this.state.question && <p>Toggle</p>} */}
                                <button className="btn btn-outline-primary btn-block d-flex" name="answer_a" onClick={this.onChangeA} value={entry.groupvote_a}>{entry.answer_a}
                                    <span className="badge badge-pill badge-secondary ml-auto p-2" data-toggle="tooltip" data-placement="left" title="Votes on this answer">{entry.groupvote_a}</span></button>
                                <br />
                                <button className="btn btn-outline-primary btn-block d-flex" name="answer_b" onClick={this.onChangeB}>{entry.answer_b}
                                    <span className="badge badge-pill badge-secondary ml-auto p-2" data-toggle="tooltip" data-placement="left" title="Votes on this answer">{entry.groupvote_b}</span></button>
                                <br />
                                <button className="btn btn-outline-primary btn-block d-flex" name="answer_c" onClick={this.onChangeC}>{entry.answer_c}
                                    <span className="badge badge-pill badge-secondary ml-auto p-2" data-toggle="tooltip" data-placement="left" title="Votes on this answer">{entry.groupvote_c}</span></button>
                                <br />
                                <button className="btn btn-outline-primary btn-block d-flex" name="answer_d" onClick={this.onChangeD}>{entry.answer_d}
                                    <span className="badge badge-pill badge-secondary ml-auto p-2" data-toggle="tooltip" data-placement="left" title="Votes on this answer">{entry.groupvote_d}</span></button>
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

QuestionLobby.propTypes = {
    loadQuiz: PropTypes.func.isRequired,
    activeUser: PropTypes.func.isRequired,
    navQuestion: PropTypes.func.isRequired,
    activeQuestion: PropTypes.func.isRequired,
    answerSubmit: PropTypes.func.isRequired,
    end: PropTypes.bool,
    questionReducer: PropTypes.shape({
        next: PropTypes.string,
        results: PropTypes.arrayOf(PropTypes.object)
    }),
    quizReducer: PropTypes.shape({
        host_control: PropTypes.bool
    })

};

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
    quizReducer: state.quizReducer,
    questionReducer: state.questionReducer,
    next: state.questionReducer.next,
    previous: state.questionReducer.previous,
    results: state.questionReducer.results
});

export default connect(mapStateToProps, { activeUser, startQuestion, navQuestion, answerSubmit, activeQuestion, loadQuiz })(QuestionLobby);