import React, { Component } from 'react';
import { getUser } from '../../actions/UserActions';
import { getFlights} from '../../actions/FlightActions';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getPilots } from '../../actions/PilotActions';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  _ from 'lodash';
import MainTitleWrapper from '../mainTitleWrapper/mainTitleWrapper';
import * as routes from '../../constants/routes';
import * as utils from '../../utils/timeToHourMinString';
import Paragraph from '../paragraph/paragraph';
import DetailsItem from '../detailsItem/detailsItem';
import ImageGallerie from '../imageGallerie/imageGallerie';

class FlightDetailContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flighttime: '',
            date: '',
            name: '',
            landeplatz: '',
            startplatz: '',
            startplatzAltitude: 0,
            startplatzArea: '',
            flughoehe: '',
            xcdistance: '',
            pilotFirstname: '',
            pilotLastname: '',
            description: '',
            maxaltitude: 0,
            heightgain: 0,
            maxclimb: 0,
            maxsink: 0,
            startingtime: '',
            distance: 0,
            syrideLink: '',
            xcontestLink: '',
            airtribuneLink: '',
            weatherFoehndiagramm: '',
            weatherWind800m: '',
            weatherWind1500m: '',
            weatherWind3000m: '',
            weatherFronten: '',
            weatherRegtherm: '',
            weatherSoaringmeteo: '',
            imagesUrl: [],
            imagesName: [],

            showWeatherLinks: false,
            showFurtherDetailsLinks: false,
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getFlights();
        this.props.getUser();
        this.props.getStartplaces();
        this.props.getPilots();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          } 
          
        if( nextProps.flight !== undefined){
            const currentFlight = nextProps.flight;
            const currentPilot = _.find(nextProps.pilots, {email:currentFlight.pilot});
            const currentStartplace = _.find(nextProps.startplaces, {id:currentFlight.startplace});

            if(currentPilot !== undefined && currentStartplace !== undefined){
                this.setState({
                flighttime: currentFlight.flighttime,
                date: currentFlight.date,
                landeplatz: currentFlight.landingplace,
                startplatz: currentStartplace.name,
                startplatzAltitude: currentStartplace.altitude,
                startplatzArea: currentStartplace.area,
                flughoehe: currentFlight.maxaltitude,
                xcdistance: currentFlight.xcdistance,
                pilotFirstname: currentPilot.firstname,
                pilotLastname: currentPilot.lastname,
                description: currentFlight.description,
                maxaltitude: currentFlight.maxaltitude,
                heightgain: currentFlight.heightgain,
                maxclimb: currentFlight.maxclimb,
                maxsink: currentFlight.maxsink,
                startingtime: currentFlight.startingtime,
                distance: currentFlight.distance,
                syrideLink: currentFlight.syrideLink,
                xcontestLink: currentFlight.xcontestLink,
                airtribuneLink: currentFlight.airtribuneLink,
                weatherFoehndiagramm: currentFlight.weatherFoehndiagramm,
                weatherWind800m: currentFlight.weatherWind800m,
                weatherWind1500m: currentFlight.weatherWind1500m,
                weatherWind3000m: currentFlight.weatherWind3000m,
                weatherFronten: currentFlight.weatherFronten,
                weatherRegtherm: currentFlight.weatherRegtherm,
                weatherSoaringmeteo: currentFlight.weatherSoaringmeteo,
                imagesUrl: currentFlight.imgUrl,
                imagesName: currentFlight.imgName
            });
            if(currentFlight.weatherFoehndiagramm !== '' && 
                currentFlight.weatherWind800m !== '' && 
                currentFlight.weatherWind1500m !== '' && 
                currentFlight.weatherWind3000m !== '' && 
                currentFlight.weatherFronten !== '' && 
                currentFlight.weatherRegtherm !== '' && 
                currentFlight.weatherSoaringmeteo !== ''){ 
                    this.setState({showWeatherLinks: true})
                } else {
                    this.setState({showWeatherLinks: false});
                } 
            if(currentFlight.syrideLink !== '' &&
                currentFlight.xcontestLink !== '' &&
                currentFlight.airtribuneLink !== ''){ 
                    this.setState({showFurtherDetailsLinks: true})
                } else {
                    this.setState({showFurtherDetailsLinks: false});
                } 
            }
        }
    }

    render() {
        let textParagraph = `${this.state.date}, ${this.state.pilotFirstname} ${this.state.pilotLastname}`;
        let textTitelReg = `${utils.timeToHourMinString(this.state.flighttime)}, ${this.state.xcdistance} km`;
        let textTitelBold = `${this.state.startplatz} – ${this.state.startplatzArea}, ${this.state.startplatzAltitude} m`;
        return (
            <main className="main">
                    <section className="detail-layout">
                    <MainTitleWrapper 
                        classNameWrapper='detail-layout__header'
                        withAnchor={true}
                        classNameAnchor='anchor-small anchor--green'
                        withIcon={true} 
                        classNameIcon='fas fa-angle-left'
                        anchorText='Zurück zur Übersicht'
                        hrefAnchor={routes.HOME}
                        classNameH1='main-title'
                        classNameSpan='main-title--bold'
                        textBold={textTitelBold}
                        textReg={textTitelReg}
                        withParagraph={true}
                        classNameParagraph=''
                        paragraphTxt={textParagraph}
                    />
                    {this.state.imagesName.length !==0 ? (
                        <ImageGallerie 
                            classNameOuterDiv="detail-layout__left image-galerie"
                            url={this.state.imagesUrl}
                            name={this.state.imagesName}
                    />) : (
                        ''
                    )}
                    <div className="detail-layout__right">
                        <Paragraph 
                            classNameParagraph='text'
                            paragraphTxt={this.state.description}
                        />
                        <div className="details">
                            <div className="details__columns">
                            {this.state.landeplatz ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Landeplatz'
                                    txt={this.state.landeplatz}
                                />): (
                                    ''
                                )}
                                {this.state.maxaltitude ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximale Flughöhe'
                                    txt={this.state.maxaltitude + ' m'}
                                />): (
                                    ''
                                )}
                                {this.state.heightgain ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximaler Höhengewinn'
                                    txt={this.state.heightgain + ' m'}
                                />): (
                                    ''
                                )}
                                {this.state.maxclimb ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximales Steigen'
                                    txt={this.state.maxclimb + ' m/s'}
                                />): (
                                    ''
                                )}
                                {this.state.maxsink ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximales Sinken'
                                    txt={this.state.maxsink + ' m/s'}
                                />): (
                                    ''
                                )}
                                {this.state.startingtime ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Starzzeit'
                                    txt={this.state.startingtime + ' m/s'}
                                />): (
                                    ''
                                )}
                                {this.state.distance ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Geflogene Distanz'
                                    txt={this.state.distance + ' km'}
                                />): (
                                    ''
                                )}
                                {this.state.showFurtherDetailsLinks ? (
                                    <div className="details__item">
                                    <p className="details__titel-anchors">Weitere Daten</p>
                                    <p className="details__txt-anchors">Kartenansicht und mehr.</p>
                                    {this.state.syrideLink ? (
                                        <a target="_blank" href={this.state.syrideLink}><span className="anchor">Syride</span></a>): (
                                        ''
                                    )}
                                    {this.state.xcontestLink ? (
                                    <a target="_blank" href={this.state.xcontestLink}><span className="anchor">XContest</span></a>): (
                                        ''
                                    )}
                                    {this.state.airtribuneLink ? (
                                    <a target="_blank" href={this.state.airtribuneLink}><span className="anchor">Airtribune</span></a>): (
                                        ''
                                    )}
                                </div>
                                ) : (
                                    ''
                                )} 
                            </div>
                        </div>
                        {this.state.showWeatherLinks ? (
                            <div className="details">
                        <h2 className="title-h2">Wetter. <span className="title--regular">Screenshots der Prognosen.</span></h2>
                            <div className="details__columns">
                                <a><span className="anchor" href={this.state.weatherFoehndiagramm}>Föhndiagramm</span></a>
                                <a><span className="anchor" href={this.state.weatherWind800m}>Wind 800 m</span></a>
                                <a><span className="anchor" href={this.state.weatherWind1500m}>Wind 1500 m</span></a>
                                <a><span className="anchor" href={this.state.weatherWind3000m}>Wind 3000 m</span></a>
                                <a><span className="anchor" href={this.state.weatherFronten}>Fronten</span></a>
                                <a><span className="anchor" href={this.state.weatherRegtherm}>Regtherm</span></a>
                                <a><span className="anchor" href={this.state.weatherSoaringmeteo}>Soaringmeteo</span></a>
                            </div>
                        </div>) : (
                            ''
                            )}
                        
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
        flight: _.find(state.flights, {id:key}),
        startplaces: state.startplaces,
        pilots: state.pilots
    };
} 

export default withRouter(connect(mapStateToProps, { getUser, getFlights, getStartplaces, getPilots })(FlightDetailContainer));