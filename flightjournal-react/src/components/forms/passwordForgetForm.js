import React, {Component} from 'react';
import InputField from './inputfield';
import {pwforget} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ErrorAlert from './errorAlert';
import * as validation from '../../utils/validationText';
import * as routes from '../../constants/routes';

const formClass = 'formular__input-wrapper formular__input-wrapper--centered';
const formClassError = 'formular--error';
const formClassTarget = 'formular__input--target';

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: '',
            send: false,
            formClassName: formClass
        };
        this.submitPWforget = this.submitPWforget.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    submitPWforget(event) {
        event.preventDefault();
        return this.props.pwforget(this.state.email).then(
            this.setState({
                send: true,
                email: '',
            })).catch(err => {
            this.setState({
                send: false,
                error: err,
                formClassName: formClass + formClassError
            });
        });
    }

    goBack(event, url) {
        event.preventDefault();
        this.props.history.push(url)
    }

    componentWillUnmount() {
        this.setState({
            send: false,
            email: '',
            error: ''
        })
    }


    render() {
        return (
            <main className="main">
                {this.state.send ?
                    <section id="loginForm" className="centered-layout">
                        <div className="centered-layout__header centered-layout__header--no-marginbottom">
                            <div className="title-page-title">Pilotenseite</div>
                            <h2 className="title-h2">E-Mail wurde versendet.<br /><span className="title--regular"> Bitte prüfen Sie ihr Postfach.</span>
                            </h2>
                        </div>
                        <div>
                            Bitte benutzen Sie den gesendeten Link, um
                            ihr Passwort zurückzusetzen und melden Sie sich erneut an.<br />
                            <a onSubmit={event => {this.goBack(event, routes.LOGIN)}} className="anchor">zurück zum Login</a>
                        </div>
                    </section> :
                    <section id="loginForm" className="centered-layout">
                        <div className="centered-layout__header centered-layout__header--no-marginbottom">
                            <div className="title-page-title">Pilotenseite</div>
                            <h2 className="title-h2">Passwort vergessen?<br /><span className="title--regular"> Jetzt zurücksetzen.</span>
                            </h2>
                        </div>
                        {this.state.error && <ErrorAlert>{validation.valPWforget}</ErrorAlert>}
                        <div className="formular-wrapper">
                            <form onSubmit={event => {this.submitPWforget(event)}} className="formular">
                                <InputField id="email" type="text" label="Name:" name="email" autocomp="email"
                                            classes={this.state.formClassName}
                                            inputAction={(event) => this.setState({
                                                email: event.target.value,
                                                formClassName: formClass + formClassTarget
                                            })}
                                />
                                <div className="button-wrapper">
                                    <button className="button">Passwort zurücksetzen</button>
                                </div>
                            </form>
                        </div>
                    </section>}
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {user: state.user};
}

export default withRouter(connect(mapStateToProps, {pwforget})(PasswordForgetForm));