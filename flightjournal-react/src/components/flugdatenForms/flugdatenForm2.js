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
        const { onChange, onSubmit, goBack, goNext, valueMaxaltitude, valueHeightgain, valueMaxclimb, valueStartingtime, valueDistance, errorMessagemaxaltitude, errorMessageheightgain, errorMessagemaxclimp, errorMessagestartingtime, errorMessagedistance, classNamemaxaltitude, classNameheightgain, classNamemaxclimb, classNamestartingtime, classNamedistance} = this.props;
        return (
                <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                    <InputField 
                        classes={classNamemaxaltitude}
                        label='Max. Flughöhe in Meter'
                        inputAction={onChange}
                        type='text'
                        name='maxaltitude'
                        autocomp=''
                        value={valueMaxaltitude}
                        classNamesError='formular__validation'
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
                        classNamesError='formular__validation'
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
                        classNamesError='formular__validation'
                        errorMessage={errorMessagemaxclimp}
                    />
                    <InputField 
                        classes={classNamestartingtime}
                        label='Startzeit'
                        inputAction={onChange}
                        type='text'
                        name='startingtime'
                        autocomp=''
                        value={valueStartingtime}
                        classNamesError='formular__validation'
                        errorMessage={errorMessagestartingtime}
                    />
                    <InputField 
                        classes={classNamedistance}
                        label='Geflogene Distanz'
                        inputAction={onChange}
                        type='text'
                        name='distance'
                        autocomp=''
                        value={valueDistance}
                        classNamesError='formular__validation'
                        errorMessage={errorMessagedistance}
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
export default FlugdatenForm2;