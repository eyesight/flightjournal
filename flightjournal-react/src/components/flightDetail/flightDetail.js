import React, { Component } from 'react';
import { getUser } from '../../actions/UserActions';
import { getFlights} from '../../actions/FlightActions';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getStartareas } from '../../actions/StartareasActions';
import { getPilots } from '../../actions/PilotActions';
import { getParagliders } from '../../actions/ParaglidersActions';
import BackButton from './../backButton/backButton';

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
            paraglider: '',
            paragliderBrand: '',
            paragliderModel: '',
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
            weatherDescription: '',
            imagesUrl: [],
            imagesName: [],

            showWeather: false,
            showFurtherDetailsLinks: false,
            isActive: 1
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getFlights();
        this.props.getUser();
        this.props.getStartplaces();
        this.props.getPilots();
        this.props.getParagliders();
        this.props.getStartareas();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          } 
          
        if( nextProps.flight !== undefined){
            let currentArea = '';
            const currentFlight = nextProps.flight;
            const currentPilot = _.find(nextProps.pilots, {email:currentFlight.pilot});
            const currentStartplace = _.find(nextProps.startplaces, {id:currentFlight.startplace});
            if(currentStartplace){
                currentArea = _.find(nextProps.startareas, {id:currentStartplace.startareasId});
            }
            const currentParaglider = _.find(nextProps.paragliders, {id:currentFlight.paraglider});
            
            if(currentPilot !== undefined && currentStartplace !== undefined && currentParaglider !== undefined && currentArea !== undefined){
                this.setState({
                flighttime: currentFlight.flighttime,
                date: currentFlight.date,
                landeplatz: currentFlight.landingplace,
                startplatz: currentStartplace.name,
                startplatzAltitude: currentStartplace.altitude,
                startplatzArea: currentArea.name,
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
                weatherDescription: currentFlight.weatherDescription,
                imagesUrl: currentFlight.imgUrl,
                imagesName: currentFlight.imgName,
                paraglider: currentParaglider,
                paragliderBrand: currentParaglider.brand,
                paragliderModel: currentParaglider.model
            });
            (currentFlight.weatherDescription !== '') ? this.setState({showWeather: true}) : this.setState({showWeather: false});
            (currentFlight.syrideLink !== '' ||
                currentFlight.xcontestLink !== '' ||
                currentFlight.airtribuneLink !== '') ? this.setState({showFurtherDetailsLinks: true}) : this.setState({showFurtherDetailsLinks: false});
            }
        }   
    }

    render() {
        let textParagraph = `${this.state.date}, ${this.state.pilotFirstname} ${this.state.pilotLastname}`;
        let textTitelReg = this.state.xcdistance ? `${utils.timeToHourMinString(this.state.flighttime)}, ${this.state.xcdistance} km` : `${utils.timeToHourMinString(this.state.flighttime)}`;
        let textTitelBold = `${this.state.startplatz} – ${this.state.startplatzArea}, ${this.state.startplatzAltitude} m`;
        let startingTimeHour = Math.floor(Number(this.state.startingtime)/60);
        startingTimeHour = (startingTimeHour<10) ? '0'+ startingTimeHour : startingTimeHour;
        let startingTimeMinute = Number(this.state.startingtime)%60;
        startingTimeMinute = (startingTimeMinute<10) ? '0'+ startingTimeMinute : startingTimeMinute;
        let glider = `${this.state.paragliderBrand} ${this.state.paragliderModel}`;
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
                        textReg={textTitelReg}
                        withParagraph={true}
                        classNameParagraph='main-title-text'
                        paragraphTxt={textParagraph}
                    />
                    {this.state.imagesName[0] !== '' ? (
                        <ImageGallerie 
                            url={this.state.imagesUrl}
                            name={this.state.imagesName}
                    />) : null}
                    <div className="detail-layout__right">
                        <Paragraph 
                            classNameParagraph='details__txt-long'
                            paragraphTxt={this.state.description}
                        />
                        <div className="details">
                            <div className="details__columns">
                            {this.state.flighttime ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Flugzeit'
                                    txt={utils.timeToHourMinString(this.state.flighttime)}
                                />): null}
                            {this.state.xcdistance ? (
                            <DetailsItem 
                                classNameDetails='details__item'
                                classNameDetailsTitel= 'details__titel'
                                classNameDetailsTxt='details__txt'
                                title='XC-Distanz'
                                txt={`${this.state.xcdistance} km`}
                            />): null}
                            {this.state.landeplatz ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Landeplatz'
                                    txt={this.state.landeplatz}
                                />): null}
                                {this.state.maxaltitude ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximale Flughöhe'
                                    txt={this.state.maxaltitude + ' m'}
                                />): null}
                                {this.state.heightgain ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximaler Höhengewinn'
                                    txt={this.state.heightgain + ' m'}
                                />): null}
                                {this.state.maxclimb ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximales Steigen'
                                    txt={this.state.maxclimb + ' m/s'}
                                />): null}
                                {this.state.maxsink ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Maximales Sinken'
                                    txt={this.state.maxsink + ' m/s'}
                                />): null}
                                {this.state.startingtime ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Startzeit'
                                    txt={startingTimeHour + ' : ' + startingTimeMinute + ' Uhr'}
                                />): null}
                                {this.state.distance ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Geflogene Distanz'
                                    txt={this.state.distance + ' km'}
                                />): null}
                                {this.state.paraglider ? (
                                <DetailsItem 
                                    classNameDetails='details__item'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt'
                                    title='Gleitschirm Modell'
                                    txt={glider}
                                />): null}
                                {this.state.showFurtherDetailsLinks ? (
                                    <div className="details__item">
                                    <p className="details__titel-anchors">Weitere Daten</p>
                                    <p className="details__txt-anchors">Kartenansicht und mehr.</p>
                                    {this.state.syrideLink ? (
                                        <a target="_blank" href={this.state.syrideLink}><span className="anchor">Syride</span></a>): null}
                                    {this.state.xcontestLink ? (
                                    <a target="_blank" href={this.state.xcontestLink}><span className="anchor">XContest</span></a>): null}
                                    {this.state.airtribuneLink ? (
                                    <a target="_blank" href={this.state.airtribuneLink}><span className="anchor">Airtribune</span></a>): null}
                                </div>
                                ) : null} 
                            </div>
                        </div>
                        {this.state.showWeather ? (
                            <DetailsItem 
                                    classNameDetails='details details--margin-top'
                                    classNameDetailsTitel= 'details__titel'
                                    classNameDetailsTxt='details__txt-long'
                                    title='Wetter'
                                    txt={this.state.weatherDescription}
                                />) : null}
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
        startareas: state.startareas,
        pilots: state.pilots,
        paragliders: state.paragliders
    };
} 

export default withRouter(connect(mapStateToProps, { getUser, getFlights, getStartplaces, getPilots, getParagliders, getStartareas })(FlightDetailContainer));