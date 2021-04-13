import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { activeUser } from '../../actions/userActions';
//import { activeQuiz } from '../../actions/quizActions';
//import { startQuestion, activeQuestion, answerSubmit, navQuestion } from '../../actions/questionActions';
import { startQuestion, navQuestion } from '../../actions/questionActions';
import { answerSubmit } from '../../actions/answerActions';

class ActiveQuiz extends Component {

    state = {
        lastQuestion: false,
        answer_a: false,
        answer_b: false,
        answer_c: false,
        answer_d: false,
        question: '',
    };


    componentDidMount() {
        this.props.activeUser();
        this.props.startQuestion();
    }

    onChangeA = e => { this.setState({ answer_a: !this.state.answer_a, answer_b: false, answer_c: false, answer_d: false }); };
    onChangeB = e => { this.setState({ answer_b: !this.state.answer_b, answer_a: false, answer_c: false, answer_d: false }); };
    onChangeC = e => { this.setState({ answer_c: !this.state.answer_c, answer_a: false, answer_b: false, answer_d: false }); };
    onChangeD = e => { this.setState({ answer_d: !this.state.answer_d, answer_a: false, answer_b: false, answer_c: false }); };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.answerSubmit(this.state.answer_a, this.state.answer_b, this.state.answer_c, this.state.answer_d);

        this.setState({ answer_a: false });
        this.setState({ answer_b: false });
        this.setState({ answer_c: false });
        this.setState({ answer_d: false });

        if (this.props.next == null) {
            this.setState({ lastQuestion: true });
        }
        else {
            this.props.navQuestion(this.props.next);
        }
    };

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

        const buttonStyle = {
            marginTop: 10,
        };

        return (
            <div className="container" style={containerStyle}>

                {/* <div className="d-flex justify-content-between" >
                    <div className="form-group">
                        <button onClick={this.props.activeQuestion.bind(this, this.props.previous)} className="btn btn-primary">Back</button>
                    </div>

                    <div className="form-group">
                        <button onClick={this.props.activeQuestion.bind(this, this.props.next)} className="btn btn-primary">Next</button>
                    </div>
                </div> */}


                {this.props.results && this.props.results.map(entry => (
                    <div key={entry.id} className="card" style={cardStyle}>
                        <div>
                            {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
                            < div className="card-body" >
                                <h5 className="card-title">Question {entry.question_num}</h5>
                                <p className="card-text lead">{entry.question}</p>
                                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                            </div>
                        </div>


                        <form onSubmit={this.onSubmit}>

                            <div className="btn-group btn-group-toggle btn-group-vertical btn-lg btn-block" data-toggle="buttons">

                                <label className="btn btn-outline-primary" onClick={this.onChangeA} style={buttonStyle}>
                                    <input type="radio" autoComplete="off" name="answer_a" /> {entry.q_answer_a}
                                </label>
                                <label className="btn btn-outline-primary" onClick={this.onChangeB} style={buttonStyle}>
                                    <input type="radio" name="answer_b" autoComplete="off" /> {entry.q_answer_b}
                                </label>
                                <label className="btn btn-outline-primary" onClick={this.onChangeC} style={buttonStyle}>
                                    <input type="radio" name="answer_b" autoComplete="off" /> {entry.q_answer_c}
                                </label>
                                <label className="btn btn-outline-primary" onClick={this.onChangeD} style={buttonStyle}>
                                    <input type="radio" autoComplete="off" /> {entry.q_answer_d}
                                </label>


                                {/* <button className="btn btn-outline-primary btn-block" name="answer_a" onClick={this.onChangeA}>{entry.answer_a}</button>
                                <br />
                                <button className="btn btn-outline-primary btn-block" name="answer_b" onClick={this.onChangeB}>{entry.answer_b}</button>
                                <br />
                                <button className="btn btn-outline-primary btn-block" name="answer_c" onClick={this.onChangeC}>{entry.answer_c}</button>
                                <br />
                                <button className="btn btn-outline-primary btn-block" name="answer_d" onClick={this.onChangeD}>{entry.answer_d}</button> */}
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

ActiveQuiz.propTypes = {
    activeUser: PropTypes.func.isRequired,
    //activeQuestion: PropTypes.func.isRequired,
    //nextQuestion: PropTypes.func.isRequired,
    answerSubmit: PropTypes.func.isRequired,
    //endQuiz: PropTypes.func.isRequired,
    end: PropTypes.bool,
    questionReducer: PropTypes.shape({
        next: PropTypes.string,
        results: PropTypes.arrayOf(PropTypes.object)
    })

};

const mapStateToProps = (state) => ({
    userReducer: state.userReducer,
    questionReducer: state.questionReducer,
    next: state.questionReducer.next,
    previous: state.questionReducer.previous,
    results: state.questionReducer.results
});

export default connect(mapStateToProps, { activeUser, startQuestion, navQuestion, answerSubmit })(ActiveQuiz);