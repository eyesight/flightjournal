import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import {TweenLite} from 'gsap';

class FlugdatenForm5 extends Component {
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
        const { onChange, onSubmit, goBack, valueWeatherFoehndiagramm, valueWeatherWindBoden, valueWeatherWind800m, valueWeatherWind1500m, valueWeatherWind3000m, valueWeatherRegtherm, valueWeatherFronten, valueWeatherSoaringmeteo, valueWeatherBisendiagramm, errorMessageWeatherFoehndiagramm, errorMessageWeatherWindBoden, errorMessageWeatherWind800m, errorMessageWeatherWind1500m, errorMessageWeatherWind3000m, errorMessageWeatherRegtherm, errorMessageWeatherFronten, errorMessageWeatherSoaringmeteo, errorMessageWeatherBisendiagramm, classNameweatherFoehndiagramm, classNamevalueWeatherWindBoden, classNameweatherWind800m, classNameweatherWind1500m, classNameweatherWind3000m, classNameweatherRegtherm, classNameweatherFronten, classNameweatherSoaringmeteo, classNameweatherBisendiagramm} = this.props;
        return (
            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                <InputField 
                    classes={classNameweatherFoehndiagramm}
                    label='Föhndiagramm'
                    inputAction={onChange}
                    type='text'
                    name='weatherFoehndiagramm'
                    autocomp=''
                    value={valueWeatherFoehndiagramm}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherFoehndiagramm}
                />
                <InputField 
                    classes={classNamevalueWeatherWindBoden}
                    label='Wind Boden'
                    inputAction={onChange}
                    type='text'
                    name='weatherWindBoden'
                    autocomp=''
                    value={valueWeatherWindBoden}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherWindBoden}
                />
                <InputField 
                    classes={classNameweatherWind800m}
                    label='Wind 800 m'
                    inputAction={onChange}
                    type='text'
                    name='weatherWind800m'
                    autocomp=''
                    value={valueWeatherWind800m}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherWind800m}
                />
                <InputField 
                    classes={classNameweatherWind1500m}
                    label='Wind 1500 m'
                    inputAction={onChange}
                    type='text'
                    name='weatherWind1500m'
                    autocomp=''
                    value={valueWeatherWind1500m}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherWind1500m}
                />
                <InputField 
                    classes={classNameweatherWind3000m}
                    label='Wind 3000 m '
                    inputAction={onChange}
                    type='text'
                    name='weatherWind3000m'
                    autocomp=''
                    value={valueWeatherWind3000m}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherWind3000m}
                />
                <InputField 
                    classes={classNameweatherRegtherm}
                    label='Regtherm'
                    inputAction={onChange}
                    type='text'
                    name='weatherRegtherm'
                    autocomp=''
                    value={valueWeatherRegtherm}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherRegtherm}
                />
                <InputField 
                    classes={classNameweatherFronten}
                    label='Fronten'
                    inputAction={onChange}
                    type='text'
                    name='weatherFronten'
                    autocomp=''
                    value={valueWeatherFronten}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherFronten}
                />
                <InputField 
                    classes={classNameweatherSoaringmeteo}
                    label='Soaringmeteo'
                    inputAction={onChange}
                    type='text'
                    name='weatherSoaringmeteo'
                    autocomp=''
                    value={valueWeatherSoaringmeteo}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherSoaringmeteo}
                />
                <InputField 
                    classes={classNameweatherBisendiagramm}
                    label='Bisendiagramm'
                    inputAction={onChange} 
                    type='text'
                    name='weatherBisendiagramm'
                    autocomp=''
                    value={valueWeatherBisendiagramm}
                    classNamesError='formular__validation'
                    errorMessage={errorMessageWeatherBisendiagramm}
                />
                <div className="button-group">
                    <div className="button-wrapper">
                        <button type="button" onClick={goBack} className="button">Zurück</button>
                    </div>
                    <div className="button-wrapper">
                        <button type="submit" className="button">Speichern und schliessen</button>
                    </div>
                </div>
            </form>
        );
    }
};
export default FlugdatenForm5;