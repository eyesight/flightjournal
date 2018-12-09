import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import {pwforget} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import FormErrorAlert from '../formErrorAlert/formErrorAlert';
import FormTitle from '../formTitle/formTitle';
import BackButton from './../backButton/backButton';
import * as validation from '../../utils/validationText';
import * as routes from '../../constants/routes';

const formClass = 'formular__input-wrapper formular__input-wrapper--centered';
const formClassError = 'formular--error';
const formClassTarget = 'formular__input--target';

class PasswordForgetFormContainer extends Component {
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
                formClassName: formClass + " " + formClassError
            });
        });
    }

    goBack(event, url) {
        event.preventDefault();
        this.props.history.push(url);
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
                    <FormTitle 
                        classes = 'centered-layout__header centered-layout__header--no-marginbottom'
                        pageTitle = 'Passwort vergessen'
                        titleH2 = 'E-Mail wurde versendet.'
                        titleH2regular = ' Bitte prüfen Sie ihr Postfach.'
                    />
                        <div className="centered-layout--center-txt">
                            Bitte benutzen Sie den gesendeten Link, um
                            ihr Passwort zurückzusetzen und melden Sie sich erneut an.<br /><br /><br />
                            <a onClick={event => {this.goBack(event, routes.LOGIN)}} className="anchor">zurück zum Login</a>
                        </div>
                    </section> :
                    <section id="loginForm" className="centered-layout">
                        <BackButton 
                            backto = {false} 
                            text = 'Abbrechen'
                            backfunction={event => {this.goBack(event, routes.LOGIN)}}
                        />
                        <FormTitle 
                            classes = 'centered-layout__header centered-layout__header--no-marginbottom'
                            pageTitle = 'Passwort vergessen'
                            titleH2 = 'Passwort vergessen?'
                            titleH2regular = ' Jetzt zurücksetzen.'
                        />
                        {this.state.error && <FormErrorAlert>{validation.valPWforget}</FormErrorAlert>}
                        <div className="formular-wrapper">
                            <form onSubmit={event => {this.submitPWforget(event)}} className="formular">
                                <InputField id="email" type="text" label="Name:" name="email" autocomp="email"
                                            classes={this.state.formClassName}
                                            inputAction={(event) => this.setState({
                                                email: event.target.value,
                                                formClassName: formClass +" "+ formClassTarget
                                            })}
                                />
                                <div className="button-wrapper">
                                    <button className="button button--single">Passwort zurücksetzen</button>
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

export default withRouter(connect(mapStateToProps, {pwforget})(PasswordForgetFormContainer));