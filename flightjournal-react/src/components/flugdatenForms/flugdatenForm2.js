import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import {TweenLite} from 'gsap';

class FlugdatenForm2 extends Component {
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
        const { onChange, onSubmit, goBack, goNext, valueMaxaltitude, valueHeightgain, valueMaxclimb, nameStartHour, valueStartHour, getOptionsStartHour, nameStartMinute, valueStartMinute, getOptionsStartMinute, valueDistance, errorMessagemaxaltitude, errorMessageheightgain, errorMessagemaxclimp, errorMessagestartingtime, errorMessagedistance, classNamemaxaltitude, classNameheightgain, classNamemaxclimb, classNamestartingtime, classNamedistance, classNameXcdistance, valueXcdistance, errorMessageXC, classNameMaxsink, valueMaxsink, errorMessagemaxsink, classNameWeatherDescription, labelWeatherDescription, nameWeatherDescription, valueWeatherDescription, errorMessageWeatherDescription, classNameGlider, gliderLabel, nameGlider, valueGlider, getOptionsGlider, errorMessageGlider} = this.props;
        return (
                <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                    <InputField 
                        classes={classNameXcdistance}
                        label='XC-Distanz in Kilometer'
                        inputAction={onChange}
                        type='text'
                        name='xcdistance'
                        autocomp=''
                        value={valueXcdistance}
                        classNamesError='formular__validationBox' 
                        errorMessage={errorMessageXC}
                    />
                    <InputField 
                        classes={classNamemaxaltitude}
                        label='Max. Flughöhe in Meter'
                        inputAction={onChange}
                        type='text'
                        name='maxaltitude'
                        autocomp=''
                        value={valueMaxaltitude}
                        classNamesError='formular__validationBox'
                        errorMessage={errorMessagemaxaltitude}
                    />
                    <InputField 
                        classes={classNameheightgain}
                        label='Max. Höhengewinn in Meter'
                        inputAction={onChange}
                        type='text'
                        name='heightgain'
                        autocomp=''
                        value={valueHeightgain}
                        classNamesError='formular__validationBox'
                        errorMessage={errorMessageheightgain}
                    />
                    <InputField 
                        classes={classNamemaxclimb}
                        label='Max. Steigen (Meter/Sekunde)'
                        inputAction={onChange}
                        type='text'
                        name='maxclimb'
                        autocomp=''
                        value={valueMaxclimb}
                        classNamesError='formular__validationBox'
                        errorMessage={errorMessagemaxclimp}
                    />
                    {/* <InputField 
                        classes={classNamestartingtime}
                        label='Startzeit'
                        inputAction={onChange}
                        type='text'
                        name='startingtime'
                        autocomp=''
                        value={valueStartingtime}
                        classNamesError='formular__validationBox'
                        errorMessage={errorMessagestartingtime}
                    /> */}
                    <div className={classNamestartingtime}>
                        <label className="formular__label">Startzeit</label>
                        <div className="formular__select formular__select--25">
                            <i className="fas fa-angle-down"></i>
                            <select className="formular__dropdown-select" name={nameStartHour} value={valueStartHour} onChange={onChange}>
                                {getOptionsStartHour}
                            </select> 
                        </div> 
                        <p className="formular__select formular__select--15">:</p>
                        <div className="formular__select formular__select--25"><i className="fas fa-angle-down"></i>
                            <select className="formular__dropdown-select" name={nameStartMinute} value={valueStartMinute} onChange={onChange}>
                                {getOptionsStartMinute}
                            </select> 
                        </div>
                        <p className="formular__select formular__select--25 formular__select--last">Uhr</p>
                        <span className='formular__validationBox'>{errorMessagestartingtime}</span>
                    </div>
                    <InputField 
                        classes={classNamedistance}
                        label='Geflogene Distanz'
                        inputAction={onChange}
                        type='text'
                        name='distance'
                        autocomp=''
                        value={valueDistance}
                        classNamesError='formular__validationBox'
                        errorMessage={errorMessagedistance} 
                    />
                    <InputField 
                        classes={classNameMaxsink}
                        label='Max. Sinken (Meter/Sekunde)'
                        inputAction={onChange}
                        type='text'
                        name='maxsink'
                        autocomp=''
                        value={valueMaxsink}
                        classNamesError='formular__validationBox'
                        errorMessage={errorMessagemaxsink}
                    />
                    <div className={classNameGlider}>
                        <label className="formular__label">{gliderLabel}</label>
                        <div className="formular__select">
                            <i className="fas fa-angle-down"></i>
                            <select className="formular__dropdown-select" name={nameGlider} value={valueGlider} onChange={onChange}>
                                {getOptionsGlider}
                            </select> 
                    </div> 
                    <span className='formular__validationBox'>{errorMessageGlider}</span>
                    </div>
                    <div className={classNameWeatherDescription}>
                    <label className="formular__label">{labelWeatherDescription}</label>
                    <textarea className="formular__input" type="text" name={nameWeatherDescription} value={valueWeatherDescription} onChange={onChange}></textarea>
                    <span className='formular__validationBox'>{errorMessageWeatherDescription}</span>
                </div>
                    <div className="button-group">
                        <div className="button-wrapper">
                            <button type="button" onClick={goBack} className="button">Zurück</button>
                            <button type="button" onClick={goNext} className="button">Weiter</button>
                        </div>
                        <div className="button-wrapper">
                            <button type="submit" className="button button--large">Speichern und schliessen</button>
                        </div>
                    </div>
                </form>
        );
    }
};
export default FlugdatenForm2;