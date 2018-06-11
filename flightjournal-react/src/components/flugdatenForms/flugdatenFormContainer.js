import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { getFlights, saveFlights, deleteFlights, updateFlights } from '../../actions/FlightActions';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getUser } from '../../actions/UserActions';
import { getPilots } from '../../actions/PilotActions';
import * as routes from '../../constants/routes';
import ReactTransitionGroup from 'react-addons-transition-group';
import FlugdatenForm1 from './flugdatenForm1';
import FlugdatenForm2 from './flugdatenForm2';
import FlugdatenForm3 from './flugdatenForm3';
import FlugdatenForm4 from './flugdatenForm4';
import FlugdatenForm5 from './flugdatenForm5';
import  _ from 'lodash';
import moment from 'moment';
import 'moment/locale/de-ch'
import 'react-datepicker/dist/react-datepicker.css';
import * as validation from '../../utils/validationText';
import {FormErrors} from '../formErrors/formErrors';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';

let obj = {};

class FlugdatenFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: moment(),
          ud: false, 
          form1: true,
          form2: false,
          form3: false,
          form4: false,
          form5: false,
          inputPilot: props.inputPilot,
          ani: 'form1',
          flightID: '',
          IDtoUpdate: '',
          formTitleH2: 'Erfasse deine Flugdaten.',
          
          //validation-states
          validationTxt: '',
          errorAlert: false,

          formErrors: {Landeplatz: '', Datum: '', Startplatz: '', Flugzeit: '', valueHour: '', valueMinute: '', Beschreibung: '', Distanz: ''},
          landingplaceValid: false,
          dateValid: false,
          startplaceValid: false,
          formValid: false, 
          flighttimeValid: false,
          descriptionValid: false,
          xcdistanceValid: false,
          
          //states for the flighttime and the names of inputfields
          valueHour:'',
          valueMinute: '',
          nameHour: 'valueHour',
          nameMinute: 'valueMinute',
          nameComment: 'description',
          nameStartplace: 'startplace',
          
          //data for database
          date: new Date().toLocaleDateString("de-ch",
          {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          description: '',
          startplace:'',
          landingplace: '',
          flighttime: '',
          xcdistance: '',
          maxaltitude: '',
          heightgain:'',
          maxclimb: '',
          startingtime:'',
          distance: '',
          imgUrl: '',
          syrideLink: '',
          xcontestLink: '',
          airtribuneLink: '',
          weatherFoehndiagramm: '',
          weatherWindBoden: '',
          weatherWind800m: '',
          weatherWind1500m: '',
          weatherWind3000m: '',
          weatherRegtherm: '',
          weatherFronten: '',
          weatherSoaringmeteo: '',
          weatherBisendiagramm: '',
          rating: '',
        };

        this.getOptions = this.getOptions.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.onChange = this.onChange.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
        
        this.goNext = this.goNext.bind(this);

        this.goBack2 = this.goBack2.bind(this);
        this.goNext2 = this.goNext2.bind(this);

        this.goBack3 = this.goBack3.bind(this);
        this.goNext3 = this.goNext3.bind(this);

        this.goBack4 = this.goBack4.bind(this);
        this.goNext4 = this.goNext4.bind(this);

        this.goBack5 = this.goBack5.bind(this);

        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.errorClass = this.errorClass.bind(this);
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getFlights();
        this.props.getUser();
        this.props.getPilots();
        this.props.getStartplaces();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
        //if history.location.state is set (if someone likes to update a Flight), set the values of Form-Input-Field
        if( nextProps.flight && this.props.history.location.state!==undefined && this.props.history.location.state.flightID !== '' && this.props.history.location.state.flightID !== []){
            let currentFlight = nextProps.flight;

            if(currentFlight !==null || currentFlight !==undefined || currentFlight !==[]){
                //get the hours and minutes and set into state
                const akthour = Math.floor(Number(currentFlight.flighttime)/60);
                const aktminute = Number(currentFlight.flighttime)%60;
                this.setState({
                    valueHour: akthour,
                    valueMinute: aktminute,

                    flightID: this.props.history.location.state.flightID,
                    IDtoUpdate: this.props.history.location.state.flightID,
                    date: currentFlight.date,
                    startplace: currentFlight.startplace,
                    landingplace: currentFlight.landingplace,
                    flighttime: currentFlight.flighttime,
                    xcdistance: currentFlight.xcdistance,
                    description: currentFlight.description,
                    maxaltitude: currentFlight.maxaltitude,
                    heightgain: currentFlight.heightgain,
                    maxclimb: currentFlight.maxclimb,
                    startingtime: currentFlight.startingtime,
                    distance: currentFlight.distance,
                    imgUrl: currentFlight.imgUrl,
                    syrideLink: currentFlight.syrideLink,
                    xcontestLink: currentFlight.xcontestLink,
                    airtribuneLink: currentFlight.airtribuneLink,
                    weatherFoehndiagramm: currentFlight.weatherFoehndiagramm,
                    weatherWindBoden: currentFlight.weatherWindBoden,
                    weatherWind800m: currentFlight.weatherWind800m,
                    weatherWind1500m: currentFlight.weatherWind1500m,
                    weatherWind3000m: currentFlight.weatherWind3000m,
                    weatherRegtherm: currentFlight.weatherRegtherm,
                    weatherFronten: currentFlight.weatherFronten,
                    weatherSoaringmeteo: currentFlight.weatherSoaringmeteo,
                    weatherBisendiagramm: currentFlight.weatherBisendiagramm,
                });
            }
        }
    }

      validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let landingplaceValid = this.state.landingplaceValid;
        let startplaceValid = this.state.startplaceValid;
        let flighttimeValid = this.state.flighttimeValid;
        let dateValid = this.state.dateValid;
        let descriptionValid = this.state.descriptionValid;
        let xcdistanceValid = this.state.xcdistanceValid;
    
        switch(fieldName) {
          case 'landingplace':
            landingplaceValid = value.length <= 30;
            fieldValidationErrors.Landeplatz = landingplaceValid ? '' : ' is invalid';
            break;
          case 'date':
            dateValid = value.match(/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{4}$/i);
            fieldValidationErrors.Datum = dateValid ? '' : ' is invalid';
            break;
          case 'startplace':
            startplaceValid = (value !== '0');
            fieldValidationErrors.Startplatz = startplaceValid ? '' : ' is invalid';
            break;
          case 'valueHour' || 'valueMinute':
            flighttimeValid = (value !== '0');
            fieldValidationErrors.Flugzeit = flighttimeValid ? '' : ' is invalid';
            break;
        case 'description':
            console.log(value);
            descriptionValid = value.length > 0 && value.length <= 1000;
            fieldValidationErrors.Beschreibung = descriptionValid ? '' : ' is invalid';
            break;
        case 'xcdistance':
            xcdistanceValid = value.length !== 0 && !isNaN(value);
            fieldValidationErrors.Distanz = xcdistanceValid ? '' : ' is invalid';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        landingplaceValid: landingplaceValid,
                        dateValid: dateValid,
                        startplaceValid: startplaceValid,
                        flighttimeValid: flighttimeValid,
                        descriptionValid: descriptionValid,
                        xcdistanceValid: xcdistanceValid
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.landingplaceValid && this.state.dateValid && this.state.startplaceValid && this.state.flighttimeValid && this.state.descriptionValid && this.state.xcdistanceValid});
      }

      errorClass(error) {
        return(error.length === 0 ? '' : 'formular--error');
      }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
            console.log(name, value);
     };

    handleChangeDate(d) {
        if(d){
            this.setState({
                startDate: d,
                date: d._d.toLocaleDateString("de-ch",{
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              });
        }else{
            //TODO: else-case
            this.setState({
                date: ''},
                () => { this.validateField('date', 'false') 
              });
            console.log('startdate empty');
        }
      }

    goNext(e){
        e.preventDefault();
        let ftime = 0;

        if(Number(this.state.valueHour) > 0){
            ftime = (Number(this.state.valueHour)*60) + Number(this.state.valueMinute);
        }else{
            ftime = Number(this.state.valueMinute);
        }

        if(this.state.formValid){
            this.setState({
                form1: false,
                form2: true,
                form3: false,
                form4: false,
                form5: false,
                ani: 'form2',
                date: this.state.date,
                landingplace: this.state.landingplace,
                flighttime: ftime,
                xcdistance: this.state.xcdistance,
                description: this.state.description,
                formTitleH2: 'Weitere optionale Daten zum Flug.',
                validationTxt: ''
            });
        }else{
            //TODO: else-case
            console.log('not valid');
        }
    }

    goNext2(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: true,
            form4: false,
            form5: false,
            ani: 'form3',
            maxaltitude: this.state.maxaltitude,
            heightgain: this.state.heightgain,
            maxclimb: this.state.maxclimb,
            startingtime: this.state.startingtime,
            distance: this.state.distance,
            formTitleH2: 'Weitere optionale Daten zum Flug.'
        });
        console.log('weiter');
    }

    goBack2(e){
        e.preventDefault();
        this.setState({
            form1: true,
            form2: false,
            form3: false,
            form4: false,
            form5: false,
            ani: 'form1',
            formTitleH2: 'Erfasse deine Flugdaten.'
        });
    }

    goNext3(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: true,
            form5: false,
            ani: 'form4',
            imgUrl: this.state.imgUrl,
            formTitleH2: 'Weitere optionale Daten zum Flug.'
        });
    }

    goBack3(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: true,
            form3: false,
            form4: false,
            form5: false,
            ani: 'form2'
        });
    }

    goNext4(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: false,
            form5: true,
            ani: 'form5',
            imgUrl: this.state.imgUrl,
            formTitleH2: 'Screenshots zum Wetter hochladen.'
        });
    }

    goBack4(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: true,
            form4: false,
            form5: false,
            ani: 'form3'
        });
    }

    goBack5(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: false,
            form4: true,
            form5: false,
            ani: 'form4',
            formTitleH2: 'Weitere optionale Daten zum Flug.'
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log(this.state.date);
        let ftime = 0;
        if(Number(this.state.valueHour) > 0){
            ftime = (Number(this.state.valueHour)*60) + Number(this.state.valueMinute);
        }else{
            ftime = Number(this.state.valueMinute);
        }
        this.setState({
            flighttime: ftime,
            flightID: ''
        });

        obj = {
            pilot: this.props.user.email,
            pilotId: this.props.user.uid,
            date: this.state.date,
            startplace: this.state.startplace,
            landingplace: this.state.landingplace,
            flighttime: ftime,
            xcdistance: this.state.xcdistance,
            maxaltitude: this.state.maxaltitude,
            heightgain: this.state.heightgain,
            maxclimb: this.state.maxclimb,
            startingtime: this.state.startingtime,
            distance: this.state.distance,
            description: this.state.description,
            imgUrl: this.state.imgUrl,
            syrideLink: this.state.syrideLink,
            xcontestLink: this.state.xcontestLink,
            airtribuneLink: this.state.airtribuneLink,
            weatherFoehndiagramm: this.state.weatherFoehndiagramm,
            weatherWindBoden: this.state.weatherWindBoden,
            weatherWind800m: this.state.weatherWind800m,
            weatherWind1500m: this.state.weatherWind1500m,
            weatherWind3000m: this.state.weatherWind3000m,
            weatherRegtherm: this.state.weatherRegtherm,
            weatherFronten: this.state.weatherFronten,
            weatherSoaringmeteo: this.state.weatherSoaringmeteo,
            weatherBisendiagramm: this.state.weatherBisendiagramm,
            rating: this.state.rating,
        }

        //if there is set an ID to update a fligt -> "Speichern" means update. Otherwise save a new flight
        if(this.state.IDtoUpdate !== ''){
            this.props.updateFlights(this.state.IDtoUpdate, obj).then(this.props.dispatch(reset('NewPost')));
        }else{
            this.props.saveFlights(obj).then(this.props.dispatch(reset('NewPost')));
        }
        this.props.history.push(routes.LANDING);
    }

    getOptions(sp){
        const startplacesData = Object.keys(sp).map(i => sp[i]);
        const startplacesDatakey = Object.keys(sp);

        return startplacesData.map(function (item, index) {
                if(startplacesDatakey[index] === '0'){
                    return <option key={startplacesDatakey[index]} value={startplacesDatakey[index]}>Startplatz wählen</option>;
                }
                else{
                    return <option key={startplacesDatakey[index]} value={startplacesDatakey[index]}>{item.name}</option>;
                }
            });
    }

    goToPage(e){
        e.preventDefault();
        this.props.history.push(routes.STARTPLATZ_ERFASSEN);
    }

    componentWillUnmount() {
        this.setState({
            flightID: ''
        });
    }

    render() {
        console.log('form '+this.state.formValid);
        console.log('landingplace '+this.state.landingplaceValid);
        console.log('date ' + this.state.dateValid);
        console.log('startplace ' + this.state.startplaceValid);
        console.log('fligthttime ' + this.state.flighttime);
        const sp = this.props.startplaces;
        return ( 
            <main className="main">
                <section className="centered-layout">
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {this.state.ani}
                        />}
                        classes = 'centered-layout__header'
                        pageTitle = 'Pilotenseite'
                        titleH2 = {this.state.formTitleH2}
                    />
                <ReactTransitionGroup component="div" className="formular-wrapper">
                {this.state.form1 &&
                    <FlugdatenForm1 
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        goNext={this.goNext}
                        valueHour={this.state.valueHour}
                        valueMinute={this.state.valueMinute}
                        nameHour={this.state.nameHour}
                        nameMinute={this.state.nameMinute}
                        nameComment={this.state.nameComment}
                        valueComment={this.state.description}
                        ani={this.state.ani} 
                        getOptions={this.getOptions(sp)}
                        nameSP={this.state.nameStartplace}
                        selectedValueSP={this.state.startplace}
                        goToPage={this.goToPage}
                        valueLandeplatz={this.state.landingplace}
                        valueXcdistance={this.state.xcdistance}
                        startDate={this.state.startDate}
                        handleChange={this.handleChangeDate}
                        onChangeDate={this.onChange}
                        classNameDate={`formular__input-wrapper ${this.errorClass(this.state.formErrors.Datum)}`}
                        classNameDateLP={`formular__input-wrapper ${this.errorClass(this.state.formErrors.Landeplatz)}`}
                        classNameDateFT={`formular__input-wrapper ${this.errorClass(this.state.formErrors.Flugzeit)}` }
                        classNameSP={`formular__input-wrapper ${this.errorClass(this.state.formErrors.Startplatz)}`}
                        classNameDescription={`formular__input-wrapper formular__input--text ${this.errorClass(this.state.formErrors.Beschreibung)}`}
                        classNameXcdistance={`formular__input-wrapper ${this.errorClass(this.state.formErrors.Distanz)}`}
                    /> }
                </ReactTransitionGroup> 
                <ReactTransitionGroup component="div" className="formular-wrapper">
                    {this.state.form2 &&
                    <FlugdatenForm2 
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        goBack={this.goBack2}
                        goNext={this.goNext2}
                        ani2={this.state.ani}
                        valueMaxaltitude={this.state.maxaltitude}
                        valueHeightgain={this.state.heightgain}
                        valueMaxclimb={this.state.maxclimb}
                        valueStartingtime={this.state.startingtime}
                        valueDistance={this.state.distance}
                    />}
                </ReactTransitionGroup> 
                <ReactTransitionGroup component="div" className="formular-wrapper">
                    {this.state.form3 &&
                    <FlugdatenForm3 
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        goBack={this.goBack3}
                        goNext={this.goNext3}
                        ani3={this.state.ani}
                        valueImgUrl={this.state.imgUrl}

                    />}
                </ReactTransitionGroup> 
                <ReactTransitionGroup component="div" className="formular-wrapper">
                    {this.state.form4 &&
                    <FlugdatenForm4 
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        goBack={this.goBack4}
                        goNext={this.goNext4}
                        ani4={this.state.ani}
                        valueSyrideLink={this.state.syrideLink}
                        valueXcontestLink={this.state.xcontestLink}
                        valueAirtribuneLink={this.state.airtribuneLink}
                    />}
                </ReactTransitionGroup> 
                <ReactTransitionGroup component="div" className="formular-wrapper">
                    {this.state.form5 &&
                    <FlugdatenForm5 
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        goBack={this.goBack5}
                        ani5={this.state.ani}
                        valueWeatherFoehndiagramm={this.state.weatherFoehndiagramm}
                        valueWeatherWindBoden={this.state.weatherWindBoden}
                        valueWeatherWind800m={this.state.weatherWind800m}
                        valueWeatherWind1500m={this.state.weatherWind1500m}
                        valueWeatherWind3000m={this.state.weatherWind3000m}
                        valueWeatherRegtherm={this.state.weatherRegtherm}
                        valueWeatherFronten={this.state.weatherFronten}
                        valueWeatherSoaringmeteo={this.state.weatherSoaringmeteo}
                        valueWeatherBisendiagramm={this.state.weatherBisendiagramm}
                    />}
                </ReactTransitionGroup> 
                <FormErrors formErrors={this.state.formErrors} />
             </section>
           </main>
        );
    }
}

let flightform = reduxForm({
    form: 'NewPost'
  })(FlugdatenFormContainer);

  flightform = connect((state, props) => {
      let key = '';
      if(props.history.location.state){
         key = props.history.location.state.flightID;
      }else{
          key = '';
      }
    
    return {
          flight: _.find(state.flights, { id: key }),
          user: state.user,
          pilots: state.pilots,
          startplaces: state.startplaces
    };
}, { saveFlights, getFlights, deleteFlights, getUser, updateFlights, getPilots, getStartplaces })(flightform);

export default withRouter(flightform);
