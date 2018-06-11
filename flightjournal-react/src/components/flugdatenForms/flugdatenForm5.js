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
        const { onChange, onSubmit, goBack, valueWeatherFoehndiagramm, valueWeatherWindBoden, valueWeatherWind800m, valueWeatherWind1500m, valueWeatherWind3000m, valueWeatherRegtherm, valueWeatherFronten, valueWeatherSoaringmeteo, valueWeatherBisendiagramm} = this.props;
        return (
            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                <InputField 
                    classes='formular__input-wrapper'
                    label='Föhndiagramm'
                    inputAction={onChange}
                    type='text'
                    name='weatherFoehndiagramm'
                    autocomp=''
                    value={valueWeatherFoehndiagramm}
                />
                <InputField 
                    classes='formular__input-wrapper margin-top-0'
                    label='Wind Boden'
                    inputAction={onChange}
                    type='text'
                    name='weatherWindBoden'
                    autocomp=''
                    value={valueWeatherWindBoden}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Wind 800 m'
                    inputAction={onChange}
                    type='text'
                    name='weatherWind800m'
                    autocomp=''
                    value={valueWeatherWind800m}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Wind 1500 m'
                    inputAction={onChange}
                    type='text'
                    name='weatherWind1500m'
                    autocomp=''
                    value={valueWeatherWind1500m}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Wind 3000 m '
                    inputAction={onChange}
                    type='text'
                    name='weatherWind3000m'
                    autocomp=''
                    value={valueWeatherWind3000m}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Regtherm'
                    inputAction={onChange}
                    type='text'
                    name='weatherRegtherm'
                    autocomp=''
                    value={valueWeatherRegtherm}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Fronten'
                    inputAction={onChange}
                    type='text'
                    name='weatherFronten'
                    autocomp=''
                    value={valueWeatherFronten}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Soaringmeteo'
                    inputAction={onChange}
                    type='text'
                    name='weatherSoaringmeteo'
                    autocomp=''
                    value={valueWeatherSoaringmeteo}
                />
                <InputField 
                    classes='formular__input-wrapper'
                    label='Bisendiagramm'
                    inputAction={onChange}
                    type='text'
                    name='weatherBisendiagramm'
                    autocomp=''
                    value={valueWeatherBisendiagramm}
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