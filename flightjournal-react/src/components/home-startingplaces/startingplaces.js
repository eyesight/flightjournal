import React, { Component } from 'react';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getRegions } from '../../actions/RegionsActions';
import { getStartareas } from '../../actions/StartareasActions';
import { getWinddirections } from '../../actions/WinddirectionActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class StartingPlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderlocationpin: false,
            urlImage: './assets/img/startplaetze/',
            urlImageDefault: './assets/img/startplaetze/default.jpg'
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
        this.props.getRegions();
        this.props.getStartareas();
        this.props.getWinddirections();
    }
    componentWillUnmount(){
        window.addEventListener('scroll', this.lazyloading);
    }

    renderWebcams(arr){
        if(arr){
            return arr.map((cam, index) =>{
                return (<a target="_blank" key={index} href={cam}>
                <svg version="1.1" className="svg-icon svg-icon--video" x="0px" y="0px" viewBox="0 0 46 25">
                    <path className="svg-icon__path" d="M46,1.6L30.7,9.4V0H0v25h30.7v-9.4L46,23.4V1.6z"/>
                </svg>
            </a>)
            });
        }
        return null;
    }

    renderStartplaces(startplaces, startareas, startregions, winddirection) {
        const places = Object.keys(startplaces).map(i => startplaces[i]);
        const areas = Object.keys(startareas).map(i => startareas[i]);
        const regions = Object.keys(startregions).map(i => startregions[i]);
        const wind = Object.keys(winddirection).map(i => winddirection[i]);
        return places.map((z, id)=>{
            let windstring = '';
            let placesname = '';
            let webcamarray = [];
            let url = this.state.urlImage;
            let xc = '';
            areas.map((x)=>{ 
                let windarray = [];                
                if(z.startareasId === x.id){
                    if(z.winddirectionsId){
                         wind.map((ww) =>{
                            for(let index = 0; index < z.winddirectionsId.length; index++){
                                if(ww.id === z.winddirectionsId[index]){
                                    windarray.push(ww.name);
                                }
                            };    
                            return windstring = windarray.join(', ');
                        });
                    }
                    placesname = x.name;
                    webcamarray = x.webcams;
                    xc = x.xc;
                    //get the imageurl: when no image-url is set, take default-image
                    url = (z.imagesUrl !== '') ? `${url}${z.imagesUrl}/0.jpg` : `${this.state.urlImageDefault}`;
                    return x;
                }
                return null;
            });
            return (
                <div key={id} className="image-box__item">
                    <div className="image-box__text">
                        <a href="index.html" className="image-box__link anchor">
                        {placesname}, {z.name}, {z.altitude}&nbsp;m
                        </a>
                        <p className="image-box__txt">{windstring}</p>

                    </div>
                    <a href="index.html">
                        <div className="image-box__image-wrapper">
                            <img className="image-box__image" src={this.state.urlImageDefault}
                                    data-src={url} alt="Startplatz Uetliberg" />
                        </div>
                    </a>
                    <div className="image-box__icons">
                        {z.locationpin ? <a target="_blank" href={z.locationpin}>
                            <svg version="1.1" className="svg-icon svg-icon--pin" x="0px" y="0px" viewBox="0 0 25 35">
                                <path className="svg-icon__path" d="M12.5,0C5.6,0,0,5.6,0,12.6C0,23.9,12.5,35,12.5,35S25,23.9,25,12.6C25,5.7,19.4,0,12.5,0z"/>
                                <ellipse className="svg-icon__ellipse" cx="12.5" cy="12.5" rx="5.8" ry="5.8"/>
                            </svg>
                        </a> : null} 
                        {this.renderWebcams(webcamarray)}
                        {xc ? <a target="_blank" href={xc}>
                            <svg version="1.1" className="svg-icon svg-icon--xc" x="0px" y="0px" viewBox="0 0 36 19">
                                <path className="svg-icon__path" d="M17,0.3h-4.8L8.6,6.2L5,0.3H0.1L6,9.4l-5.9,9.1h4.8l3.6-5.9l3.6,5.9H17l-5.9-9.1L17,0.3z M27.1,19c5.7,0,8.1-3.9,8.7-6.4
                                    l-3.9-1.1c-0.4,1.3-1.6,3.4-4.8,3.4c-2.7,0-5.2-2-5.2-5.4c0-3.8,2.8-5.6,5.2-5.6c3.2,0,4.4,2.1,4.7,3.4l3.8-1.2
                                    C35,3.5,32.6,0,27.1,0c-5.1,0-9.4,3.9-9.4,9.5S21.9,19,27.1,19z"/>
                            </svg>
                        </a> : null} 
                    </div>
                </div>
            );
        });

    }

    render() {
        const allstartplaces = this.props.startplaces;
        const allstartareas = this.props.startareas;
        const allregions = this.props.regions;
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
                    <ul className="filter__list">
                        <li><a className="filter__list-item active" href="index.html">Nord</a></li>
                        <li><a className="filter__list-item active" href="index.html">Nordorst</a></li>
                        <li><a className="filter__list-item" href="index.html">Ost</a></li>
                        <li><a className="filter__list-item" href="index.html">Südost</a></li>
                        <li><a className="filter__list-item" href="index.html">Süd</a></li>
                        <li><a className="filter__list-item" href="index.html">Südwest</a></li>
                        <li><a className="filter__list-item" href="index.html">West</a></li>
                        <li><a className="filter__list-item" href="index.html">Nordwest</a></li>
                    </ul>
                    <div className="filter__list-dropdown">
                        <button className="filter__dropdown-item">Starthöhe <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown">
                                <a className="filter__sub-dropdown-item">1000</a>
                                <a className="filter__sub-dropdown-item">1500</a>
                                <a className="filter__sub-dropdown-item">2000</a>
                            </div>
                        </button>
                        <button className="filter__dropdown-item">Region <i className="fas fa-angle-down"></i>
                            <div className="filter__sub-dropdown">
                                <a className="filter__sub-dropdown-item">Engelberg</a>
                                <a className="filter__sub-dropdown-item">Berner Oberland</a>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="image-box vertical-divider">
                    {this.renderStartplaces(allstartplaces, allstartareas, allregions, allwind)}
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return { 
        startplaces: state.startplaces,
        startareas: state.startareas,
        regions: state.regions,
        winddirections: state.winddirections,
        activeUserID: state.user.uid,
    };
}

export default withRouter(connect(mapStateToProps, {getStartplaces, getStartareas, getRegions, getWinddirections}) (StartingPlaces));