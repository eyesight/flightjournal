import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import {TweenLite} from 'gsap';

class FlugdatenForm4 extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }

    componentWillEnter(callback){
        TweenLite.to(this.formular1.current, .1, {opacity:"0", x:"-900px", onComplete: callback});
    }

    componentDidEnter(callback) {
        TweenLite.to(this.formular1.current, 0.5, {opacity:"1", x:"0px", onComplete: callback});
    }

    componentWillLeave (callback) {
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px", onComplete: callback});
    }
    render() {
        const { onChange, onSubmit, goBack, goNext, valueSyrideLink, valueXcontestLink, valueAirtribuneLink, errorMessageSyrideLink, errorMessageXcontestLink, errorMessageAirtribuneLink, classNameSyrideLink, classNameXcontestLink, classNameAirtribuneLink} = this.props;
        return (
            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                <InputField 
                    classes={classNameSyrideLink}
                    label='Syride Link hinzufügen'
                    inputAction={onChange}
                    type='text'
                    name='syrideLink'
                    autocomp=''
                    value={valueSyrideLink}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageSyrideLink}
                />
                <InputField 
                    classes={classNameXcontestLink}
                    label='X-Contest Link hinzufügen'
                    inputAction={onChange}
                    type='text'
                    name='xcontestLink'
                    autocomp=''
                    value={valueXcontestLink}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageXcontestLink}
                />
                <InputField 
                    classes={classNameAirtribuneLink}
                    label='Airtribune Link hinzufügenn'
                    inputAction={onChange}
                    type='text'
                    name='airtribuneLink'
                    autocomp=''
                    value={valueAirtribuneLink}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageAirtribuneLink}
                />
                <div className="button-group">
                    <div className="button-wrapper">
                        <button type="button" onClick={goBack} className="button">Zurück</button>
                    </div>
                    <div className="button-wrapper">
                        <button type="button" onClick={goNext} className="button">Weiter</button>
                    </div>
                    <div className="button-wrapper">
                        <button type="submit" className="button">Speichern und schliessen</button>
                    </div>
                </div>
            </form>
        );
    }
};
export default FlugdatenForm4;