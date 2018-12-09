import React, { Component } from 'react';
import InputField from '../formInputfield/formInputfield';
import { login, getUser } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormErrorAlert from '../formErrorAlert/formErrorAlert';
import FormTitle from '../formTitle/formTitle';
import FormAnimation from '../formAnimation/formAnimation';
import BackButton from './../backButton/backButton';
import * as validation from '../../utils/validationText';
import * as routes from '../../constants/routes';

class LoginFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            formClassPW: 'formular__input-wrapper margin-top-0',
            formClassName: 'formular__input-wrapper'
        };
    }

    componentWillMount() {
        this.props.getUser();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.email !== undefined) {
            this.props.history.push(routes.LANDING);
        }
    }

    submitLogin(event) {
        event.preventDefault();
        this.props.login(this.state.email, this.state.password).catch(err => {
            this.setState({
                error: err,
                formClassPW: 'formular__input-wrapper margin-top-0 formular--error',
                formClassName: 'formular__input-wrapper formular--error'
            });
        });
    }

    render() {
        const {ani} = this.props;
        return (
            <main className="main">
                <section id="loginForm" className="centered-layout">
                    <BackButton 
                        backto = {true}
                        text = 'Zurück zur Übersicht'
                    />
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {ani}
                        />}
                        classes = 'centered-layout__header'
                        pageTitle = 'Log in'
                        titleH2 = 'Noch nicht angemeldet?'
                        titleH2regular = 'Jetzt anmelden.'
                    />
                    {this.state.error && <FormErrorAlert>{validation.valLogin_emailPW}</FormErrorAlert>}
                    <div className="formular-wrapper">
                        <form onSubmit={event => { this.submitLogin(event);}} className="formular">
                            <InputField id="email" type="text" label="Name:" name="name" classes={this.state.formClassName} autocomp="email"
                                        inputAction={(event) => this.setState({ email: event.target.value, formClassName: 'formular__input-wrapper formular__input--target' })}
                            />
                            <InputField id="pw" type="password" label="Passwort:" name="password" classes={this.state.formClassPW} autocomp="current-password"
                                        inputAction={(event) => this.setState({ password: event.target.value, formClassPW: 'formular__input-wrapper margin-top-0 formular__input--target'})}
                            />
                            <div className="link-wrapper link-wrapper--right">
                                <a className="link link--black" onClick={(event) => {event.preventDefault(); this.props.history.push(routes.PASSWORD_FORGET)}}><span className="link__sign">?</span> Passwort vergessen</a>
                            </div>
                            <div className="button-wrapper">
                                <button className="button button--single">Jetzt einloggen</button>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default withRouter(connect(mapStateToProps, { login, getUser })(LoginFormContainer));