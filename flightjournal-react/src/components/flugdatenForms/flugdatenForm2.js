import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
import {TweenLite} from 'gsap';

class FlugdatenForm2 extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }

    componentWillEnter(callback){
        console.log('ani4');
        TweenLite.to(this.formular1.current, .1, {opacity:"0", x:"-900px", onComplete: callback});
    }

    componentDidEnter(callback) {
        console.log('ani5');
        TweenLite.to(this.formular1.current, 0.5, {opacity:"1", x:"0px", onComplete: callback});
    }

    componentWillLeave (callback) {
        console.log('ani6');
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px", onComplete: callback});
    }
    componentWillUnmount(){
        console.log('ddd');
    }
    render() {
        const { onChange, onSubmit, goBack, goNext, ani2} = this.props;
        return (
                <main className="main">
                <section className="centered-layout">
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {ani2}
                        />}
                        classes = 'centered-layout__header'
                        pageTitle = 'Pilotenseite'
                        titleH2 = 'Weitere optionale Daten zum Flug.'
                    />
                        <div className="formular-wrapper">
                            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Max. Flughöhe in Meter'
                                    inputAction={onChange}
                                    type='text'
                                    name='maxaltitude'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper margin-top-0'
                                    label='Max. Höhengewinn in Meter'
                                    inputAction={onChange}
                                    type='text'
                                    name='heightgain'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Max. Steigen (Meter/Sekunde)'
                                    inputAction={onChange}
                                    type='text'
                                    name='maxclimb'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Startzeit'
                                    inputAction={onChange}
                                    type='text'
                                    name='startingtime'
                                    autocomp=''
                                />
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Geflogene Distanz'
                                    inputAction={onChange}
                                    type='text'
                                    name='distance'
                                    autocomp=''
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
                        </div>
                    </section>
                </main>
        );
    }
};
export default FlugdatenForm2;