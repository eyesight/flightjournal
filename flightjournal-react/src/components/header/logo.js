import React, { Component } from 'react';
import {TimelineLite} from 'gsap';
import {weather} from '../../utils/_weatherData';
import {Link} from 'react-router-dom';
import * as routes from '../../constants/routes';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.tropfen1 = React.createRef();
        this.tropfen2 = React.createRef();
        this.tropfen3 = React.createRef();
        this.tropfen4 = React.createRef();
        this.regen = React.createRef();
        this.schrift = React.createRef();
        this.flug = React.createRef();
        this.ziit = React.createRef();
        this.sonne = React.createRef();
        this.wolke = React.createRef();
        this.sonneWolke = React.createRef();
        this.schnee = React.createRef();
        this.schnee1 = React.createRef();
        this.schnee2 = React.createRef();
        this.schnee3 = React.createRef();
        this.schnee4 = React.createRef();
        this.schnee5 = React.createRef();
        this.schnee6 = React.createRef();
        this.schnee7 = React.createRef();
        this.schnee8 = React.createRef();
        this.schnee9 = React.createRef();
        this.schnee10 = React.createRef();
        this.blitz1 = React.createRef();
        this.blitz2 = React.createRef();
        this.blitz3 = React.createRef();
        this.wokeBlitz = React.createRef();
        this.nebel1 = React.createRef();
        this.nebel2 = React.createRef();
        this.nebel3 = React.createRef();
        this.nebelWoke = React.createRef();
        this.sonneNebel = React.createRef();
        this.sonneNebel1 = React.createRef();
        this.sonneNebel2 = React.createRef();
        this.sonneNebel3 = React.createRef();

        this.mond = React.createRef();
        this.mondWolke = React.createRef();
    }

    componentWillAppear (callback) {
        const weatherData = weather();
        console.log(weatherData);
        //function to see if its day or night
        const isDay = (sunrise, sunset) =>{
            let sunriseTime = sunrise ? new Date(1000*sunrise).getHours() : 6; //When no time is given, take 9:00 am
            let sunsetTime = sunset ? new Date(1000*sunset).getHours() : 21; //When no time is given, take 6:00 pm;
            let time = new Date().getHours(); //actual Time
            let isItDaytime = (sunriseTime < time && sunsetTime > time ) ? true : false;
            return isItDaytime;
        }
        let isItDaytime = (weatherData) ? isDay(weatherData.sys.sunrise, weatherData.sys.sunset) : true;
        console.log('ist es Tag: '+ isItDaytime);

        this.tropfen = [this.tropfen1.current, this.tropfen2.current, this.tropfen3.current, this.tropfen4.current];

        const tl = new TimelineLite({paused:true});
        const tl2 = new TimelineLite({paused:true});

        //start-animation 
        tl.delay(1).play();
        tl.add('text');
        tl.fromTo(this.flug.current, 0.5, {x:19}, {x:0, onComplete: callback}, 'text')
          .fromTo(this.ziit.current, 0.5, {x:-19},{x:0, onComplete: callback}, 'text');

        //animtion the sun (when there is a cloud) as function
        const suncloud = (time) => {
            let sonnemond = isItDaytime ? this.sonneWolke.current : this.mondWolke.current;
            let y = isItDaytime ? '10px' : '7px';
            let x = isItDaytime ? '8px' : '5px';
            return new TimelineLite()
            .fromTo(sonnemond, 0.5, {opacity:0}, {opacity:1}, time)
            .fromTo(sonnemond, 0.3, 
            {x:'20px', 
                y:'30px',
                scaleY:0,
                scaleX:0,
                transformOrigin: '0 0'}, 
            {x: x,
                y: y,
                scaleY:1,
                scaleX:1,
                transformOrigin: '50% 50%',}, time);
            }
        
        //snowing as function
        const snowing = (xpos) => {
            let x = xpos + 'px';
            return new TimelineLite()
            .set(this.schnee.current, {x: x}, "-=0.5")
            .add('x1')
            .fromTo(this.schnee1.current, 0.5, {opacity:0, y:'-2px'}, {opacity:1, y:'2px'}, 'x1+=0.1')
            .to(this.schnee1.current, 0.1, {opacity:0}, 'x1+=0.8')
            .fromTo(this.schnee1.current, 0.3, {opacity:0, y:'-2px'}, {opacity:1, y:'0'}, 'x1+=1.2')

            .fromTo(this.schnee2.current, 0.5, {opacity:0, y:'-5px'}, {opacity:1, y:'0px'}, 'x1+=0.2')
            .to(this.schnee2.current, 0.1, {opacity:0}, 'x1+=0.7')
            .fromTo(this.schnee2.current, 0.3, {opacity:0, y:'-5px'}, {opacity:1, y:'0'}, 'x1+=0.8')

            .fromTo(this.schnee3.current, 0.8, {opacity:0, y:'-15px'}, {opacity:1, y:'0px'}, 'x1-=0.1')
            .to(this.schnee3.current, 0.1, {opacity:0}, 'x1+=0.8')
            .fromTo(this.schnee3.current, 0.7, {opacity:0, y:'-12px'}, {opacity:1, y:'0'}, 'x1+=1')

            .fromTo(this.schnee4.current, 0.8, {opacity:0, y:'-2px'}, {opacity:1, y:'2px'}, 'x1')
            .to(this.schnee4.current, 0.1, {opacity:0}, 'x1+=1.2')
            .fromTo(this.schnee4.current, 0.4, {opacity:0, y:'-2px'}, {opacity:1, y:'0'}, 'x1+=1.6') 

            .fromTo(this.schnee5.current, 0.8, {opacity:0, y:'-15px'}, {opacity:1, y:'0px'}, 'x1-=0.2')
            .to(this.schnee5.current, 0.1, {opacity:0}, 'x1+=0.7')
            .fromTo(this.schnee5.current, 0.7, {opacity:0, y:'-12px'}, {opacity:1, y:'0'}, 'x1+=1.3')

            .fromTo(this.schnee6.current, 0.5, {opacity:0, y:'-3px'}, {opacity:1, y:'8px'}, 'x1-=0.2')
            .to(this.schnee6.current, 0.1, {opacity:0}, 'x1+=0.3')
            .fromTo(this.schnee6.current, 0.3, {opacity:0, y:'-2px'}, {opacity:1, y:'0'}, 'x1+=0.9')

            .fromTo(this.schnee7.current, 0.5, {opacity:0, y:'-5px'}, {opacity:1, y:'0px'}, 'x1')
            .to(this.schnee7.current, 0.1, {opacity:0}, 'x1+=0.5')
            .fromTo(this.schnee7.current, 0.3, {opacity:0, y:'-5px'}, {opacity:1, y:'0'}, 'x1+=1.1') 

            .fromTo(this.schnee8.current, 0.8, {opacity:0, y:'-15px'}, {opacity:1, y:'0px'}, 'x1-=0.1')
            .to(this.schnee8.current, 0.1, {opacity:0}, 'x1+=0.8')
            .fromTo(this.schnee8.current, 0.7, {opacity:0, y:'-12px'}, {opacity:1, y:'0'}, 'x1+=1.2') 

            .fromTo(this.schnee9.current, 0.5, {opacity:0, y:'-4px'}, {opacity:1, y:'3px'}, 'x1')
            .to(this.schnee9.current, 0.1, {opacity:0}, 'x1+=0.5')
            .fromTo(this.schnee9.current, 0.1, {opacity:0, y:'-2px'}, {opacity:1, y:'0'}, 'x1+=0.6')

            .fromTo(this.schnee10.current, 0.9, {opacity:0, y:'-3px'}, {opacity:1, y:'0px'}, 'x1+=0.3')
            .to(this.schnee10.current, 0.1, {opacity:0}, 'x1+=1.2')
            .fromTo(this.schnee10.current, 0.3, {opacity:0, y:'-5px'}, {opacity:1, y:'0'}, 'x1+=1.3');
        }

        //function lightnings
        const lightnings = () => {
            return new TimelineLite()
            .fromTo(this.blitz2.current, 0.1, {opacity: 0}, {opacity: 1})
            .fromTo(this.blitz3.current, 0.1, {opacity: 0}, {opacity: 1})
            .to([this.wolke.current, this.blitz2.current, this.blitz3.current],0.1, {opacity: 0})
            .to([this.blitz1.current, this.wokeBlitz.current], 0.2, {opacity: 1})
            .to([this.blitz1.current,],0.1, {opacity: 0})
            .to([this.blitz1.current, this.blitz2.current, this.blitz3.current], 0.2, {opacity: 1})
            .to([this.blitz1.current, this.blitz2.current, this.blitz3.current], 0.2, {opacity: 0})
            .to([this.wokeBlitz.current], 0.1, {opacity: 0})
            .to([this.blitz1.current, this.wokeBlitz.current], 0.2, {opacity: 1})
            .to([this.wokeBlitz.current], 0.1, {opacity: 1})
            .to([this.blitz2.current], 0.1, {opacity: 1})
            .to([this.blitz3.current], 0.1, {opacity: 1})
        }   

        //fucntion fog
        const fog = () => {
            return new TimelineLite()
            .to(this.nebelWoke.current, 0.5, {y:'5px'})
            .fromTo(this.nebel1.current, 0.5, {opacity:0, x: '0px'}, {opacity:1, x:'-2px'}, '-=0.5')
            .to(this.nebel1.current, 0.5, {x:'2px'})
            .to(this.nebel1.current, 0.5, {x:'0px'})
            .fromTo(this.nebel2.current, 0.5, {opacity:0}, {opacity:1}, '-=1')
            .to(this.nebel2.current, 0.5, {x:'2px'}, '-=0.5')
            .to(this.nebel2.current, 0.5, {x:'0px'})
            .fromTo(this.nebel3.current, 0.9, {opacity:0}, {opacity:1}, '-=1')
            .to(this.nebel3.current, 0.5, {x:'2px'}, '-=0.1')
            .to(this.nebel3.current, 0.5, {x:'0px'})
        }

        //animtion the sun (when there is fog) as function
        const sunfog = () => {
            return new TimelineLite()
            .fromTo(this.sonneNebel.current, 1, {opacity:0, y:'200px'}, {opacity:1, y:'-1px'})
            .fromTo(this.sonneNebel1.current, 0.5, {opacity:0, x: '0px'}, {opacity:1, x:'-2px'}, '-=0.2')
            .to(this.sonneNebel1.current, 0.5, {x:'2px'})
            .to(this.sonneNebel1.current, 0.5, {x:'0px'})
            .fromTo(this.sonneNebel2.current, 0.5, {opacity:0}, {opacity:1}, '-=1')
            .to(this.sonneNebel2.current, 0.5, {x:'2px'}, '-=0.5')
            .to(this.sonneNebel2.current, 0.5, {x:'0px'})
            .fromTo(this.sonneNebel3.current, 0.9, {opacity:0}, {opacity:1}, '-=1')
            .to(this.sonneNebel3.current, 0.5, {x:'2px'}, '-=0.1')
            .to(this.sonneNebel3.current, 0.5, {x:'0px'})
            }

        //animations for timeline
        //animation sun 
        const sun = () => {
            let sonnemond = isItDaytime ? this.sonne.current : this.mond.current;
            
            return new TimelineLite()
            .fromTo(sonnemond, 1, {opacity:0, y:'200px'}, {opacity:1, y:'0px'});
        }

        //animation for rain
        const rain = () => {
            let r = new TimelineLite();
            r.add(cloud(14));
            r.fromTo(this.regen.current, 1, {opacity:0, y:'50px', x:'0px'}, {opacity:1, y:'0px'})
            .staggerFrom(this.tropfen, 0.2, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15)
            .staggerTo(this.tropfen, 0.1, {opacity: 0}, -0.15)
            .staggerTo(this.tropfen, 0.2, {opacity: 1}, -0.15);
            return r;
        }

        //animtion cloud as function 14 if only cloud
        const cloud = (xval, cloud = this.wolke.current) => {
            return new TimelineLite()
            .fromTo(cloud, 0.5,
                {x: xval+'px',
                    y:'50px',
                    scaleY:0,
                    scaleX:0,
                    transformOrigin: '0 0',
                    opacity: 0},
                {y:'8px',
                    scaleY:1,
                    scaleX:1,
                    transformOrigin: '50% 50%',
                    opacity: 1});
        }
            
        let ycloud = isItDaytime ? 17 : 16; //variable to set y-data for animation sun with cloud or moon with cloud
        switch(weatherData.weather[0].id){
           case 200:
           case 201:
           case 202:
           case 210:
           case 211:
           case 212:
           case 221:
           case 230:
           case 231:
           case 232:
                //animation thunder
                tl2.add(cloud(14), 0)
                tl2.add(lightnings());
                tl2.delay(1).play();
                break
           case 801:
                //animation Sun/moon with cloud
                tl2.add('sonnewolke');
                tl2.add(cloud(ycloud), 'sonnewolke');
                tl2.add(suncloud('sonnewolke+=0.3'));
                tl2.delay(1).play();
                break;
           case 800:
                //animation Sun/moon
                tl2.add(sun());
                tl2.delay(1).play();
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
                //animation rain
                tl2.add(rain());
                tl2.delay(1).play();
                break;
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
                //animation snow
                tl2.add(cloud(14), 0);
                tl2.add(snowing(0));
                tl2.delay(1).play();
                break;
            case 701:
                 //animation Sun with fog
                tl2.add(sunfog());
                tl2.delay(1).play();
                break
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
                //animation fog
                tl2.add(cloud(14, this.nebelWoke.current), 0);
                tl2.add(fog());
                tl2.delay(1).play();
                break
            case 802:
            case 803:
            case 804: 
                //animation cloudy
                tl2.add(cloud(14));
                tl2.delay(1).play();
                break;
            default:
                //animation Sun with clouds and snow
                tl2.add('sonnewolkeschnee');
                tl2.add(cloud(ycloud), 'sonnewolkeschnee');
                tl2.add(suncloud('sonnewolkeschnee+=0.3'));
                tl2.add(snowing(3));
                tl2.delay(1).play();
                break;
        }
    } 

    render() {
        return (
            <div className="header__logo">
                <div className="header__logo-wrapper">
                    <Link className="header__anchor" to={routes.LANDING}>
                    <svg viewBox="0 -10 130.5 55.17" preserveAspectRatio="xMidYMin slice" width="100%">
                        <g ref={this.mondWolke} className="mondWolke">
                            <path className="st4" d="M67.5,8.8c-0.4-3.7-3.4-6.4-7.1-6.4H60C61.1,5,60,8,57.4,9.1c-1.3,0.6-2.8,0.6-4.2,0v0.4c0,3.3,2.2,6.2,5.4,7"/>
                        </g>
                        <g ref={this.sonneWolke} className="sonneWolkeSchnee">
                            <path className="st2" d="M67.5,9.7c-1-2.1-3.1-3.6-5.6-3.6c-3.4,0-6.2,2.8-6.2,6.2c0,2.5,1.5,4.6,3.6,5.6"/>
                            <line className="st2" x1="61.8" y1="3.1" x2="61.8" y2="0.5"/>
                            <line className="st2" x1="55.4" y1="18.7" x2="53.5" y2="20.5"/>
                            <line className="st2" x1="68.3" y1="5.8" x2="70.1" y2="4"/>
                            <line className="st2" x1="52.8" y1="12.2" x2="50.1" y2="12.2"/>
                            <line className="st2" x1="55.4" y1="5.8" x2="53.5" y2="4"/>
                        </g>
                        <g ref={this.sonneNebel} className="sonneNebel">
                            <path className="st4" d="M60.3,22.2c-2.2-4.5-0.4-9.8,4.1-12s9.8-0.4,12,4.1c1.2,2.5,1.2,5.4,0,7.9"/>
                        </g> 
                        <g ref={this.sonneNebel1} className="sonneNebel1">
                            <line className="st4" x1="56.3" y1="22.2" x2="80.3" y2="22.2"/>
                        </g>
                        <g ref={this.sonneNebel2} className="sonneNebel2">
                            <line className="st4" x1="53.3" y1="26.2" x2="83.3" y2="26.2"/>
                        </g>
                        <g ref={this.sonneNebel3} className="sonneNebel3">
                            <line className="st4" x1="61.3" y1="30.2" x2="76.3" y2="30.2"/>
                        </g>
                        <g ref={this.sonne} className="sonne"> 
                            <g> 
                                <circle className="st2" cx="68.6" cy="18.5" r="9"/> 
                                <line className="st2" x1="68.5" y1="5.3" x2="68.5" y2="1.5"/>
                                <line className="st2" x1="68.5" y1="31.8" x2="68.5" y2="35.6"/>
                                <line className="st2" x1="59.2" y1="27.9" x2="56.5" y2="30.6"/>
                                <line className="st2" x1="78" y1="9.1" x2="80.6" y2="6.5"/>
                                <line className="st2" x1="85.6" y1="18.5" x2="81.9" y2="18.5"/>
                                <line className="st2" x1="55.4" y1="18.5" x2="51.5" y2="18.5"/>
                                <line className="st2" x1="80.6" y1="30.6" x2="78" y2="27.9"/>
                                <line className="st2" x1="56.5" y1="6.5" x2="59.2" y2="9.2"/>
                            </g>
                        </g>
                        <g ref={this.schnee} className="schnee">
                            <g ref={this.schnee1} className="schnee1">
                                <circle className="st3" cx="59.1" cy="28.2" r="0.6"/>
                            </g>
                            <g ref={this.schnee2} className="schnee2">
                                <circle className="st3" cx="56.6" cy="33.2" r="0.6"/>
                            </g>
                            <g ref={this.schnee3} className="schnee3">
                                <circle className="st3" cx="59.1" cy="38.8" r="0.6"/>
                            </g>
                            <g ref={this.schnee4} className="schnee4">
                                <circle className="st3" cx="64.1" cy="31.3" r="0.6"/>
                            </g>
                            <g ref={this.schnee5} className="schnee5">
                                <circle className="st3" cx="65.4" cy="36.3" r="0.6"/>
                            </g>
                            <g ref={this.schnee6} className="schnee6">
                                <circle className="st3" cx="71.6" cy="28.2" r="0.6"/>
                            </g>
                            <g ref={this.schnee7} className="schnee7">
                                <circle className="st3" cx="70.3" cy="33.8" r="0.6"/>
                            </g>
                            <g ref={this.schnee8} className="schnee8">
                                <circle className="st3" cx="71.6" cy="38.8" r="0.6"/>
                            </g>
                            <g ref={this.schnee9} className="schnee9">
                                <circle className="st3" cx="77.8" cy="30.1" r="0.6"/>
                            </g>
                            <g ref={this.schnee10} className="schnee10">
                                <circle className="st3" cx="76.6" cy="36.3" r="0.6"/>
                            </g>
                        </g>
                        <g ref={this.wolke} className="wolke">
                            <path className="st4" d="M76.7,12.2c-0.1,0-0.2,0-0.2,0c-1.8-4.1-6.6-5.9-10.7-4.1c-2.5,1.1-4.3,3.5-4.7,6.2c-2.8-0.8-5.7,0.7-6.5,3.5
                                c-0.8,2.8,0.7,5.7,3.5,6.5c0.5,0.2,1,0.2,1.5,0.2h17.2c3.4,0,6.2-2.8,6.2-6.2S80.1,12.2,76.7,12.2L76.7,12.2z"/>
                        </g>
                        <g ref={this.wokeBlitz} className="wokeBlitz">
                            <path className="st4" d="M73.3,24.5h3.3c3.4,0,6.2-2.8,6.2-6.2S80.1,12,76.7,12h-0.2C74.6,7.9,69.8,6.1,65.7,8
                                c-2.5,1.1-4.3,3.5-4.7,6.2c-2.8-0.8-5.7,0.9-6.5,3.7s0.9,5.7,3.7,6.5c0.4,0.1,0.8,0.2,1.3,0.2h4.3"/>
                        </g>
                        <g ref={this.blitz1} className="blitz1">
                            <polyline className="st0" points="70.4,22.3 65.7,28.3 69.5,28.3 64.9,34 	"/>
                        </g>
                        <g ref={this.blitz2} className="blitz2">
                            <polyline className="st0" points="59.6,27.3 57.3,30.2 60.2,30.2 57.9,33.1 	"/>
                        </g>
                        <g ref={this.blitz3} className="blitz3">
                            <polyline className="st0" points="75.6,27.3 73.3,30.2 76.2,30.2 73.9,33.1 	"/>
                        </g>
                        <g ref={this.nebelWoke} className="nebelWolke">
                            <path className="st4" d="M82.9,18.3c0-3.4-2.8-6.2-6.2-6.2h-0.2C74.6,8,69.8,6.1,65.7,8c-2.5,1.1-4.3,3.5-4.7,6.2
                                c-2.8-0.9-5.7,0.7-6.6,3.5c-0.1,0.4-0.2,0.7-0.2,1.1"/>
                        </g>
                        <g ref={this.nebel1} className="nebel1">
                            <line className="st4" x1="54.2" y1="21.6" x2="82.9" y2="21.6"/>
                        </g>
                        <g ref={this.nebel2} className="nebel2">
                            <line className="st4" x1="57.1" y1="25.4" x2="81" y2="25.4"/>
                        </g>
                        <g ref={this.nebel3} className="nebel3">
                            <line className="st4" x1="59" y1="29.3" x2="66.7" y2="29.3"/>
                            <line className="st4" x1="70.5" y1="29.3" x2="80" y2="29.3"/>
                        </g>
                        <g ref={this.regen} className="regen">
                            <g ref={this.tropfen1} className="tropfen1">
                                <line className="st4" x1="59" y1="28.2" x2="56" y2="32.1"/>
                            </g>
                            <g ref={this.tropfen2} className="tropfen2">
                                <line className="st4" x1="64.7" y1="28.2" x2="58.6" y2="35.9"/>
                            </g>
                            <g ref={this.tropfen3} className="tropfen3">
                                <line className="st4" x1="70.5" y1="28.2" x2="67.4" y2="32.1"/>
                            </g>
                            <g ref={this.tropfen4} className="tropfen4">
                                <line className="st4" x1="76.2" y1="28.2" x2="70.1" y2="35.9"/>
                            </g>
                        </g>
                        <g ref={this.mond} className="mond">
                            <path className="st4" d="M69.5,9.5c2,3.7,0.6,8.2-3.1,10.2c-1.1,0.6-2.3,0.9-3.5,0.9c-1.1,0-2.2-0.2-3.2-0.7c0.8,4.9,5.4,8.3,10.3,7.5
                                c4.9-0.8,8.3-5.4,7.5-10.3C76.9,13,73.6,9.9,69.5,9.5z"/>
                        </g>
                        <g ref={this.schrift} className="schrift">
                            <g ref={this.flug} className="flug">
                                <path d="M0,23.3v-8.5h5.2v1.1h-4v2.7h3.6v1.1H1.2v3.6H0z"/>
                                <path d="M12.4,23.3v-8.5h1.2v7.4h4v1.1H12.4z"/>
                                <path d="M23.9,20.4v-5.6h1.2v5.6c0,1.3,0.7,2,1.9,2c1.2,0,1.9-0.7,1.9-2v-5.6h1.2v5.6c0,2-1.3,3.1-3.1,3.1
                                    C25.3,23.5,23.9,22.4,23.9,20.4z"/>
                                <path d="M44.3,23.3l-0.1-1.2c-0.4,0.7-1.3,1.4-2.7,1.4c-2.1,0-4.1-1.6-4.1-4.4s2.1-4.4,4.2-4.4c1.8,0,3.3,1,3.8,2.6l-1.1,0.5
                                    c-0.4-1.2-1.4-1.9-2.7-1.9c-1.5,0-3,1.1-3,3.3c0,2.3,1.4,3.4,3,3.4c1.9,0,2.6-1.3,2.6-2.2h-3v-1.1h4.1v4.2H44.3z"/>
                            </g>
                            <g ref={this.ziit} className="ziit">
                                <path d="M90.4,23.3v-1.2l5.1-6.2h-5v-1.1h6.4V16l-5.1,6.3h5.2v1.1H90.4z"/>
                                <path d="M104.8,23.3v-8.5h1.2v8.5H104.8z"/>
                                <path d="M114.8,23.3v-8.5h1.2v8.5H114.8z"/>
                                <path d="M127.1,15.9v7.4H126v-7.4h-2.8v-1.1h6.9v1.1H127.1z"/>
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
