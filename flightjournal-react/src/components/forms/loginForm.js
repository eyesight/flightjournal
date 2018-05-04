import React, { Component } from 'react';
import InputField from './inputfield';
import { login, getUser } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ErrorAlert from './errorAlert';
import * as validation from '../../utils/validationText'
import * as routes from '../../constants/routes';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            formClassPW: 'formular__input-wrapper',
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
                formClassPW: 'formular__input-wrapper formular--error',
                formClassName: 'formular__input-wrapper formular--error'
            });
        });
    }

    render() {
        return (
            <main className="main">
                <section id="loginForm" className="centered-layout">
                    <div className="centered-layout__header centered-layout__header--no-marginbottom">
                        <div className="title-page-title">Pilotenseite</div>
                        <h2 className="title-h2">Noch nicht angemeldet?<br /><span className="title--regular"> Jetzt anmelden.</span>
                        </h2>
                    </div>
                    {this.state.error && <ErrorAlert>{validation.valLogin_emailPW}</ErrorAlert>}
                    <div className="formular-wrapper">
                        <form onSubmit={event => { this.submitLogin(event);}} className="formular">
                            <InputField id="email" type="text" label="Name:" name="name" classes={this.state.formClassName} autocomp="email"
                                        inputAction={(event) => this.setState({ email: event.target.value, formClassName: 'formular__input-wrapper formular__input--target' })}
                            />
                            <InputField id="pw" type="password" label="Passwort:" name="password" classes={this.state.formClassPW} autocomp="current-password"
                                        inputAction={(event) => this.setState({ password: event.target.value, formClassPW: 'formular__input-wrapper formular__input--target'})}
                            />
                            <div className="link-wrapper link-wrapper--right">
                                <a className="link link--black" onClick={(event) => {event.preventDefault(); this.props.history.push(routes.PASSWORD_FORGET)}}><span className="link__sign">?</span> Passwort vergessen</a>
                            </div>
                            <div className="button-wrapper">
                                <button className="button">Jetzt einloggen</button>
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

export default withRouter(connect(mapStateToProps, { login, getUser })(LoginForm));