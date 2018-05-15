import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
import {TweenLite} from 'gsap';

class FlugdatenForm3 extends Component {
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
        const { onChange, onSubmit, goBack, goNext, ani3, valueImgUrl} = this.props;
        return (
                <main className="main">
                <section className="centered-layout">
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {ani3}
                        />}
                        classes = 'centered-layout__header'
                        pageTitle = 'Pilotenseite'
                        titleH2 = 'Weitere optionale Daten zum Flug.'
                    />
                        <div className="formular-wrapper">
                            <form ref={this.formular1} className="formular" onSubmit={onSubmit}>
                                <InputField 
                                    classes='formular__input-wrapper formular__input-wrapper--centered'
                                    label='Bilder hochladen.'
                                    inputAction={onChange}
                                    type='text'
                                    name='imgUrl'
                                    autocomp=''
                                    value={valueImgUrl}
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
export default FlugdatenForm3;