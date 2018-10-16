import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
//import Transition from 'react-transition-group/Transition';
import {TweenLite} from 'gsap';

class StartplacesForm extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }  

    componentWillAppear(callback) {
        window.scrollTo(0, 0);
        const { delayEnter } = this.props
        console.log('spani1');
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback, delay: delayEnter});
    }

    componentWillLeave (callback) {
        const { delayLeave } = this.props
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px", onComplete: callback, delay: delayLeave});
    }
    
    render() {
        const { onChange, onSubmitArea, classNameRegio, regioLabel, nameRegio, valueRegio, getOptionsRegio, errorMessageRegio,
            errorMessageAreaName, errorMessageFunicularLink, errorMessageSandortpin, errorMessageSBB, errorMessageGoogleMaps, errorMessageWebcams1, errorMessageWebcams2, errorMessageWebcams3, errorMessageShvInfo, errorMessageWindMeteocentrale, errorMessageLiveWindmap, errorMessageThermikhotspots, errorMessageMeteoswiss, errorMessageThermikforecast, errorMessageXc, errorMessageAreaDescription } = this.props;
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
                    classes='formular__input-wrapper'
                    label='Fluggebiet Name'
                    inputAction={onChange}
                    type='text'
                    name='startareaname'
                    autocomp=''
                    classNamesError={errorMessageAreaName}
                />
                <InputField 
                    classes='formular__input-wrapper formular__input-wrapper--margin-left'
                    label='Seilbahn Link'
                    inputAction={onChange}
                    type='text'
                    name='funicularLink'
                    autocomp=''
                    classNamesError={errorMessageFunicularLink}
                />
                <InputField 
                    classes='formular__input-wrapper formular__input-wrapper--fullwith'
                    label='Standortpin'
                    inputAction={onChange}
                    type='text'
                    name='locationpin'
                    autocomp=''
                    classNamesError={errorMessageSandortpin}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Anreise SBB'
                    inputAction={onChange}
                    type='text'
                    name='sbb'
                    autocomp=''
                    classNamesError={errorMessageSBB}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Anreise Google'
                    inputAction={onChange}
                    type='text'
                    name='googleMaps'
                    autocomp=''
                    classNamesError={errorMessageGoogleMaps}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Webcam #1'
                    inputAction={onChange}
                    type='text'
                    name='webcam'
                    autocomp=''
                    classNamesError={errorMessageWebcams1}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Webcam #2'
                    inputAction={onChange}
                    type='text'
                    name='webcam2'
                    autocomp=''
                    classNamesError={errorMessageWebcams2}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Webcam #3'
                    inputAction={onChange}
                    type='text'
                    name='webcam3'
                    autocomp=''
                    classNamesError={errorMessageWebcams3}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='SHV-Infotafel'
                    inputAction={onChange}
                    type='text'
                    name='shvInfo'
                    autocomp=''
                    classNamesError={errorMessageShvInfo}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Wind-Meteocentrale'
                    inputAction={onChange}
                    type='text'
                    name='windMeteocentrale'
                    autocomp=''
                    classNamesError={errorMessageWindMeteocentrale}
                />
                 <InputField 
                    classes='formular__input-wrapper'
                    label='Live-Wind-Map'
                    inputAction={onChange}
                    type='text'
                    name='liveWindmap'
                    autocomp=''
                    classNamesError={errorMessageLiveWindmap}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Thermik-Hotspots'
                    inputAction={onChange}
                    type='text'
                    name='thermikHotspots'
                    autocomp=''
                    classNamesError={errorMessageThermikhotspots}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Wetterprognose Meteoswiss'
                    inputAction={onChange}
                    type='text'
                    name='meteoswiss'
                    autocomp=''
                    classNamesError={errorMessageMeteoswiss}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Thermikprognose'
                    inputAction={onChange}
                    type='text'
                    name='therikForecast'
                    autocomp=''
                    classNamesError={errorMessageThermikforecast}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Streckenflug-XContest'
                    inputAction={onChange}
                    type='text'
                    name='xc'
                    autocomp=''
                    classNamesError={errorMessageXc}
                />
                <InputField 
                    classes='formular__input-wrapper formular__input--text'
                    label='Beschrieb'
                    inputAction={onChange}
                    type='text'
                    name='areaDescription'
                    autocomp=''
                    classNamesError={errorMessageAreaDescription}
                /> 
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