import React, { Component } from 'react';

class StartingPlaces extends Component {
    constructor(props) {
        super(props);
        this.lazyloading = this.lazyloading.bind(this);
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
    componentDidMount() {
        window.addEventListener('scroll', this.lazyloading);
    }
    componentWillUnmount(){
        window.addEventListener('scroll', this.lazyloading);
    }

    render() {
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
                    <div className="image-box__item">
                        <div className="image-box__text">
                            <a href="index.html" className="image-box__link anchor">
                                Uetliberg, 800 m
                            </a>
                            <p className="image-box__txt">Nordost, Ost</p>

                        </div>
                        <a href="index.html">
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src="./assets/img/default.jpg"
                                     data-src="./assets/img/startplaetze/default.jpg" alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            <a href="index.html"><i className="fas fa-map-marker-alt"></i></a><a href="index.html"><i className="fas fa-video"></i></a>
                        </div>
                    </div>
                    <div className="image-box__item">
                        <div className="image-box__text">
                            <a href="index.html" className="image-box__link anchor">
                                Weissenstein, 1200 m

                            </a>
                            <p className="image-box__txt">Nordost, Ost</p>

                        </div>
                        <a href="index.html">
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src="./assets/img/default.jpg"
                                     data-src="./assets/img/startplaetze/default.jpg" alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            <a href="index.html"><i className="fas fa-map-marker-alt"></i></a><a href="index.html"><i className="fas fa-video"></i></a>
                        </div>
                    </div>
                    <div className="image-box__item">
                        <div className="image-box__text">
                            <a href="index.html" className="image-box__link anchor">
                                Uetliberg, 800 m
                            </a>
                            <p className="image-box__txt">Nordost, Ost</p>

                        </div>
                        <a href="index.html">
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src="./assets/img/default.jpg"
                                     data-src="./assets/img/startplaetze/default.jpg" alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            <a href="index.html"><i className="fas fa-map-marker-alt"></i></a><a href="index.html"><i className="fas fa-video"></i></a>
                        </div>
                    </div>
                    <div className="image-box__item">
                        <div className="image-box__text">
                            <a href="index.html" className="image-box__link anchor">
                                Uetliberg, 800 m
                            </a>
                            <p className="image-box__txt">Nordost, Ost</p>

                        </div>
                        <a href="index.html">
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src="./assets/img/default.jpg"
                                     data-src="./assets/img/startplaetze/default.jpg" alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            <a href="index.html"><i className="fas fa-map-marker-alt"></i></a><a href="index.html"><i className="fas fa-video"></i></a>
                        </div>
                    </div>
                    <div className="image-box__item">
                        <div className="image-box__text">
                            <a href="index.html" className="image-box__link anchor">
                                Uetliberg, 800 m
                            </a>
                            <p className="image-box__txt">Nordost, Ost</p>

                        </div>
                        <a href="index.html">
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src="./assets/img/default.jpg"
                                     data-src="./assets/img/startplaetze/default.jpg" alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            <a href="index.html"><i className="fas fa-map-marker-alt"></i></a><a href="index.html"><i className="fas fa-video"></i></a>
                        </div>
                    </div>
                    <div className="image-box__item">
                        <div className="image-box__text">
                            <a href="index.html" className="image-box__link anchor">
                                Uetliberg, 800 m
                            </a>
                            <p className="image-box__txt">Nordost, Ost</p>

                        </div>
                        <a href="index.html">
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src="./assets/img/default.jpg"
                                     data-src="./assets/img/startplaetze/default.jpg" alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            <a href="index.html"><i className="fas fa-map-marker-alt"></i></a><a href="index.html"><i className="fas fa-video"></i></a>
                        </div>
                    </div>
                    <div className="image-box__item">
                        <div className="image-box__text">
                            <a href="index.html" className="image-box__link anchor">
                                Uetliberg, 800 m
                            </a>
                            <p className="image-box__txt">Nordost, Ost</p>

                        </div>
                        <a href="index.html">
                            <div className="image-box__image-wrapper">
                                <img className="image-box__image" src="./assets/img/default.jpg"
                                     data-src="./assets/img/startplaetze/default.jpg" alt="Startplatz Uetliberg" />
                            </div>
                        </a>
                        <div className="image-box__icons">
                            <a href="index.html"><i className="fas fa-map-marker-alt"></i></a><a href="index.html"><i className="fas fa-video"></i></a>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default StartingPlaces;
