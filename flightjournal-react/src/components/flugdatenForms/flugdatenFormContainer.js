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
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
import FormErrorAlert from '../formErrorAlert/formErrorAlert';

let obj = {};
let minute = 0;
let hour = 0;

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

          formErrors: {landingplace: '', date: '', startplace: '', flighttime: '', valueHour: '', valueMinute: '', description: '', xcdistance: '', maxaltitude: '', heightgain: '', maxclimb: '', startingtime: '', distance: '', imgUrl:'', syrideLink: '', xcontestLink: '', airtribuneLink: '',weatherFoehndiagramm: '', weatherWindBoden: '', weatherWind800m: '', weatherWind1500m: '', weatherWind3000m: '', weatherRegtherm: '', weatherFronten: '', weatherSoaringmeteo: '', weatherBisendiagramm: ''},
          formErrorsValid: {landingplace: false, date: true, startplace: false, flighttime: false, description: false, xcdistance: true, maxaltitude: true, heightgain: true, maxclimb: true, startingtime: true, distance: true, imgUrl: true, syrideLink: true, xcontestLink: true, airtribuneLink: true, weatherFoehndiagramm: true, weatherWindBoden: true, weatherWind800m: true, weatherWind1500m: true, weatherWind3000m: true, weatherRegtherm: true, weatherFronten: true, weatherSoaringmeteo: true, weatherBisendiagramm: true},
          //form1
          landingplaceValid: false,
          dateValid: true,
          startplaceValid: false,
          formValid: false, 
          flighttimeValid: false,
          descriptionValid: false,
          xcdistanceValid: true,
          //form2
          maxaltitudeValid: true, 
          heightgainValid: true,
          maxclimbValid: true, 
          startingtimeValid: true, 
          distanceValid: true,
          //form3
          imgUrlValid: true,
          //form4
          syrideLinkValid: true,
          xcontestLinkValid: true,
          airtribuneLinkValid: true,
          //form5
          weatherFoehndiagrammValid: true,
          weatherWindBodenValid: true,
          weatherWind800mValid: true,
          weatherWind1500mValid: true,
          weatherWind3000mValid: true,
          weatherRegthermValid: true,
          weatherFrontenValid: true,
          weatherSoaringmeteoValid: true,
          weatherBisendiagrammValid: true,

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
        //form2
        let maxaltitudeValid = this.state.maxaltitudeValid;
        let heightgainValid = this.state.heightgainValid;
        let maxclimbValid = this.state.maxclimbValid;
        let startingtimeValid = this.state.startingtimeValid;
        let distanceValid = this.state.distanceValid;
        //form3
        let imgUrlValid = this.state.imgUrlValid
        //form4
        let syrideLinkValid = this.state.syrideLinkValid
        let xcontestLinkValid = this.state.xcontestLinkValid
        let airtribuneLinkValid = this.state.airtribuneLinkValid
        //form4
        let weatherFoehndiagrammValid = this.state.weatherFoehndiagrammValid
        let weatherWindBodenValid = this.state.weatherWindBodenValid
        let weatherWind800mValid = this.state.weatherWind800mValid
        let weatherWind1500mValid = this.state.weatherWind1500mValid
        let weatherWind3000mValid = this.state.weatherWind3000mValid
        let weatherRegthermValid = this.state.weatherRegthermValid
        let weatherFrontenValid = this.state.weatherFrontenValid
        let weatherSoaringmeteoValid = this.state.weatherSoaringmeteoValid
        let weatherBisendiagrammValid = this.state.weatherBisendiagrammValid

        switch(fieldName) {
          case 'landingplace':
            landingplaceValid = value.length > 0 && value.length <= 50 && value !== '' && (typeof value === 'string');
            fieldValidationErrors.landingplace = landingplaceValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess50}.`;
            break;
          case 'date':
            dateValid = (/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{4}$/i).test(this.state.date);
            fieldValidationErrors.date = dateValid ? '' : `${validation.valField} ${validation.valDate}.`;
            break;
          case 'startplace':
            startplaceValid = value.length > 0 && value.length <= 50 && (typeof value === 'string') && value !== '0';
            fieldValidationErrors.startplace = startplaceValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess50}.`;
            break;
          case 'flighttime':
            flighttimeValid = value !== 0 && !isNaN(value);
            fieldValidationErrors.flighttime = flighttimeValid ? '' : `${validation.valField} ${validation.valEmpty}.`;
            break;
        case 'description':
            descriptionValid = value.length > 0 && value.length <= 1000 && (typeof value === 'string');
            fieldValidationErrors.description = descriptionValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess1000}.`;
            break;
        case 'xcdistance':
            xcdistanceValid = value.length === 0 || (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.xcdistance = xcdistanceValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        //form2
        case 'maxaltitude':
            maxaltitudeValid = value.length === 0 || (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.maxaltitude = maxaltitudeValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        case 'heightgain':
            heightgainValid = value.length === 0 || (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.heightgain = heightgainValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        case 'maxclimb':
            maxclimbValid = value.length === 0 || (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.maxclimb = maxclimbValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        case 'startingtime':
            startingtimeValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.startingtime = startingtimeValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        case 'distance':
            distanceValid = value.length === 0 || (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.distance = distanceValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        //form3
        case 'imgUrl':
            imgUrlValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.imgUrl = imgUrlValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        //form4
        case 'syrideLink':
            syrideLinkValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.syrideLink = syrideLinkValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'xcontestLink':
            xcontestLinkValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.xcontestLink = xcontestLinkValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'airtribuneLink':
            airtribuneLinkValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.airtribuneLink = airtribuneLinkValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        //form5
        case 'weatherFoehndiagramm':
            weatherFoehndiagrammValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherFoehndiagramm = weatherFoehndiagrammValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherWindBoden':
            weatherWindBodenValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherWindBoden = weatherWindBodenValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherWind800m':
            weatherWind800mValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherWind800m = weatherWind800mValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherWind1500m':
            weatherWind1500mValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherWind1500m = weatherWind1500mValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherWind3000m':
            weatherWind3000mValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherWind3000m = weatherWind3000mValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherRegtherm':
            weatherRegthermValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherRegtherm = weatherRegthermValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherFronten':
            weatherFrontenValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherFronten = weatherFrontenValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherSoaringmeteo':
            weatherSoaringmeteoValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherSoaringmeteo = weatherSoaringmeteoValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
        case 'weatherBisendiagramm':
            weatherBisendiagrammValid = value.length === 0 || (value.length <= 50 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.weatherBisendiagramm = weatherBisendiagrammValid ? '' : `${validation.valField} ${validation.valLess50}.`;
            break;
          default:
            break;
        }
        this.setState({ formErrorsValid: {
            landingplace: landingplaceValid, 
            date: dateValid, 
            startplace: startplaceValid, 
            flighttime: flighttimeValid, 
            description: descriptionValid, 
            xcdistance: xcdistanceValid, 
            maxaltitude: maxaltitudeValid,
            heightgain: heightgainValid,
            maxclimb: maxclimbValid,
            startingtime: startingtimeValid,
            distance: distanceValid,
            imgUrl: imgUrlValid,
            syrideLink: syrideLinkValid,
            xcontestLink: xcontestLinkValid,
            airtribuneLink: airtribuneLinkValid,
            weatherFoehndiagramm: weatherFoehndiagrammValid,
            weatherWindBoden: weatherWindBodenValid,
            weatherWind800m: weatherWind800mValid,
            weatherWind1500m: weatherWind1500mValid,
            weatherWind3000m: weatherWind3000mValid,
            weatherRegtherm: weatherRegthermValid,
            weatherFronten: weatherFrontenValid,
            weatherSoaringmeteo: weatherSoaringmeteoValid,
            weatherBisendiagramm: weatherBisendiagrammValid
        },
                        landingplaceValid: landingplaceValid,
                        dateValid: dateValid,
                        startplaceValid: startplaceValid,
                        flighttimeValid: flighttimeValid,
                        descriptionValid: descriptionValid,
                        xcdistanceValid: xcdistanceValid,
                        maxaltitudeValid: maxaltitudeValid,
                        heightgainValid: heightgainValid,
                        maxclimbValid: maxclimbValid,
                        startingtimeValid: startingtimeValid,
                        distanceValid: distanceValid,
                        imgUrlValid: imgUrlValid,
                        syrideLinkValid: syrideLinkValid,
                        xcontestLinkValid: xcontestLinkValid,
                        airtribuneLinkValid: airtribuneLinkValid,
                        weatherFoehndiagrammValid: weatherFoehndiagrammValid,
                        weatherWindBodenValid: weatherWindBodenValid,
                        weatherWind800mValid: weatherWind800mValid,
                        weatherWind1500mValid: weatherWind1500mValid,
                        weatherWind3000mValid: weatherWind3000mValid,
                        weatherRegthermValid: weatherRegthermValid,
                        weatherFrontenValid: weatherFrontenValid,
                        weatherSoaringmeteoValid: weatherSoaringmeteoValid,
                        weatherBisendiagrammValid: weatherBisendiagrammValid,
                      }, this.validateForm);
      } 
    
      validateForm() {
        this.setState({formValid: this.state.landingplaceValid && 
            this.state.dateValid && 
            this.state.startplaceValid && 
            this.state.flighttimeValid && 
            this.state.descriptionValid && 
            this.state.xcdistanceValid &&
            this.state.maxaltitudeValid &&
            this.state.heightgainValid &&
            this.state.maxclimbValid &&
            this.state.startingtimeValid &&
            this.state.distanceValid &&
            this.state.imgUrlValid &&
            this.state.syrideLinkValid &&
            this.state.xcontestLinkValid &&
            this.state.airtribuneLinkValid &&
            this.state.weatherFoehndiagrammValid &&
            this.state.weatherWindBodenValid &&
            this.state.weatherWind800mValid &&
            this.state.weatherWind1500mValid &&
            this.state.weatherWind3000mValid &&
            this.state.weatherRegthermValid &&
            this.state.weatherFrontenValid &&
            this.state.weatherSoaringmeteoValid &&
            this.state.weatherBisendiagrammValid,
        });
      }

      errorClass(error) {
        return(error.length === 0 ? '' : 'formular--error');
      }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        let ftime = 0;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });

        //validate flighttime on change
        //TODO: make it as function - i use the same in onSubmit
        if(name === 'valueMinute' || name === 'valueHour'){
            if(name === 'valueMinute'){
                minute = Number(value);
             }  else if(name === 'valueHour'){
                hour = Number(value*60);
             }
             ftime = hour + minute;
             this.setState({
                flighttime: ftime},
                () => { this.validateField('flighttime', ftime) 
              });
        }
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
              },
              () => { this.validateField('date', d._d.toLocaleDateString("de-ch",{
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })) 
            });
        }else{
            this.setState({
                date: ''},
                () => { this.validateField('date', 'false') 
              });
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
        this.setState({flighttime: ftime},
            () => { this.validateField('flighttime', ftime) 
          })
        if(this.state.formValid){
            this.setState({
                errorAlert: false,
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
            this.setState({errorAlert: true})
             Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
                    this.errorClass(this.state.formErrors[fieldName]);
                    this.validateField(fieldName, this.state[fieldName]);
                    return '';
        });
    }}

    goNext2(e){
        e.preventDefault();
        if(this.state.formValid){
            this.setState({
                errorAlert: false,
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
                formTitleH2: 'Bilder hochladen.'
            });
        }else{
            this.setState({errorAlert: true})
                Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
                    this.errorClass(this.state.formErrors[fieldName]);
                    this.validateField(fieldName, this.state[fieldName]);
                    return '';
        });
    }
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
            formTitleH2: 'Erfasse deine Flugdaten.',
        });
    }

    goNext3(e){
        e.preventDefault();
        if(this.state.formValid){
            this.setState({
                errorAlert: false,
                form1: false,
                form2: false,
                form3: false,
                form4: true,
                form5: false,
                ani: 'form4',
                imgUrl: this.state.imgUrl,
                formTitleH2: 'Links zu anderen Flugplatformen.'
        });
        }else{
            console.log('dfdf');
            this.setState({errorAlert: true})
                Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
                    this.errorClass(this.state.formErrors[fieldName]);
                    this.validateField(fieldName, this.state[fieldName]);
                    return '';
        });
        }
    }

    goBack3(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: true,
            form3: false,
            form4: false,
            form5: false,
            ani: 'form2',
            formTitleH2: 'Weitere optionale Daten zum Flug.'
        });
    }

    goNext4(e){
        e.preventDefault();
        if(this.state.formValid){
            this.setState({
                errorAlert: false,
                form1: false,
                form2: false,
                form3: false,
                form4: false,
                form5: true,
                ani: 'form5',
                imgUrl: this.state.imgUrl,
                formTitleH2: 'Screenshots zum Wetter hochladen.'
            });
        }else{
            console.log('dfdf');
            this.setState({errorAlert: true})
                Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
                    this.errorClass(this.state.formErrors[fieldName]);
                    this.validateField(fieldName, this.state[fieldName]);
                    return '';
        });
        }
    }

    goBack4(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: true,
            form4: false,
            form5: false,
            ani: 'form3',
            formTitleH2: 'Bilder hochladen.'
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
            formTitleH2: 'Links zu anderen Flugplatformen.'
        });
    }

    onSubmit(e){
        e.preventDefault();
        let ftime = 0;
        if(Number(this.state.valueHour) > 0){
            ftime = (Number(this.state.valueHour)*60) + Number(this.state.valueMinute);
        }else{
            ftime = Number(this.state.valueMinute);
        }
        this.setState({flighttime: ftime, flightID: ''},
            () => { this.validateField('flighttime', ftime) 
          })
        if(this.state.formValid){
         this.setState({errorAlert: false})
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
    }else{
        this.setState({errorAlert: true})
        Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
               this.errorClass(this.state.formErrors[fieldName]);
               this.validateField(fieldName, this.state[fieldName]);
               return '';
         });
        }
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
        console.log(this.state.formValid)
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
                        classNameDate={`formular__input-wrapper ${this.errorClass(this.state.formErrors.date)}`}
                        classNameDateLP={`formular__input-wrapper ${this.errorClass(this.state.formErrors.landingplace)}`}
                        classNameDateFT={`formular__input-wrapper ${this.errorClass(this.state.formErrors.flighttime)}` }
                        classNameSP={`formular__input-wrapper ${this.errorClass(this.state.formErrors.startplace)}`}
                        classNameDescription={`formular__input-wrapper formular__input--text ${this.errorClass(this.state.formErrors.description)}`}
                        classNameXcdistance={`formular__input-wrapper ${this.errorClass(this.state.formErrors.xcdistance)}`}
                        errorMessageLP={this.state.formErrors.landingplace}
                        errorMessageST={this.state.formErrors.startplace}
                        errorMessageDate={this.state.formErrors.date}
                        errorMessageFT={this.state.formErrors.flighttime}
                        errorMessageXC={this.state.formErrors.xcdistance}
                        errorMessageDesc={this.state.formErrors.description}
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
                        classNamemaxaltitude={`formular__input-wrapper ${this.errorClass(this.state.formErrors.maxaltitude)}`}
                        classNameheightgain={`formular__input-wrapper margin-top-0 ${this.errorClass(this.state.formErrors.heightgain)}`}
                        classNamemaxclimb={`formular__input-wrapper ${this.errorClass(this.state.formErrors.maxclimb)}`}
                        classNamestartingtime={`formular__input-wrapper ${this.errorClass(this.state.formErrors.startingtime)}`}
                        classNamedistance={`formular__input-wrapper ${this.errorClass(this.state.formErrors.distance)}`}
                        errorMessagemaxaltitude={this.state.formErrors.maxaltitude}
                        errorMessageheightgain={this.state.formErrors.heightgain}
                        errorMessagemaxclimp={this.state.formErrors.maxclimb}
                        errorMessagestartingtime={this.state.formErrors.startingtime}
                        errorMessagedistance={this.state.formErrors.distance}
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
                        classNameimgUrl={`formular__input-wrapper formular__input-wrapper--centered ${this.errorClass(this.state.formErrors.imgUrl)}`}
                        errorMessageimgUrl={this.state.formErrors.imgUrl}
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
                        classNameSyrideLink={`formular__input-wrapper ${this.errorClass(this.state.formErrors.syrideLink)}`}
                        classNameXcontestLink={`formular__input-wrapper margin-top-0 ${this.errorClass(this.state.formErrors.xcontestLink)}`}
                        classNameAirtribuneLink={`formular__input-wrapper ${this.errorClass(this.state.formErrors.airtribuneLink)}`}
                        errorMessageSyrideLink={this.state.formErrors.syrideLink}
                        errorMessageXcontestLink={this.state.formErrors.xcontestLink}
                        errorMessageAirtribuneLink={this.state.formErrors.airtribuneLink}
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
                        classNameweatherFoehndiagramm={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherFoehndiagramm)}`}
                        classNamevalueWeatherWindBoden={`formular__input-wrapper margin-top-0 ${this.errorClass(this.state.formErrors.weatherWindBoden)}`}
                        classNameweatherWind800m={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherWind800m)}`}
                        classNameweatherWind1500m={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherWind1500m)}`}
                        classNameweatherWind3000m={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherWind3000m)}`}
                        classNameweatherRegtherm={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherRegtherm)}`}
                        classNameweatherFronten={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherFronten)}`}
                        classNameweatherSoaringmeteo={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherSoaringmeteo)}`}
                        classNameweatherBisendiagramm={`formular__input-wrapper ${this.errorClass(this.state.formErrors.weatherBisendiagramm)}`}
                        errorMessageWeatherFoehndiagramm={this.state.formErrors.weatherFoehndiagramm}
                        errorMessageWeatherWindBoden={this.state.formErrors.weatherWindBoden}
                        errorMessageWeatherWind800m={this.state.formErrors.weatherWind800m}
                        errorMessageWeatherWind1500m={this.state.formErrors.weatherWind1500m}
                        errorMessageWeatherWind3000m={this.state.formErrors.weatherWind3000m}
                        errorMessageWeatherRegtherm={this.state.formErrors.weatherRegtherm}
                        errorMessageWeatherFronten={this.state.formErrors.weatherFronten}
                        errorMessageWeatherSoaringmeteo={this.state.formErrors.weatherSoaringmeteo}
                        errorMessageWeatherBisendiagramm={this.state.formErrors.weatherBisendiagramm}
                    />}
                </ReactTransitionGroup> 
                {this.state.errorAlert && <FormErrorAlert>{validation.valForm}</FormErrorAlert>}
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
