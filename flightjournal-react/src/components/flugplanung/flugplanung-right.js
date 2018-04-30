import React, { Component } from 'react';

class FlugplanungRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonTxt:'+ mehr Links'
        };
        this.showMoreText = this.showMoreText.bind(this);
        this.slideshowInit = this.slideshowInit.bind(this);
        this.dotfunc = this.dotfunc.bind(this);
        this.prevNext = this.prevNext.bind(this);
    }

    //TODO: find a solution for the button-txt -> buttonTextshow
    showMoreText(numberOfLinks, buttonTextshow, buttonTexthide) {
        const linkboxes = document.querySelectorAll('.js-linkbox-content');

        for (let i = 0; i < linkboxes.length; i++) {
            let allLinks = linkboxes[i].querySelectorAll('.link-box__link');
            let linkBoxLinks = linkboxes[i].querySelector('.js-linkbox-links');
            let showMoreButton = linkboxes[i].querySelector('.js-show-more');

            if (allLinks.length <= numberOfLinks) {
                showMoreButton.classList.add('link-box__show-more--hide');
            } else {
                linkBoxLinks.classList.add('js-linkbox-content--hide');
                showMoreButton.classList.add('link-box__show-more--show');
            }

            showMoreButton.addEventListener('click', function (e) {
                e.preventDefault();
                let targetLinkbox = e.target.parentNode.querySelector('.js-linkbox-links');
                if (targetLinkbox.classList.contains('js-linkbox-content--hide')) {
                    targetLinkbox.classList.remove('js-linkbox-content--hide');
                    targetLinkbox.classList.add('js-linkbox-content--show');
                    this.setState({
                        buttonTxt: buttonTexthide
                    });
                } else {
                    targetLinkbox.classList.remove('js-linkbox-content--show');
                    targetLinkbox.classList.add('js-linkbox-content--hide');
                    this.setState({
                        buttonTxt: buttonTextshow
                    });
                }
            }.bind(this));
        }
    }

    slideshowInit() {
        let linkboxPrevTitle = document.querySelector('.link-box__prev-text');
        let linkboxNextTitle = document.querySelector('.link-box__next-text');
        // media query change
        if (matchMedia) {
            const mq2 = window.matchMedia("(max-width: 550px)");
            mq2.addListener(WidthChange2);
            WidthChange2(mq2);
        }

        // media query change
        function WidthChange2(mq2) {

            const parents = document.getElementsByClassName('js-linkbox-slideshow-container');

            for (let j = 0; j < parents.length; j++) {
                const slides = parents[j].getElementsByClassName("js-linkbox");
                const dots = parents[j].getElementsByClassName("js-dot");
                const linkboxTitle = parents[j].getElementsByClassName('title-h3');
                linkboxPrevTitle = document.getElementsByClassName('link-box__prev-text');
                linkboxNextTitle = document.getElementsByClassName('link-box__next-text');
                slides[0].classList.add('slide-active');

                setTimeout(function () {
                    slides[0].classList.add('slide-visible');
                }, 100);

                dots[0].classList.add('dot-active');
                let titleLength = linkboxTitle.length;

                //adding Text to prev- / next-button
                linkboxPrevTitle[j].innerHTML = linkboxTitle[titleLength - 1].innerHTML.match(/^\S+(?=\.)/gi)[0];
                linkboxNextTitle[j].innerHTML = linkboxTitle[1].innerHTML.match(/^\S+(?=\.)/gi)[0];
            }
        }
        this.dotfunc(linkboxPrevTitle, linkboxNextTitle);
        this.prevNext();
    }

    //TODO:  Line 99:  Don't make functions within a loop  no-loop-func
    dotfunc(linkboxPrevTitle, linkboxNextTitle){
        const dots = document.getElementsByClassName('js-dot'); //dots functionality

        for (let i = 0; i < dots.length; i++) {
            let index = 0;
            let indexPrev = index;
            let indexNex = index;

            dots[i].onclick = function () {

                const slides = this.parentNode.parentNode.getElementsByClassName("js-linkbox");
                const linkboxTitle = this.parentNode.parentNode.getElementsByClassName('title-h3');
                linkboxPrevTitle = this.parentNode.parentNode.getElementsByClassName('link-box__prev-text');
                linkboxNextTitle = this.parentNode.parentNode.getElementsByClassName('link-box__next-text');

                for (let j = 0; j < this.parentNode.children.length; j++) {
                    this.parentNode.children[j].classList.remove('dot-active');
                    slides[j].classList.remove('slide-active', 'slide-visible');
                    if (this.parentNode.children[j] === this) {
                        index = j;
                    }
                }
                this.classList.add('dot-active');
                slides[index].classList.add('slide-active');
                setTimeout(function () {
                    slides[index].classList.add('slide-visible');
                }, 100);

                if (index >= linkboxTitle.length - 1) {
                    indexPrev = index - 1;
                    indexNex = 0;
                } else if (index <= 0) {
                    indexPrev = linkboxTitle.length - 1;
                    indexNex = index + 1;
                } else {
                    indexPrev = index - 1;
                    indexNex = index + 1;
                }

                linkboxPrevTitle[0].innerHTML = linkboxTitle[indexPrev].innerHTML.match(/^\S+(?=\.)/gi)[0];
                linkboxNextTitle[0].innerHTML = linkboxTitle[indexNex].innerHTML.match(/^\S+(?=\.)/gi)[0];
            }
        }
    }

    //prev/next functionality
    prevNext(){
        const prev_next = document.querySelectorAll('.link-box__prev-next a');

        for (let ind = 0; ind < prev_next.length; ind++) {
            prev_next[ind].onclick = function () {
                let current = this.parentNode.parentNode;
                const slides = current.getElementsByClassName("js-linkbox");
                const dots = current.getElementsByClassName("js-dot");
                let curr_linkboxTitle = current.getElementsByClassName('title-h3');
                let curr_slide = current.getElementsByClassName('slide-active')[0];
                let curr_dot = current.getElementsByClassName('dot-active')[0];
                let curr_linkboxPrevTitle = this.parentNode.parentNode.getElementsByClassName('link-box__prev-text')[0];
                let curr_linkboxNextTitle = this.parentNode.parentNode.getElementsByClassName('link-box__next-text')[0];
                let curr_index = Number(curr_dot.getAttribute('data-dot') - 1);

                let index_prev = slides.length - 1;
                let index_next = curr_index + 1;

                curr_slide.classList.remove('slide-active', 'slide-visible');
                curr_dot.classList.remove('dot-active');

                if (this.classList.contains('js-next')) {
                    if (curr_index >= slides.length - 1) {
                        curr_index = 0;
                        index_prev = slides.length - 1;
                        index_next = curr_index + 1;
                    } else if (curr_index === 0) {
                        curr_index += 1;
                        index_next = curr_index + 1;
                        if (index_prev <= 0) {
                            index_prev = slides.length - 1;
                        } else {
                            index_prev = curr_index - 1;
                        }
                    } else {
                        curr_index += 1;
                        index_prev = curr_index - 1;
                        if (index_next >= slides.length - 1) {
                            index_next = 0;
                        } else {
                            index_next = curr_index + 1;
                        }
                    }

                    for(let slidei = 0; slidei<slides.length; slidei++){
                        if(slides[slidei].classList.contains('prev')){
                            slides[slidei].classList.remove('prev');
                        }
                    }


                    if (curr_slide.nextElementSibling.classList.contains('js-linkbox')) {
                        curr_slide.nextElementSibling.classList.add('slide-active');
                        setTimeout(function () {
                            curr_slide.nextElementSibling.classList.add('slide-visible');
                        }, 100);
                        curr_dot.nextElementSibling.classList.add('dot-active');
                    } else {
                        slides[0].classList.add('slide-active');
                        setTimeout(function () {
                            slides[0].classList.add('slide-visible');
                        }, 100);
                        dots[0].classList.add('dot-active');
                    }
                }

                if (this.classList.contains('js-prev')) {
                    if (curr_index <= 0) {
                        curr_index = slides.length - 1;
                        index_next = 0;
                        index_prev = curr_index - 1;
                    } else if (curr_index === slides.length - 1) {
                        curr_index = 0;
                        index_next = curr_index + 2;
                        index_prev = 0;
                    } else {
                        curr_index = curr_index - 1;
                        index_next = curr_index + 1;

                        if (index_prev >= slides.length - 1) {
                            index_prev = slides.length - 1;
                        } else {
                            index_prev = curr_index - 1;
                        }
                    }

                    for(let slidei = 0; slidei<slides.length; slidei++){
                        if(!slides[slidei].classList.contains('prev')){
                            slides[slidei].classList.add('prev');
                        }
                    }

                    if (curr_slide.previousElementSibling) {
                        curr_slide.previousElementSibling.classList.add('slide-active');
                        setTimeout(function () {
                            curr_slide.previousElementSibling.classList.add('slide-visible');
                        }, 100);
                        curr_dot.previousElementSibling.classList.add('dot-active');
                    } else {
                        slides[slides.length - 1].classList.add('slide-active');
                        setTimeout(function () {
                            slides[slides.length - 1].classList.add('slide-visible');
                        }, 100);
                        dots[slides.length - 1].classList.add('dot-active');
                    }

                }
                curr_linkboxPrevTitle.innerHTML = curr_linkboxTitle[index_prev].innerHTML.match(/^\S+(?=\.)/gi)[0];
                curr_linkboxNextTitle.innerHTML = curr_linkboxTitle[index_next].innerHTML.match(/^\S+(?=\.)/gi)[0];
            }
        }
    }


    componentDidMount() {
        this.showMoreText(5, '+ mehr Links', '- weniger Links');
        this.slideshowInit();
    }
    componentWillUnmount(){
        this.showMoreText(5, '+ mehr Links', '- weniger Links');
        this.slideshowInit();
    }

    render() {
        return (
        <div className="start__right">
            <div className="start__lead-wrapper">
                <h1 className="main-title">
                      <span className="main-title--bold">(R)auf und davon.<br />
                      </span>Mit dem Gleitschirm unterwegs.
                </h1>
            </div>
            <div className="start__twocolumn js-linkbox-slideshow-container">
                <div className="box link-box js-linkbox">
                    <div className="link-box__content js-linkbox-content">
                        <h3 className="title-h3">Wetter.<br /><span className="title--regular">Wie wirds?</span></h3>
                        <ul className="link-box__list js-linkbox-links">
                            <li>
                                <a href="http://www.meteoschweiz.admin.ch/home.html?tab=report" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Textprognose
                                </a>
                            </li>
                            <li>
                                <a href="http://www.meteoschweiz.admin.ch/home/wetter/prognosen/allgemeine-lage.html"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Frontenkarte
                                </a>
                            </li>
                            <li>
                                <a href="https://wetter.kk7.ch/" target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    kk7
                                </a>
                            </li>
                            <li>
                                <a href="http://www.meteocentrale.ch/de/wetter/wetterstationen.html" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Meteocentrale
                                </a>
                            </li>
                            <li>
                                <a href="https://www.burnair.ch/MeteoService/" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Burnair-Prognose
                                </a>
                            </li>
                            <li>
                                <a href="http://gleitschirmmeteo.ch/" target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Gleitschirmmeteo
                                </a>
                            </li>
                        </ul>
                        <a className="link-box__show-more js-show-more">
                            {this.state.buttonTxt}
                        </a>
                    </div>
                </div>
                <div className="box link-box js-linkbox">
                    <div className="link-box__content js-linkbox-content">
                        <h3 className="title title-h3">Wind.<br /><span className="title--regular"> Wo blästs?</span></h3>
                        <ul className="link-box__list js-linkbox-links">
                            <li>
                                <a href="http://www.meteocentrale.ch/de/wetter/foehn-und-bise/foehn.html" rel="noopener noreferrer"
                                   target="_blank" className="link-box__link anchor">
                                    Föhndiagramm
                                </a>
                            </li>
                            <li>
                                <a href="http://www.meteocentrale.ch/de/wetter/foehn-und-bise/bise.html"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Bisendiagramm
                                </a>
                            </li><li>
                            <a href="http://wetterstationen.meteomedia.ch/?map=Schweiz" target="_blank" rel="noopener noreferrer"
                               className="link-box__link anchor">
                                Meteocentrale
                            </a>
                        </li>
                            <li>
                                <a href="https://www.burnair.ch/windmap/" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Live-Wind-Karte
                                </a>
                            </li>
                            <li>
                                <a href="https://www.dcweissenstein.ch/portfolio_page/wetterstation-weissenstein/" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Weissenstein
                                </a>
                            </li>
                            <li>
                                <a href="http://www.meteocentrale.ch/de/europa/schweiz/wetter-uetliberg-turm/details/S066770/#2017-04-03" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Uetliberg
                                </a>
                            </li>
                            <li>
                                <a href="http://wetterstationen.meteomedia.ch/?map=Schweiz&station=066561" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Rigi-Kulm
                                </a>
                            </li>
                            <li>
                                <a href="https://www.dcweissenstein.ch/portfolio_page/wetterstation-roeti/" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Weissenstein – Röti
                                </a>
                            </li>
                        </ul>
                        <a className="link-box__show-more js-show-more">
                            {this.state.buttonTxt}
                        </a>
                    </div>
                </div>
                <div className="box link-box js-linkbox">
                    <div className="link-box__content js-linkbox-content">
                        <h3 className="title title-h3">Karten.<br /><span className="title--regular">Das wichtigste Kartenmaterial.</span>
                        </h3>
                        <ul className="link-box__list js-linkbox-links">
                            <li>
                                <a href="https://www.skybriefing.com/portal/delegate/dabs?today" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    DABS von Heute
                                </a>
                            </li>
                            <li>
                                <a href="https://www.skybriefing.com/portal/delegate/dabs?tomorrow" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    DABS von Morgen
                                </a>
                            </li>
                            <li>
                                <a href="https://map.geo.admin.ch/?lang=de&zoom=3&scale=500000&X=261310.48&Y=687075.00&bgLayer=ch.swisstopo.pixelkarte-farbe&bgOpacity=1&topic=ech&layers=ch.bazl.segelflugkarte"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Segelflugkarte
                                </a>
                            </li>
                            <li>
                                <a href="https://map.geo.admin.ch/?lang=de&zoom=4&scale=500000&X=169415.73694&Y=635750&layers=ch.bazl.segelflugkarte&bgLayer=ch.swisstopo.pixelkarte-farbe&bgOpacity=1&topic=ech"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Hinderniskarte
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/TMA-Locarno-1037676889614177/"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    TMA-Locarno
                                </a>
                            </li>
                            <li>
                                <a href="http://www.parange.ch" target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Gleitwinkel
                                </a>
                            </li>
                            <li>
                                <a href="http://xcweeks.com" target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    XC-Weeks
                                </a>
                            </li>
                            <li>
                                <a href="https://xcplanner.appspot.com" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    XC-Planer
                                </a>
                            </li>
                        </ul>
                        <a className="link-box__show-more js-show-more">
                            {this.state.buttonTxt}
                        </a>
                    </div>
                </div>
                <div className="link-box__prev-next only-show-on-mobile">
                    <a className="link-box__prev js-prev"><span className="link-box__prev-text"></span><i className="fas fa-chevron-left link-box__fa"></i></a>
                    <a className="link-box__next js-next"><i className="fas fa-chevron-right link-box__fa"></i><span className="link-box__next-text"></span></a>
                </div>
                <div className="link-box__dots only-show-on-mobile">
                    <span className="link-box__dot js-dot" data-dot="1"></span>
                    <span className="link-box__dot js-dot" data-dot="2"></span>
                    <span className="link-box__dot js-dot" data-dot="3"></span>
                </div>
            </div>
            <div className="start__twocolumn js-linkbox-slideshow-container">
                <div className="box link-box js-linkbox">
                    <div className="link-box__content js-linkbox-content ">
                        <h3 className="title title-h3">Thermik.<br /> <span className="title--regular">Wo steigts?</span></h3>
                        <ul className="link-box__list js-linkbox-links">
                            <li>
                                <a href="https://soaringmeteo.org/soarWRF2K0612Z.html" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Soaringmeteo
                                </a>
                            </li>
                            <li>
                                <a href="https://wetter.kk7.ch/#regtherm" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Regtherm
                                </a>
                            </li>
                            <li>
                                <a href="https://thermal.kk7.ch/" target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Hotspots
                                </a>
                            </li>
                            <li>
                                <a href="https://www.meteo-shv.ch/home/allgemein/segelflugwetterbericht.html" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    SHV-Meteo
                                </a>
                            </li>
                            <li>
                                <a href="https://www.meteo-shv.ch/home/thermik/previtemps-72-std-interlaken-visp.html" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Interlaken-Visp
                                </a>
                            </li>
                            <li>
                                <a href="https://www.meteo-shv.ch/home/thermik/previtemps-72-std-interlaken-visp.html" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Buochs-Locarno
                                </a>
                            </li>
                            <li>
                                <a href="https://www.meteo-shv.ch/home/thermik/previtemps-72-std-visp-illanz.html" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Visp-Illanz
                                </a>
                            </li>
                            <li>
                                <a href="https://www.meteo-shv.ch/home/thermik/previtemps-72-std-illanz-samedan.html" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Ilanz-Samedan
                                </a>
                            </li>
                        </ul>
                        <a className="link-box__show-more js-show-more">
                            {this.state.buttonTxt}
                        </a>
                    </div>
                </div>
                <div className="box link-box js-linkbox">
                    <div className="link-box__content js-linkbox-content">
                        <h3 className="title-h3">Webcams.<br /><span className="title--regular">Wie siehts aus?</span> </h3>
                        <ul className="link-box__list js-linkbox-links">
                            <li>
                                <a href="https://www.flugsau.ch/main_bigware_30.php?pages_id=21&language=de" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Engelbergerthal
                                </a>
                            </li>
                            <li>
                                <a href="http://www.brunni.ch/aktuelle-info/webcams" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Brunni-Engelberg
                                </a>
                            </li>
                            <li>
                                <a href="http://www.eggberge.ch/aktuell/webcam" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Eggberge
                                </a>
                            </li>
                            <li>
                                <a href="http://www.mythenregion.ch/winter/info/webcams" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Rotenflue
                                </a>
                            </li>
                            <li>
                                <a href="https://www.bergfex.ch/locarno-orselina-cardada/webcams/c7865/"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Cimetta
                                </a>
                            </li>
                            <li>
                                <a href="http://www.niederbauen.ch/aussichten/webcams" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Niederbauen
                                </a>
                            </li>
                            <li>
                                <a href="https://laax.roundshot.com/crap-sogn-gion-park" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Laax
                                </a>
                            </li>
                            <li>
                                <a href="https://panocam.skiline.cc/firstbahn#" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Grindelwald
                                </a>
                            </li>
                            <li>
                                <a href="http://flug-taxi.ch/webcam/landeplatz_fiesch.jpg" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    Fiesch – Landeplatz
                                </a>
                            </li>
                        </ul>
                        <a className="link-box__show-more js-show-more">
                            {this.state.buttonTxt}
                        </a>
                    </div>
                </div>
                <div className="box link-box js-linkbox">
                    <div className="link-box__content js-linkbox-content">
                        <h3 className="title-h3">Diverse.<br /><span className="title--regular">Weitere nützliche Klicks.</span>  </h3>
                        <ul className="link-box__list js-linkbox-links">
                            <li>
                                <a href="https://www.shv-fsvl.ch/sicherheit/luftraum" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    SHV Lufträume
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shv-fsvl.ch/sicherheit/fluggebiete" target="_blank" rel="noopener noreferrer"
                                   className="link-box__link anchor">
                                    SHV Fluggebiete
                                </a>
                            </li>
                            <li>
                                <a href="https://www.xcontest.org/world/en/flights/daily-score-pg/#filter[date]=2018-02-11@filter[country]=CH"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    XContest
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/user/glidezeit/videos?shelf_id=1&view=0&sort=dd"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Manövervideos
                                </a>
                            </li>
                            <li>
                                <a href="http://api3.geo.admin.ch/static/images/legends/ch.bazl.segelflugkarte_de_big.pdf"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Leg. Segelflugkarte
                                </a>
                            </li>
                            <li>
                                <a href="https://www.shv-fsvl.ch/sicherheit/luftraum/"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Luftraum News
                                </a>
                            </li>
                            <li>
                                <a href="http://www.5steps.ch/meteo/lokaleAbmachungen.htm"
                                   target="_blank" rel="noopener noreferrer" className="link-box__link anchor">
                                    Lokale Abmachungen
                                </a>
                            </li>
                        </ul>
                        <a className="link-box__show-more js-show-more">
                            {this.state.buttonTxt}
                        </a>
                    </div>
                </div>
                <div className="link-box__prev-next only-show-on-mobile">
                    <a className="link-box__prev js-prev"><span className="link-box__prev-text"></span><i className="fas fa-chevron-left link-box__fa"></i></a>
                    <a className="link-box__next js-next"><i className="fas fa-chevron-right link-box__fa"></i><span className="link-box__next-text"></span></a>
                </div>
                <div className="link-box__dots only-show-on-mobile">
                    <span className="link-box__dot js-dot" data-dot="1"></span>
                    <span className="link-box__dot js-dot" data-dot="2"></span>
                    <span className="link-box__dot js-dot" data-dot="3"></span>
                </div>
            </div>
        </div>
        );
    }
}

export default FlugplanungRight;
