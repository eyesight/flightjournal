import React, { Component } from 'react';
import { getUser } from '../../actions/UserActions';
import { getRegions } from '../../actions/RegionsActions';
import { getStartplaces, deleteStartplaces } from '../../actions/StartplacesActions';
import { updateStartareas } from '../../actions/StartareasActions';
import { getWinddirections } from '../../actions/WinddirectionActions';
import { getPilots } from '../../actions/PilotActions';
import BackButton from './../backButton/backButton';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  _ from 'lodash';
import MainTitleWrapper from '../mainTitleWrapper/mainTitleWrapper';
import * as routes from '../../constants/routes';
import Paragraph from '../paragraph/paragraph';
import ImageGallerie from '../imageGallerie/imageGallerie';
import ArticleItem from '../articleItem/articleItem'
import DetailsItem from '../detailsItem/detailsItem';

class StartplaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classNameDetails: 'details__item',
            classNameDetailsTitel: 'details__titel',
            classNameDetailsTxt: 'anchor',
            classNameDetailsTxt_txt: 'details__txt',
            classNameLink: 'anchor-wrapper',
            startplatz: 'Startplatz',
            isUserAdmin: false,

            currentArea: {},
            allcurrentStartplaces: [],
            allWind: [],
            areadesc: '',
            areatitle: '',
            allWinddirectionsArea: [],
            regionsname: '',
            regionscountry: '',
            imagesName: [],
            imagesUrl: [],
            arealocationpin: '',
            funicularLink: '',
            webcams: [],
            haswebcams: false,
            shvInfo: '',
            weatherstations: [],
            xc: ''
        };
        this.renderArray = this.renderArray.bind(this);
        this.getWinddirectionsnames = this.getWinddirectionsnames.bind(this);
        this.filterimages = this.filterimages.bind(this);
        this.deletefunction = this.deletefunction.bind(this);
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getUser();
        this.props.getStartplaces();
        this.props.getRegions();
        this.props.getWinddirections();
        this.props.getPilots();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    getWinddirectionsnames(thewinddirections, windasobj){
        let allWinddirections = _.uniq([].concat.apply([], thewinddirections));
        let windarray = [];
        let windstring = '';
            windasobj.map((ww) =>{
            for(let index = 0; index < allWinddirections.length; index++){
                if(ww.id === allWinddirections[index]){
                    windarray.push(ww.name);
                }
            };    
            windstring = windarray.join(', ');
            return windstring;
        });
        return windarray;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          } 
        //if current user hase the role "admin" set state to show the edit-button
        if(nextProps.currentPilot && nextProps.currentPilot.role === 'admin'){
            this.setState({
                isUserAdmin: true
            });
        }   
        if( nextProps.allstartplaces !== undefined && nextProps.startplace !== nextProps.regions){
            let currentArea = _.find(nextProps.allstartplaces, {id:nextProps.match.params.id});
            let allCurrentStartplaces = (currentArea) ? _.values(currentArea.startplaces) : '';
            let allWinddirections = [];
            let allimagesUrl = [];
            let allimagesNames = [];
            const wind = Object.keys(nextProps.winddirections).map(i => nextProps.winddirections[i]);
            if(currentArea){
                //concat different values of all startplaces, which belong to the area
                for(let i = 0; i<allCurrentStartplaces.length; i++){
                    let wind = Object.keys(allCurrentStartplaces[i].winddirectionsId);
                    allWinddirections.push(wind);
                    //Get the URl out of the images-count-variable and the images-url. 
                    //Loop the images count for each startplace and push url in variable
                    for(let y = 0; y<allCurrentStartplaces[i].imagesCount; y++){
                        let urlstring = `${routes.STARTPLACESIMAGES}/${allCurrentStartplaces[i].imagesUrl}/${y}.jpg`;
                        allimagesUrl.push(urlstring);
                        allimagesNames.push(`${y}.jpg`);
                    }
                }
                this.setState({
                    areadesc: currentArea.description,
                    arealocationpin: currentArea.locationpin,
                    areatitle: currentArea.name,
                    allWind: wind,
                    allWinddirectionsArea: this.getWinddirectionsnames(allWinddirections, wind).join(', '),//to get the Winddirections as Strings, map throw all the Winddirections
                    regionsname: currentArea.region.name,
                    regionscountry: currentArea.region.country,
                    imagesUrl: allimagesUrl,
                    imagesName: allimagesNames,
                    funicularLink: currentArea.funicularLink,
                    webcams: currentArea.webcams,
                    shvInfo: currentArea.shvInfo,
                    weatherstations: currentArea.weatherstations,
                    xc: currentArea.xc,
                    allcurrentStartplaces: allCurrentStartplaces
                });
                if(currentArea.webcams && currentArea.webcams[0] !== ''){
                    this.setState({
                        haswebcams: true
                    })
                }
            }
        }   
    }
    renderArray(obj, text){
        return obj.map((item, index) =>{
            let linkName = `${text} ${index+1}`;
            return (
                <a rel="noopener noreferrer" key={item+index} className={this.state.classNameLink} target="_blank" href={item}><span className={this.state.classNameDetailsTxt}>{linkName}</span></a>
            )
        });
    }

    filterimages(e, id){
        e.preventDefault();
    }

    deletefunction(id, idArea){
        let that = this;
        let sparray = [];
        console.log(this.props.allstartareas);
        const keysOfStartareas = Object.keys(that.props.allstartareas).map(i => that.props.allstartareas[i]);
            
        keysOfStartareas.map(function (item) {
            if(item.id === idArea){
                sparray = item.startplaces;
                return sparray.splice( sparray.indexOf(id), 1 );
            };
            console.log(sparray);
            return sparray;
        }); 
        let objArea = {
            startplaces: sparray
        }
        console.log(objArea);
        this.props.updateStartareas(idArea, objArea).then(
            this.props.deleteStartplaces(id),
            ).catch((err) => {
                console.log('error when delete startplace');
                console.log(err)
                }
            );
    }

    render() {
        let textTitelBold = `${this.state.areatitle}`;
        let textTitelSmall = `${this.state.regionsname}, ${this.state.regionscountry}`;
        return (
            <main className="main">
                    <section className="detail-layout">
                    <BackButton 
                        backto = {true}
                        text = 'Zurück zur Übersicht'
                    />
                    <MainTitleWrapper 
                        classNameWrapper='detail-layout__header'
                        withAnchor={false}
                        classNameAnchor='anchor-small anchor--green'
                        withIcon={true} 
                        classNameIcon='fas fa-angle-left'
                        anchorText='Zurück zur Übersicht'
                        hrefAnchor={routes.LANDING}
                        classNameH1='main-title'
                        classNameSpan='main-title--bold'
                        textBold={textTitelBold}
                        textReg={this.state.allWinddirectionsArea}
                        withParagraph={true}
                        classNameParagraph='main-title-text'
                        paragraphTxt={textTitelSmall}
                    />
                    {this.state.imagesUrl[0] !== '' ? (
                        <ImageGallerie 
                            url={this.state.imagesUrl}
                            name={this.state.imagesName}
                            classnamesWrapper='detail-layout__left detail-layout__left--small image-galerie'
                    />) : null}
                    <div className="detail-layout__right">
                        <div className="detail-layout__grid12">
                            <div className="details details--1column-small">
                            {this.state.arealocationpin ? (
                                <DetailsItem 
                                    classNameDetails={this.state.classNameDetails}
                                    classNameDetailsTitel={this.state.classNameDetailsTitel}
                                    classNameDetailsTxt={this.state.classNameDetailsTxt}
                                    title='Anreise'
                                    txt='Google Standort'
                                    hasLink={true}
                                    linkUrl={this.state.arealocationpin}
                                    classNameLink={this.state.classNameLink}
                                />): null}
                                {this.state.funicularLink ? (
                                <DetailsItem 
                                    classNameDetails={this.state.classNameDetails}
                                    classNameDetailsTitel={this.state.classNameDetailsTitel}
                                    classNameDetailsTxt={this.state.classNameDetailsTxt}
                                    title='Seilbahn'
                                    txt='Ja, Infos gibts hier'
                                    hasLink={true}
                                    linkUrl={this.state.funicularLink}
                                    classNameLink={this.state.classNameLink}
                                />): 
                                <DetailsItem 
                                    classNameDetails={this.state.classNameDetails}
                                    classNameDetailsTitel={this.state.classNameDetailsTitel}
                                    classNameDetailsTxt={this.state.classNameDetailsTxt_txt}
                                    title='Seilbahn'
                                    txt='Gibt es leider nicht'
                                    hasLink={false}
                                />}
                                {this.state.haswebcams ? (<div className="details__item">
                                    <p className="details__titel">Webcams</p>
                                    {this.renderArray(this.state.webcams, 'Webcam')}
                                </div>) : null}
                                {this.state.shvInfo ? (<DetailsItem 
                                    classNameDetails={this.state.classNameDetails}
                                    classNameDetailsTitel={this.state.classNameDetailsTitel}
                                    classNameDetailsTxt={this.state.classNameDetailsTxt}
                                    title='SHV-Infotafel'
                                    txt='Hier ansehen'
                                    hasLink={true}
                                    linkUrl={this.state.shvInfo}
                                    classNameLink={this.state.classNameLink}
                                />) : null}
                                {this.state.weatherstations ? (<div className="details__item">
                                    <p className="details__titel">Wind</p>
                                    <a className={this.state.classNameLink} rel="noopener noreferrer" target="_blank" href='https://www.burnair.ch/windmap/'><span className={this.state.classNameDetailsTxt}>Live-Wind-Karte</span></a>
                                    {this.renderArray(this.state.weatherstations, 'Windstation')}
                                </div>) : 
                                <div className="details__item">
                                    <p className="details__titel">Wind</p>
                                    <a className={this.state.classNameLink} rel="noopener noreferrer" target="_blank" href='https://www.burnair.ch/windmap/'><span className={this.state.classNameDetailsTxt}>Live-Wind-Karte</span></a>
                                </div>}
                                <div className="details__item">
                                    <p className="details__titel">Thermik</p>
                                    <a className={this.state.classNameLink} rel="noopener noreferrer" target="_blank" href='https://wetter.kk7.ch/#regtherm'><span className={this.state.classNameDetailsTxt}>KK7</span></a>
                                    <a className={this.state.classNameLink} rel="noopener noreferrer" target="_blank" href='https://thermal.kk7.ch'><span className={this.state.classNameDetailsTxt}>Hotspots</span></a>
                                </div>
                                <DetailsItem 
                                    classNameDetails={this.state.classNameDetails}
                                    classNameDetailsTitel={this.state.classNameDetailsTitel}
                                    classNameDetailsTxt={this.state.classNameDetailsTxt}
                                    title='Wetterprognose'
                                    txt='Meteoswiss'
                                    hasLink={true}
                                    linkUrl='https://www.meteoschweiz.admin.ch/home.html?tab=report'
                                    classNameLink={this.state.classNameLink}
                                />
                                {this.state.xc ? (<DetailsItem 
                                    classNameDetails={this.state.classNameDetails}
                                    classNameDetailsTitel={this.state.classNameDetailsTitel}
                                    classNameDetailsTxt={this.state.classNameDetailsTxt}
                                    title='Streckenflug'
                                    txt='XC-Einträge'
                                    hasLink={true}
                                    linkUrl={this.state.xc}
                                    classNameLink={this.state.classNameLink}
                                />) : null}
                            </div>
                            <div className="details details--1column-large">
                            <Paragraph 
                                    classNameParagraph='text'
                                    paragraphTxt={this.state.areadesc}
                                />
                            {this.state.allcurrentStartplaces.map((spitem)=>{
                                return (<ArticleItem key={spitem.id}
                                    themeTitle={this.state.startplatz}
                                    titleBold={`${spitem.name}, ${spitem.altitude}\u00a0m`}
                                    titleReg={this.getWinddirectionsnames(_.keys(spitem.winddirectionsId), this.state.allWind).join(', ')}
                                    txt={spitem.description}
                                    onclickfunction={(event)=>{this.filterimages(event, spitem.id)}}
                                    link='Startplatz ansehen'
                                    isAdmin={this.state.isUserAdmin}
                                    route={routes.STARTPLATZ_ERFASSEN + "/" + this.props.match.params.id + "--sp--" +spitem.id}
                                    deletefunction={()=>{this.deletefunction(spitem.id, spitem.startareasId)}}
                                />)
                            })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

function mapStateToProps(state, props) {
    const key = props.match.params.id;
    return { 
        user: state.user,
        startplace: _.find(state.startplaces, {id:key}),
        regions: state.regions,
        allstartplaces: state.startplaces,
        winddirections: state.winddirections,
        currentPilot: _.find(state.pilots, { email: state.user.email })
    };
} 

export default withRouter(connect(mapStateToProps, { getUser, getStartplaces, getRegions, getWinddirections, getPilots, deleteStartplaces, updateStartareas })(StartplaceDetail));