import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
import {TweenLite} from 'gsap';

class FlugdatenForm1 extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }

    componentWillAppear(callback) {
        window.scrollTo(0, 0);
        console.log('ani1');
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback});
    }

    componentWillEnter(callback) {
        console.log('ani3');
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback});
    }

    componentWillLeave (callback) {
        console.log('ani2');
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px",  onComplete: callback});
    }

    render() {
        const { onChange, onSubmit, valueHour, valueMinute, nameHour, nameMinute, nameComment, valueComment, goNext, ani, nameSP, getOptions, goToPage, valueLandeplatz, valueDate, valueXcdistance, selectedValueSP} = this.props;
        return (
            <main className="main">
                <section className="centered-layout">
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {ani}
                        />}
                        classes = 'centered-layout__header'
                        pageTitle = 'Pilotenseite'
                        titleH2 = 'Erfasse deine Flugdaten.'
                    />
                        <div className="formular-wrapper">
                            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Datum'
                                    inputAction={onChange}
                                    type='text'
                                    name='date'
                                    autocomp=''
                                    value={valueDate}
                                />
                                <div className="formular__input-Icon-wrapper margin-top-0">
                                <div className="formular__input-wrapper">
                                    <label className="formular__label">Startplatz</label>
                                    <div className="formular__select"><i className="fas fa-angle-down"></i>
                                        <select value={selectedValueSP} className="formular__dropdown-select" name={nameSP}
                                                onChange={onChange}>{getOptions}
                                        </select>
                                    </div>
                                </div>
                                <a className="link link--black link-with-icon" onClick={goToPage}><i className="fas fa-plus"></i> Startplatz erfassen </a>
                                </div>
                                <div className="formular__input-Icon-wrapper">
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='Landeplatz'
                                    inputAction={onChange}
                                    type='text'
                                    name='landingplace'
                                    value={valueLandeplatz}
                                    autocomp=''
                                />
                                <a className="link link--black link-with-icon" ><i className="fas fa-map-marker-alt"></i> Aktueller Standort </a>
                                </div>
                                <div className="formular__input-wrapper">
                                    <label className="formular__label">Flugzeit</label>
                                    <div className="formular__select formular__select--half"><i className="fas fa-angle-down"></i>
                                        <select className="formular__dropdown-select" name={nameHour} value={valueHour} onChange={onChange}>
                                            <option className="formular__dropdown-option" value="0">Stunden</option>
                                            <option className="formular__dropdown-option" value="1">1 Stunde</option>
                                            <option className="formular__dropdown-option" value="2">2 Stunden</option>
                                            <option className="formular__dropdown-option" value="3">3 Stunden</option>
                                        </select>
                                    </div>
                                    <div className="formular__select formular__select--half"><i className="fas fa-angle-down"></i>
                                        <select className="formular__dropdown-select" name={nameMinute} value={valueMinute} onChange={onChange}>
                                            <option className="formular__dropdown-option" value="0">Minuten</option>
                                            <option className="formular__dropdown-option" value="1">1 Minute</option>
                                            <option className="formular__dropdown-option" value="2">2 Minuten</option>
                                            <option className="formular__dropdown-option" value="3">3 Minuten</option>
                                        </select>
                                    </div>
                                </div>
                                <InputField 
                                    classes='formular__input-wrapper'
                                    label='XC-Distanz'
                                    inputAction={onChange}
                                    type='text'
                                    name='xcdistance'
                                    autocomp=''
                                    value={valueXcdistance}
                                />
                                <div className="formular__input-wrapper formular__input--text">
                                    <label className="formular__label">Kommentar:</label>
                                    <textarea className="formular__input" type="text" name={nameComment} value={valueComment} onChange={onChange}></textarea>
                                </div>
                                <div className="button-group">
                                    <div className="button-wrapper">
                                        <button type="button" className="button" onClick={goNext}>Weitere Infos erfassen</button>
                                    </div>
                                    <div className="button-wrapper">oder</div>
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
export default FlugdatenForm1;