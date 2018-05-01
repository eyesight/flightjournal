import React, { Component } from 'react';
import {TimelineLite} from 'gsap';
import {weather} from '../../utils/_weatherData';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.tropfen1 = React.createRef();
        this.tropfen2 = React.createRef();
        this.tropfen3 = React.createRef();
        this.tropfen4 = React.createRef();
        this.regen = React.createRef();
        this.schrift = React.createRef();
        this.berge = React.createRef();
        this.flug = React.createRef();
        this.ziit = React.createRef();
        this.wolkeR = React.createRef();
        this.wolkeL = React.createRef();
        this.sonne = React.createRef();

    }

    componentWillAppear (callback) {
        const weatherData = weather();
        this.wolken = [this.wolkeR.current, this.wolkeL.current];
        this.tropfen = [this.tropfen1.current, this.tropfen2.current, this.tropfen3.current, this.tropfen4.current];
        const tl = new TimelineLite({paused:true});
        const tlr = new TimelineLite({paused:true});
        const tls = new TimelineLite({paused:true});
        const tlw = new TimelineLite({paused:true});
        const tlsw = new TimelineLite({paused:true});

        let frain;
        let fsun;
        let fcloud;
        let fscloud;

        frain = tlr;
        fsun = tls;
        fcloud = tlw;
        fscloud = tlsw;
        tl.delay(1).play();

        tl.add('text');

        //start-animation mobile
        tl.fromTo(this.flug.current, 0.5, {x:17}, {x:0, onComplete: callback}, 'text')
            .fromTo(this.ziit.current, 0.5, {x:-17},{x:0, onComplete: callback}, 'text');


        //animation for rain mobile
        tlr.fromTo(this.regen.current, 1, {opacity:0, y:'50px', x:'2px'}, {opacity:1, y:'20px'})
            .staggerFrom(this.tropfen, 0.2, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15);

        //animation sun mobile
        tls.fromTo(this.sonne.current, 1, {opacity:0, y:'50px'}, {opacity:1, y:'30px'});

        //animtion clouds mobile
        tlw.staggerFromTo(this.wolken, 0.5,
            {x: '16px',
                y:'50px',
                scaleY:0,
                scaleX:0,
                transformOrigin: '0 0'},
            {y:'50px',
                scaleY:1,
                scaleX:1,
                transformOrigin: '50% 50%'})
            .to(this.wolkeL.current, 0.5, {y: '30px'}, '-=0.4')
            .to(this.wolkeR.current, 0.5, {y: '30px'}, '-=0.4');

        //animation sunny with clouds mobile
        tlsw.fromTo(this.sonne.current, 0.5, {opacity:0, y:'50px'}, {opacity:1, y:'20px'})
            .staggerFromTo(this.wolken, 0.5,
                {x: '16px',
                    scaleY:0,
                    scaleX:0,
                    transformOrigin: '0 0',
                    opacity: 1},
                {scaleY:1,
                    scaleX:1,
                    transformOrigin: '50% 50%',
                    opacity: 1}, "+=0.25", "-=0.4")
            .to(this.wolkeL.current, 0.5, {y: '30px'}, '-=0.4')
            .to(this.wolkeR.current, 0.5, {y: '30px'}, '-=0.4');
        //switch for the weather-id
        switch(weatherData.weather[0].id){
            case 801:
                fsun.time(0).pause();
                frain.time(0).pause();
                fcloud.time(0).pause();
                fscloud.delay(1).play();
                break;
            case 800:
                frain.time(0).pause();
                fcloud.time(0).pause();
                fscloud.time(0).pause();
                fsun.delay(1).play();
                break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
            case 511:
            case 520:
            case 521:
            case 522:
            case 531:
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            case 600:
            case 601:
            case 602:
            case 611:
            case 612:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
                fsun.time(0).pause();
                fcloud.time(0).pause();
                fscloud.time(0).pause();
                frain.delay(1).play();
                break;
            case 802:
            case 803:
            case 804:
                fsun.time(0).pause();
                frain.time(0).pause();
                fscloud.time(0).pause();
                fcloud.delay(1).play();
                break;
            default:
                fsun.time(0).pause();
                frain.time(0).pause();
                fcloud.time(0).pause();
                fscloud.delay(1).play();
        }
    }

    render() {
        return (
            <div className="header__logo">
                <div className="header__logo-wrapper">
                    <a className="header__anchor" href="index.html">
                        <svg viewBox="0 10 125.5 53.17" preserveAspectRatio="xMidYMin slice" width="100%">
                            <g ref={this.sonne} className="sonne">
                                <g>
                                    <circle className="cls-2" cx="66.74" cy="14.66" r="9.01"/>
                                    <line className="cls-2" x1="66.74" y1="25.92" x2="66.74" y2="27.76"/>
                                    <line className="cls-2" x1="74.7" y1="22.62" x2="76.01" y2="23.92"/>
                                    <line className="cls-2" x1="78" y1="14.66" x2="79.84" y2="14.66"/>
                                    <line className="cls-2" x1="74.7" y1="6.7" x2="76.01" y2="5.4"/>
                                    <line className="cls-2" x1="66.74" y1="3.4" x2="66.74" y2="1.56"/>
                                    <line className="cls-2" x1="58.78" y1="6.7" x2="57.48" y2="5.4"/>
                                    <line className="cls-2" x1="55.49" y1="14.66" x2="53.65" y2="14.66"/>
                                    <line className="cls-2" x1="58.78" y1="22.62" x2="57.48" y2="23.92"/>
                                </g>
                            </g>
                            <g ref={this.schrift} className="schrift">
                                <g ref={this.flug} className="flug">
                                    <path className="cls-3 f" d="M.62,50.24v-8.5H5.78v1.09h-4v2.73H5.41v1.1H1.79v3.57Z"/>
                                    <path className="cls-3 l" d="M12,50.24v-8.5H13.2v7.4h4v1.1Z"/>
                                    <path className="cls-3 u" d="M23.16,47.34v-5.6h1.16V47.3a1.89,1.89,0,1,0,3.78,0V41.74h1.18v5.6a2.88,2.88,0,0,1-3.06,3.08A2.88,2.88,0,0,1,23.16,47.34Z"/>
                                    <path className="cls-3 g" d="M42.54,50.24,42.43,49a3,3,0,0,1-2.72,1.38A4.12,4.12,0,0,1,35.58,46a4.19,4.19,0,0,1,4.21-4.43,3.78,3.78,0,0,1,3.77,2.57l-1.07.46a2.68,2.68,0,0,0-2.7-1.94,3,3,0,0,0-3,3.35c0,2.25,1.44,3.37,3,3.37a2.42,2.42,0,0,0,2.63-2.22h-3V46.08h4.07v4.16Z"/>
                                </g>
                                <g ref={this.ziit} className="ziit">
                                    <path className="cls-3 z" d="M89.85,50.24V49.07l5.07-6.24H90V41.74h6.38v1.14l-5.1,6.26h5.16v1.1Z"/>
                                    <path className="cls-3 i" d="M102.77,50.24v-8.5H104v8.5Z"/>
                                    <path className="cls-3 i2" d="M110.93,50.24v-8.5h1.2v8.5Z"/>
                                    <path className="cls-3 t" d="M122.15,42.83v7.41H121V42.83h-2.84V41.74H125v1.09Z"/>
                                </g>
                            </g>
                            <g ref={this.wolkeR} className="wolken wolke1">
                                <path className="cls-4" d="M78.17,17.57h-.22a7.41,7.41,0,0,0-14.1,1.94,4.8,4.8,0,1,0-1.4,9.4H78.17a5.68,5.68,0,0,0,0-11.35Z"/>
                            </g>
                            <g ref={this.wolkeL} className="wolken wolke2">
                                <path className="cls-4" d="M65.17,17.57h-.22a7.41,7.41,0,0,0-14.1,1.94,4.8,4.8,0,1,0-1.4,9.4H65.17a5.68,5.68,0,0,0,0-11.35Z"/>
                            </g>
                            <g ref={this.regen} className="regen">
                                <path className="cls-10" d="M74.17,242.91h-.22a7.41,7.41,0,0,0-14.1,1.94,4.8,4.8,0,1,0-1.4,9.4H74.17a5.68,5.68,0,0,0,0-11.35Z" transform="translate(-0.62 -231.9)"/>
                                <g ref={this.tropfen1} className="tropfen1" data-name="Ebene 6">
                                    <path className="cls-11" d="M58,265a.5.5,0,0,1-.78-.62l5.59-7a.5.5,0,0,1,.78.63" transform="translate(-0.62 -231.9)"/>
                                </g>
                                <g ref={this.tropfen2} className="tropfen2" data-name="Ebene 7">
                                    <path className="cls-11" d="M55.21,261.74a.49.49,0,0,1-.31-.11.5.5,0,0,1-.08-.7l2.8-3.49a.5.5,0,0,1,.78.63l-2.8,3.49A.5.5,0,0,1,55.21,261.74Z" transform="translate(-0.62 -231.9)"/>
                                </g>
                                <g ref={this.tropfen3} className="tropfen3" data-name="Ebene 8">
                                    <path className="cls-11" d="M65.69,261.74a.5.5,0,0,1-.39-.81l2.8-3.49a.5.5,0,0,1,.78.63l-2.8,3.49A.5.5,0,0,1,65.69,261.74Z" transform="translate(-0.62 -231.9)"/>
                                </g>
                                <g ref={this.tropfen4} className="tropfen4" data-name="Ebene 9">
                                    <path className="cls-11" d="M68.14,265.23a.49.49,0,0,1-.31-.11.5.5,0,0,1-.08-.7l5.59-7a.5.5,0,0,1,.78.63l-5.59,7A.5.5,0,0,1,68.14,265.23Z" transform="translate(-0.62 -231.9)"/>
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
        );
    }
}

export default Logo;
