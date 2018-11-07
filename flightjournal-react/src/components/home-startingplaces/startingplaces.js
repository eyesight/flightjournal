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
                return (<a target="_blank" key={index} href={cam}><i className="fas fa-video"></i></a>)
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
                    //get the imageurl: when no image-url is set, take default-image
                    url = (z.imagesUrl !== '') ? `${url}${z.imagesUrl}/0.jpg` : `${this.state.urlImageDefault}`;
                    return x;
                }
                return null;
            });
            console.log(this.state.urlImageDefault);
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
                        {z.locationpin ? <a target="_blank" href={z.locationpin}><i className="fas fa-map-marker-alt"></i></a> : null} {this.renderWebcams(webcamarray)}
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
                    <button className="button-without-border">Fluggebiete suchen <i className="fas fa-search"></i></button>
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