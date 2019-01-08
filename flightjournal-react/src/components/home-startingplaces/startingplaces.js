import React, { Component } from 'react';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getWinddirections } from '../../actions/WinddirectionActions';
import { getPilots } from '../../actions/PilotActions';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as routes from '../../constants/routes';
import  _ from 'lodash';

class StartingPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderlocationpin: false,
            urlImage: routes.LANDINGPAGESTARTPLACESIMAGES,
            urlImageDefault: routes.LANDINGPAGESTARTPLACESIMAGES + 'default.jpg',
            isUserAdmin: false
        }
        this.lazyloading = this.lazyloading.bind(this);
        this.renderStartplaces = this.renderStartplaces.bind(this);
        this.renderWebcams = this.renderWebcams.bind(this);
    }

    lazyloading() {
        const images = document.querySelectorAll('img[data-src]');
        if (images.length === 0) return;

        for (const image of images) {
            if (image.getBoundingClientRect().top <= window.innerHeight * 0.75 && image.getBoundingClientRect().top > 0) {
                image.setAttribute('src', image.getAttribute('data-src'));
                image.onload = function () {
                    image.removeAttribute('data-src');
                };
            }
        }
    }
    componentWillMount() {
        window.addEventListener('scroll', this.lazyloading);
        this.props.getStartplaces();
        this.props.getWinddirections();
        this.props.getPilots();
    }
    componentWillReceiveProps(nextProps) {
        //if current user hase the role "admin" set state to show the edit-button
        if(nextProps.currentPilot && nextProps.currentPilot.role === 'admin'){
            this.setState({
                isUserAdmin: true
            });
        }   
    }
    componentWillUnmount(){
        window.addEventListener('scroll', this.lazyloading);
    }

    renderWebcams(arr){
        if(arr){
            return arr.map((cam, index) =>{
                return (<a rel="noopener noreferrer" target="_blank" key={index} href={cam}>
                <svg version="1.1" className="svg-icon svg-icon--video" x="0px" y="0px" viewBox="0 0 46 25">
                    <path className="svg-icon__path" d="M46,1.6L30.7,9.4V0H0v25h30.7v-9.4L46,23.4V1.6z"/>
                </svg>
            </a>)
            });
        }
        return null;
    }

    renderStartplaces(startplaces, winddirection) {
        const places = Object.keys(startplaces).map(i => startplaces[i]);
        const wind = Object.keys(winddirection).map(i => winddirection[i]);
        return places.map((z, id)=>{
            if(z.startplaces){
                const sp = Object.keys(z.startplaces).map(i => z.startplaces[i]);
            return sp.map((x)=>{
                let windstring = '';
                let url = this.state.urlImage;
                let windarray = [];                
                    if(x.winddirectionsId){
                        wind.map((ww) =>{
                            let windofItem = Object.keys(x.winddirectionsId);
                            for(let index = 0; index < windofItem.length; index++){
                                if(ww.id === windofItem[index]){
                                    windarray.push(ww.name);
                                }
                            };    
                            return windstring = windarray.join(', ');
                        });
                    }
                    //get the imageurl: when no image-url is set, take default-image
                    url = (x.imagesUrl !== '') ? `${url}${x.imagesUrl}/0.jpg` : `${this.state.urlImageDefault}`;            
                return (
                    <div key={`${id}and${x.id}`} className="image-box__item">
                        <div className="image-box__text">
                            <a href={`${routes.STARTPLATZOHNEID}${z.id}`} className="image-box__link anchor">
                            {z.name}, {x.name}, {x.altitude}&nbsp;m
                            </a>
                            <p className="image-box__txt">{windstring}</p>

                        </div> 
                        <a href={`${routes.STARTPLATZOHNEID}${z.id}`}>
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src={this.state.urlImageDefault}
                                        data-src={url} alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            {z.locationpin ? <a className="image-box__icon"rel="noopener noreferrer" target="_blank" href={z.locationpin}>
                                <svg version="1.1" className="svg-icon svg-icon--pin" x="0px" y="0px" viewBox="0 0 25 35">
                                    <path className="svg-icon__path" d="M12.5,0C5.6,0,0,5.6,0,12.6C0,23.9,12.5,35,12.5,35S25,23.9,25,12.6C25,5.7,19.4,0,12.5,0z"/>
                                    <ellipse className="svg-icon__ellipse" cx="12.5" cy="12.5" rx="5.8" ry="5.8"/>
                                </svg>
                            </a> : null} 
                            {this.renderWebcams(z.webcams)}
                            {z.xc ? <a className="image-box__icon" rel="noopener noreferrer" target="_blank" href={z.xc}>
                                <svg version="1.1" className="svg-icon svg-icon--xc" x="0px" y="0px" viewBox="0 0 36 19">
                                    <path className="svg-icon__path" d="M17,0.3h-4.8L8.6,6.2L5,0.3H0.1L6,9.4l-5.9,9.1h4.8l3.6-5.9l3.6,5.9H17l-5.9-9.1L17,0.3z M27.1,19c5.7,0,8.1-3.9,8.7-6.4
                                        l-3.9-1.1c-0.4,1.3-1.6,3.4-4.8,3.4c-2.7,0-5.2-2-5.2-5.4c0-3.8,2.8-5.6,5.2-5.6c3.2,0,4.4,2.1,4.7,3.4l3.8-1.2
                                        C35,3.5,32.6,0,27.1,0c-5.1,0-9.4,3.9-9.4,9.5S21.9,19,27.1,19z"/>
                                </svg>
                            </a> : null} 
                            {this.state.isUserAdmin ? <Link className="image-box__icon image-box__icon--right" to={routes.STARTPLATZ_ERFASSEN + "/" + z.id +"--sp--"+ x.id}>
                                <svg version="1.1" className="svg-icon svg-icon--edit" x="0px" y="0px" viewBox="0 0 23.7 23.7">
                                    <path className="svg-icon__path" d="M20.5,6.3l2.4-2.4l-3.1-3.1l-2.4,2.4"/>
                                    <path className="svg-icon__path" d="M6.4,20.3l14.1-14l-3.1-3.1l-14.1,14l-2.5,5.5L6.4,20.3z M3.3,17.2l3.1,3.1"/>
                                </svg> 
                            </Link> : null}
                        </div>
                        
                    </div>
                );
            });
            }else{
                return null;
            }
        });
    }

    render() {
        const allstartplaces = this.props.startplaces;
        const allwind = this.props.winddirections;

        return (
            <section id="startplaetze" className="centered-layout">
                <div className="centered-layout__header">
                    <h2 className="title-h2">Startplätze.<span className="title--regular"> Wo solls hin?</span></h2>
                    <button className="button-without-border">Fluggebiete suchen 
                        <svg version="1.1" className="svg-icon svg-icon--zoom" x="0px" y="0px" viewBox="0 0 21 21">
                            <path className="svg-icon__path" d="M14.5,8.9c0,3.2-2.6,5.7-5.7,5.7c-3.2,0-5.7-2.6-5.7-5.7s2.6-5.7,5.7-5.7C11.9,3.2,14.5,5.7,14.5,8.9z M21,19.4
                                c0-0.4-0.2-0.9-0.5-1.2l-4.3-4.3c1-1.5,1.6-3.3,1.6-5c0-4.9-3.9-8.9-8.9-8.9S0,3.9,0,8.9s3.9,8.9,8.9,8.9c1.8,0,3.5-0.6,5-1.6
                                l4.3,4.3c0.3,0.3,0.7,0.5,1.2,0.5C20.2,21,21,20.3,21,19.4z"/>
                        </svg>
                    </button>
                </div>
                <div className="filter">
                    <div className="filter__list">
                        <button className="filter__list-item active">Nord</button>
                        <button className="filter__list-item active">Nordorst</button>
                        <button className="filter__list-item">Ost</button>
                        <button className="filter__list-item">Südost</button>
                        <button className="filter__list-item">Süd</button>
                        <button className="filter__list-item">Südwest</button>
                        <button className="filter__list-item">West</button>
                        <button className="filter__list-item">Nordwest</button>
                    </div>
                    <div className="filter__list-dropdown">
                        <div className="filter__dropdown-item">Starthöhe <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown">
                                <button className="filter__sub-dropdown-item">1000</button>
                                <button className="filter__sub-dropdown-item">1500</button>
                                <button className="filter__sub-dropdown-item">2000</button>
                            </div>
                        </div>
                        <div className="filter__dropdown-item">Region <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown">
                                <button className="filter__sub-dropdown-item">Engelberg</button>
                                <button className="filter__sub-dropdown-item">Berner Oberland</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-box vertical-divider">
                    {this.renderStartplaces(allstartplaces, allwind)}
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return { 
        startplaces: state.startplaces,
        winddirections: state.winddirections,
        activeUserID: state.user.email,
        pilots: state.pilots,
        currentPilot: _.find(state.pilots, { email: state.user.email })
    };
}

export default withRouter(connect(mapStateToProps, {getStartplaces, getWinddirections, getPilots}) (StartingPlaces));