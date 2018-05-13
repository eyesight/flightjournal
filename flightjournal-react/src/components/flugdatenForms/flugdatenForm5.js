import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
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
        const { onChange, onSubmit, goBack, ani5} = this.props;
        return (
                <main className="main">
                <section className="centered-layout">
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {ani5}
                        />}
                        classes = 'centered-layout__header'
                        pageTitle = 'Pilotenseite'
                        titleH2 = 'Screenshots zum Wetter hochladen.'
                    />
                        <div className="formular-wrapper">
                            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Föhndiagramm'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherFoehndiagramm'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper margin-top-0'
                                    label='Wind Boden'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherWindBoden'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Wind 800 m'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherWind800m'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Wind 1500 m'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherWind1500m'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Wind 3000 m '
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherWind3000m'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Regtherm'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherRegtherm'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Fronten'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherFronten'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Soaringmeteo'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherSoaringmeteo'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Bisendiagramm'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherBisendiagramm'
                                    autocomp=''
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
                        </div>
                    </section>
                </main>
        );
    }
};
export default FlugdatenForm5;