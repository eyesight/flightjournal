import React, { Component } from 'react';
import {TimelineLite} from 'gsap';
import {weather} from '../../utils/_weatherData';
import {Link} from 'react-router-dom';
import * as routes from '../../constants/routes';

class Logo extends Component {
    constructor(props) {
        super(props);
        /* this.tropfen1 = React.createRef();
        this.tropfen2 = React.createRef();
        this.tropfen3 = React.createRef();
        this.tropfen4 = React.createRef();
        this.regen = React.createRef(); */
        this.schrift = React.createRef();
        this.flug = React.createRef();
        this.ziit = React.createRef();
        /* this.wolkeR = React.createRef();
        this.wolkeL = React.createRef();
        this.sonne = React.createRef();
 */
    }

    componentWillAppear (callback) {
        const weatherData = weather();
        const weatherData = 1;
        //this.wolken = [this.wolkeR.current, this.wolkeL.current];
        //this.tropfen = [this.tropfen1.current, this.tropfen2.current, this.tropfen3.current, this.tropfen4.current];
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


        /* //animation for rain mobile
        tlr.fromTo(this.regen.current, 1, {opacity:0, y:'50px', x:'2px'}, {opacity:1, y:'20px'})
            .staggerFrom(this.tropfen, 0.2, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15);
 */
        /* //animation sun mobile
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
        //switch for the weather-id */
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
                /* fsun.time(0).pause();
                frain.time(0).pause();
                fcloud.time(0).pause();
                fscloud.delay(1).play(); */
                tl.delay(1).play();
        }
    }

    render() {
        return (
            <div className="header__logo">
                <div className="header__logo-wrapper">
                    <Link className="header__anchor" to={routes.LANDING}>
                        <svg viewBox="0 10 125.5 53.17" preserveAspectRatio="xMidYMin slice" width="100%">
                        <g className="mondWolke">
                            <path class="st0" d="M67.5,8.8c-0.4-3.7-3.4-6.4-7.1-6.4H60C61.1,5,60,8,57.4,9.1c-1.3,0.6-2.8,0.6-4.2,0v0.4c0,3.3,2.2,6.2,5.4,7"
                                />
                        </g>
                        <g className="sonneWolkeSchnee">
                            <path class="st1" d="M67.5,9.7c-1-2.1-3.1-3.6-5.6-3.6c-3.4,0-6.2,2.8-6.2,6.2c0,2.5,1.5,4.6,3.6,5.6"/>
                            <line class="st2" x1="61.8" y1="3.1" x2="61.8" y2="0.5"/>
                            <line class="st2" x1="55.4" y1="18.7" x2="53.5" y2="20.5"/>
                            <line class="st2" x1="68.3" y1="5.8" x2="70.1" y2="4"/>
                            <line class="st2" x1="52.8" y1="12.2" x2="50.1" y2="12.2"/>
                            <line class="st2" x1="55.4" y1="5.8" x2="53.5" y2="4"/>
                        </g>
                        <g className="sonneNebel">
                            <path class="st0" d="M60.3,22.2c-2.2-4.5-0.4-9.8,4.1-12s9.8-0.4,12,4.1c1.2,2.5,1.2,5.4,0,7.9"/>
                        </g>
                        <g className="sonneNebel1">
                            <line class="st0" x1="56.3" y1="22.2" x2="80.3" y2="22.2"/>
                        </g>
                        <g className="sonneNebel2">
                            <line class="st0" x1="53.3" y1="26.2" x2="83.3" y2="26.2"/>
                        </g>
                        <g className="sonneNebel3">
                            <line class="st0" x1="61.3" y1="30.2" x2="76.3" y2="30.2"/>
                        </g>
                        <g className="Sonne">
                            <g>
                                <g>
                                    <circle class="st0" cx="68.6" cy="18.5" r="9"/>
                                </g>
                                <g>
                                    <line class="st2" x1="68.5" y1="5.3" x2="68.5" y2="1.5"/>
                                    <line class="st2" x1="68.5" y1="31.8" x2="68.5" y2="35.6"/>
                                </g>
                                <g>
                                    <line class="st2" x1="59.2" y1="27.9" x2="56.5" y2="30.6"/>
                                    <line class="st2" x1="78" y1="9.1" x2="80.6" y2="6.5"/>
                                </g>
                                <g>
                                    <line class="st2" x1="85.6" y1="18.5" x2="81.9" y2="18.5"/>
                                    <line class="st2" x1="55.4" y1="18.5" x2="51.5" y2="18.5"/>
                                </g>
                                <g>
                                    <line class="st2" x1="80.6" y1="30.6" x2="78" y2="27.9"/>
                                    <line class="st2" x1="56.5" y1="6.5" x2="59.2" y2="9.2"/>
                                </g>
                            </g>
                        </g>
                        <g className="schnee1">
                            <circle class="st3" cx="59.1" cy="28.2" r="0.6"/>
                        </g>
                        <g className="schnee2">
                            <circle class="st3" cx="56.6" cy="33.2" r="0.6"/>
                        </g>
                        <g className="schnee3">
                            <circle class="st3" cx="59.1" cy="38.8" r="0.6"/>
                        </g>
                        <g className="schnee4">
                            <circle class="st3" cx="64.1" cy="31.3" r="0.6"/>
                        </g>
                        <g className="schnee5">
                            <circle class="st3" cx="65.4" cy="36.3" r="0.6"/>
                        </g>
                        <g className="schnee6">
                            <circle class="st3" cx="71.6" cy="28.2" r="0.6"/>
                        </g>
                        <g className="schnee7">
                            <circle class="st3" cx="70.3" cy="33.8" r="0.6"/>
                        </g>
                        <g className="schnee8">
                            <circle class="st3" cx="71.6" cy="38.8" r="0.6"/>
                        </g>
                        <g className="schnee9">
                            <circle class="st3" cx="77.8" cy="30.1" r="0.6"/>
                        </g>
                        <g className="schnee10">
                            <circle class="st3" cx="76.6" cy="36.3" r="0.6"/>
                        </g>
                        <g className="wolke">
                            <g>
                                <path class="st4" d="M76.7,12.2c-0.1,0-0.2,0-0.2,0c-1.8-4.1-6.6-5.9-10.7-4.1c-2.5,1.1-4.3,3.5-4.7,6.2c-2.8-0.8-5.7,0.7-6.5,3.5
                                    c-0.8,2.8,0.7,5.7,3.5,6.5c0.5,0.2,1,0.2,1.5,0.2h17.2c3.4,0,6.2-2.8,6.2-6.2S80.1,12.2,76.7,12.2L76.7,12.2z"/>
                            </g>
                        </g>
                        <g className="blitzLeer">
                            <path class="st5" d="M73.3,25.1c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h0.3v-0.6H63.5v0.6h0.3c0.3,0,0.5,0.2,0.5,0.5
                                s-0.2,0.5-0.5,0.5h-0.3v0.7h10.2v-0.7H73.3z"/>
                        </g>
                        <g className="blitz1">
                            <polyline class="st0" points="70.4,22.3 65.7,28.3 69.5,28.3 64.9,34 	"/>
                        </g>
                        <g className="blitz2">
                            <polyline class="st0" points="59.6,27.3 57.3,30.2 60.2,30.2 57.9,33.1 	"/>
                        </g>
                        <g className="blitz3">
                            <polyline class="st0" points="75.6,27.3 73.3,30.2 76.2,30.2 73.9,33.1 	"/>
                        </g>
                        <g className="nebel">
                            <g>
                                <path class="st0" d="M82.9,18.3c0-3.4-2.8-6.2-6.2-6.2h-0.2C74.6,8,69.8,6.1,65.7,8c-2.5,1.1-4.3,3.5-4.7,6.2
                                    c-2.8-0.9-5.7,0.7-6.6,3.5c-0.1,0.4-0.2,0.7-0.2,1.1"/>
                                <path class="st0" d="M54.2,21.6h28.7 M57.1,25.4H81 M59,29.3h7.7 M70.5,29.3H80"/>
                            </g>
                        </g>
                        <g className="nebelWolke">
                            <path class="st0" d="M82.9,18.3c0-3.4-2.8-6.2-6.2-6.2h-0.2C74.6,8,69.8,6.1,65.7,8c-2.5,1.1-4.3,3.5-4.7,6.2
                                c-2.8-0.9-5.7,0.7-6.6,3.5c-0.1,0.4-0.2,0.7-0.2,1.1"/>
                        </g>
                        <g className="nebel1">
                            <line class="st0" x1="54.2" y1="21.6" x2="82.9" y2="21.6"/>
                        </g>
                        <g className="nebel2">
                            <line class="st0" x1="57.1" y1="25.4" x2="81" y2="25.4"/>
                        </g>
                        <g className="nebel3">
                            <line class="st0" x1="59" y1="29.3" x2="66.7" y2="29.3"/>
                            <line class="st0" x1="70.5" y1="29.3" x2="80" y2="29.3"/>
                        </g>
                        <g className="tropfen1">
                            <line class="st4" x1="59" y1="28.2" x2="56" y2="32.1"/>
                        </g>
                        <g className="tropfen2">
                            <line class="st4" x1="64.7" y1="28.2" x2="58.6" y2="35.9"/>
                        </g>
                        <g className="tropfen3">
                            <line class="st4" x1="70.5" y1="28.2" x2="67.4" y2="32.1"/>
                        </g>
                        <g className="tropfen4">
                            <line class="st4" x1="76.2" y1="28.2" x2="70.1" y2="35.9"/>
                        </g>
                        <g className="mond">
                            <path class="st4" d="M69.5,9.5c2,3.7,0.6,8.2-3.1,10.2c-1.1,0.6-2.3,0.9-3.5,0.9c-1.1,0-2.2-0.2-3.2-0.7c0.8,4.9,5.4,8.3,10.3,7.5
                                c4.9-0.8,8.3-5.4,7.5-10.3C76.9,13,73.6,9.9,69.5,9.5z"/>
                        </g>
                        <g ref={this.schrift} className="schrift">
                            <g ref={this.flug} className="flug">
                                <g>
                                    <path d="M6.7,23.3v-8.5h5.2v1.1h-4v2.7h3.6v1.1H7.9v3.6H6.7z"/>
                                    <path d="M19.1,23.3v-8.5h1.2v7.4h4v1.1H19.1z"/>
                                    <path d="M30.6,20.4v-5.6h1.2v5.6c0,1.3,0.7,2,1.9,2c1.2,0,1.9-0.7,1.9-2v-5.6h1.2v5.6c0,2-1.3,3.1-3.1,3.1
                                        C32,23.5,30.6,22.4,30.6,20.4z"/>
                                    <path d="M51,23.3l-0.1-1.2c-0.4,0.7-1.3,1.4-2.7,1.4c-2.1,0-4.1-1.6-4.1-4.4s2.1-4.4,4.2-4.4c1.8,0,3.3,1,3.8,2.6l-1.1,0.5
                                        c-0.4-1.2-1.4-1.9-2.7-1.9c-1.5,0-3,1.1-3,3.3c0,2.3,1.4,3.4,3,3.4c1.9,0,2.6-1.3,2.6-2.2h-3v-1.1h4.1v4.2H51z"/>
                                </g>
                            </g>
                            <g ref={this.ziit} className="ziit">
                                <g>
                                    <path d="M85.4,23.3v-1.2l5.1-6.2h-5v-1.1h6.4V16l-5.1,6.3h5.2v1.1H85.4z"/>
                                    <path d="M99.8,23.3v-8.5h1.2v8.5H99.8z"/>
                                    <path d="M109.8,23.3v-8.5h1.2v8.5H109.8z"/>
                                    <path d="M122.1,15.9v7.4H121v-7.4h-2.8v-1.1h6.9v1.1H122.1z"/>
                                </g>
                            </g>
                        </g>
                        </svg>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Logo;
