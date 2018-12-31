import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
//import Transition from 'react-transition-group/Transition';
import {TweenLite} from 'gsap';

class StartplacesForm extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }  

    componentDidEnter(callback){ 
        const { delayEnter } = this.props
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback, delay: delayEnter});
    }

    componentWillAppear(callback) {
        window.scrollTo(0, 0);
        const { delayEnter } = this.props
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback, delay: delayEnter});
    }

    componentWillLeave (callback) {
        const { delayLeave } = this.props
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px", onComplete: callback, delay: delayLeave});
    }
    componentWillUnmount() {
        console.log('unmount startareas');
      }
    
    render() {
        const { onChange, onSubmitArea, classNameRegio, regioLabel, nameRegio, valueRegio, getOptionsRegio, errorMessageRegio, valueDescription, errorMessageWindstation1, errorMessageWindstation2, errorMessageWindstation3,
            errorMessageAreaName, errorMessageFunicularLink, errorMessageSandortpin, errorMessageWebcams1, errorMessageWebcams2, errorMessageWebcams3, errorMessageShvInfo, errorMessageXc, errorMessageAreaDescription,
            classNameAreaName, classNameAreaFuniculare, classNameArealocation, classNameAreawebcam, classNameAreawebcam2, classNameAreawebcam3, classNameAreashv, classNameAreawindstation, classNameAreawindstation2, classNameAreawindstation3, classNameAreaXc, classNameAreaDesc } = this.props;
        return (
            <form ref={this.formular1} className="formular" onSubmit={onSubmitArea}>
                <div className={classNameRegio}>
                <label className="formular__label">{regioLabel}</label>
                <div className="formular__select">
                    <i className="fas fa-angle-down"></i>
                    <select className="formular__dropdown-select" name={nameRegio} value={valueRegio} onChange={onChange}>
                        {getOptionsRegio}
                    </select> 
                </div> 
                <span className='formular__validationBox'>{errorMessageRegio}</span>
                </div>
                <InputField 
                    classes={classNameAreaName}
                    label='Fluggebiet Name'
                    inputAction={onChange}
                    type='text'
                    name='startareaname'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageAreaName}
                />
                <InputField 
                    classes={classNameAreaFuniculare}
                    label='Seilbahn Link'
                    inputAction={onChange}
                    type='text'
                    name='funicularLink'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageFunicularLink}
                />
                <InputField 
                    classes={classNameArealocation}
                    label='Standortpin'
                    inputAction={onChange}
                    type='text'
                    name='locationpin'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageSandortpin}
                />
                <InputField 
                    classes={classNameAreawebcam}
                    label='Webcam #1'
                    inputAction={onChange}
                    type='text'
                    name='webcam' 
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageWebcams1}
                />
                <InputField 
                    classes={classNameAreawebcam2}
                    label='Webcam #2'
                    inputAction={onChange}
                    type='text'
                    name='webcam2'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageWebcams2}
                />
                <InputField 
                    classes={classNameAreawebcam3}
                    label='Webcam #3'
                    inputAction={onChange}
                    type='text'
                    name='webcam3'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageWebcams3}
                />
                <InputField 
                    classes={classNameAreashv}
                    label='SHV-Infotafel'
                    inputAction={onChange}
                    type='text'
                    name='shvInfo'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageShvInfo}
                />
                <InputField 
                    classes={classNameAreawindstation}
                    label='Windstation #1'
                    inputAction={onChange}
                    type='text'
                    name='windstation1'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageWindstation1}
                />
                <InputField 
                    classes={classNameAreawindstation2}
                    label='Windstation #2'
                    inputAction={onChange}
                    type='text'
                    name='windstation2'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageWindstation2}
                />
                <InputField 
                    classes={classNameAreawindstation3}
                    label='Windstation #3'
                    inputAction={onChange}
                    type='text'
                    name='windstation3'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageWindstation3}
                />
                <InputField 
                    classes={classNameAreaXc}
                    label='Streckenflug-XContest'
                    inputAction={onChange}
                    type='text'
                    name='xc'
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageXc}
                />
                <div className={classNameAreaDesc}>
                    <label className="formular__label">Beschrieb</label>
                    <textarea className="formular__input" type='text' name='areaDescription' value={valueDescription} onChange={onChange}></textarea>
                    <span className='formular__validationBox'>{errorMessageAreaDescription}</span>
                </div>
                <div className="button-group">
                    <div className="button-wrapper">
                        <button type="submit" className="button button--large-white">Speichern und zurück</button>
                    </div>
                </div>
            </form>
        );
    }
};
export default StartplacesForm;