import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
//import Transition from 'react-transition-group/Transition';
import {TweenLite} from 'gsap';
import * as routes from '../../constants/routes';

class StartplacesForm extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }
    componentDidMount() {
        console.log('Component did mount');
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
    componentDidLeave() {
        console.log('did leave');
    }
    componentWillUnmount() {
        this.props.history.push(routes.FLUGDATEN_ERFASSEN);
      }
    render() {
        const { onChange, onSubmit, goBack, ani} = this.props;
        return (
                <main className="main">
                <section className="centered-layout">
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {ani}
                        />}
                        classes = 'centered-layout__header'
                        pageTitle = 'Pilotenseite'
                        titleH2 = 'neuen Startplatz erfassen'
                    />
                        <div className="formular-wrapper">
                            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Name'
                                    inputAction={onChange}
                                    type='text'
                                    name='name'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper margin-top-0'
                                    label='Startplatz-Höhe in Meter'
                                    inputAction={onChange}
                                    type='text'
                                    name='altitude'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Gebiet'
                                    inputAction={onChange}
                                    type='text'
                                    name='area'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Beschreibung'
                                    inputAction={onChange}
                                    type='text'
                                    name='description'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Windrichtung'
                                    inputAction={onChange}
                                    type='text'
                                    name='winddirection'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Schwierigkeiten/Hindernisse'
                                    inputAction={onChange}
                                    type='text'
                                    name='difficulties'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Beschrieb Zustand'
                                    inputAction={onChange}
                                    type='text'
                                    name='descriptionSmall'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Bilder (URL)'
                                    inputAction={onChange}
                                    type='text'
                                    name='imagesUrl'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Anreise'
                                    inputAction={onChange}
                                    type='text'
                                    name='anreise'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Webcam (Link)'
                                    inputAction={onChange}
                                    type='text'
                                    name='webcam'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Link zur Windstation'
                                    inputAction={onChange}
                                    type='text'
                                    name='windstations'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Link zu Wettervorhersage'
                                    inputAction={onChange}
                                    type='text'
                                    name='weatherForecast'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Link zu Thermikhotspots'
                                    inputAction={onChange}
                                    type='text'
                                    name='thermalHotspots'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Streckenflug'
                                    inputAction={onChange}
                                    type='text'
                                    name='streckenflug'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Link zu SHV-Info'
                                    inputAction={onChange}
                                    type='text'
                                    name='shvInfo'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Link zu Seilbahn'
                                    inputAction={onChange}
                                    type='text'
                                    name='seilbahn'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='weitere Startplätze'
                                    inputAction={onChange}
                                    type='text'
                                    name='linkToSibling'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Link zu GoogleMaps'
                                    inputAction={onChange}
                                    type='text'
                                    name='googleMaps'
                                    autocomp=''
                                />
                                <div className="button-group">
                                    <div className="button-wrapper">
                                        <button type="button" onClick={goBack} className="button">Zurück</button>
                                    </div>
                                    <div className="button-wrapper">
                                        <button type="submit" className="button">Speichern und zurück</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </main>
        );
    }
};
export default StartplacesForm;