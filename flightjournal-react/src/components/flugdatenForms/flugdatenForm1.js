import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import {TweenLite} from 'gsap';
import DatePicker from 'react-datepicker';

class FlugdatenForm1 extends Component {
    constructor(props) {
        super(props);
        this.formular1 = React.createRef();
    }

    componentWillAppear(callback) {
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback});
    }

    componentWillEnter(callback) {
        TweenLite.fromTo(this.formular1.current, 0.5, {opacity:"0", x:"-900px"}, {opacity:"1", x:"0px", onComplete: callback});
    }

    componentWillLeave (callback) {
        TweenLite.to(this.formular1.current, 0.5, {opacity:"0", x:"900px",  onComplete: callback});
    }

    render() {
        const { onChange, onSubmit, valueHour, valueMinute, nameHour, nameMinute, nameComment, valueComment, goNext, nameSP, getOptions, goToPage, valueLandeplatz, valueXcdistance, selectedValueSP, handleChange, startDate, classNameDate, classNameDateLP, classNameDateFT, classNameSP, classNameDescription, classNameXcdistance} = this.props;
        return ( 
            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                <div className={classNameDate}>
                    <label className="formular__label">Datum</label>
                    <DatePicker
                        selected={startDate}
                        onChange={handleChange}
                        locale="de-ch"
                        dateFormat="L"
                        className='formular__input'
                        name='date'
                    />
                </div>
                <div className="formular__input-Icon-wrapper margin-top-0">
                <div className={classNameSP}>
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
                    classes={classNameDateLP}
                    label='Landeplatz'
                    inputAction={onChange}
                    type='text'
                    name='landingplace'
                    value={valueLandeplatz}
                    autocomp=''
                />
                <a className="link link--black link-with-icon" ><i className="fas fa-map-marker-alt"></i> Aktueller Standort </a>
                </div>
                <div className={classNameDateFT}>
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
                    classes={classNameXcdistance}
                    label='XC-Distanz'
                    inputAction={onChange}
                    type='text'
                    name='xcdistance'
                    autocomp=''
                    value={valueXcdistance}
                />
                <div className={classNameDescription}>
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
        );
    }
};
export default FlugdatenForm1;