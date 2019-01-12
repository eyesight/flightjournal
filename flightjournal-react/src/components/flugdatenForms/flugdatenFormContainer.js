import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { getFlights, saveFlights, deleteFlights, updateFlights } from '../../actions/FlightActions';
import { getStartplaces } from '../../actions/StartplacesActions';
import { getUser } from '../../actions/UserActions';
import { getPilots } from '../../actions/PilotActions';
import { getParagliders } from '../../actions/ParaglidersActions';
import * as routes from '../../constants/routes';
import ReactTransitionGroup from 'react-addons-transition-group';
import FlugdatenForm1 from './flugdatenForm1';
import FlugdatenForm2 from './flugdatenForm2';
import FlugdatenForm3 from './flugdatenForm3';
import FlugdatenForm4 from './flugdatenForm4';
import BackButton from './../backButton/backButton';
import  _ from 'lodash';
import moment from 'moment';
import 'moment/locale/de-ch'
import 'react-datepicker/dist/react-datepicker.css';
import * as validation from '../../utils/validationText';
import { updateLastUpdateArray } from '../../utils/updateLastUpdateArray';
import { compare } from '../../utils/compare';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
import FormErrorAlert from '../formErrorAlert/formErrorAlert';
import firebase from 'firebase';

let obj = {};
let minute = 0;
let hour = 0;
let minuteSZ = 0;
let hourSZ = 0;
//TODO: better solution for image-upload
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
          flightId: '',
          IDtoUpdate: '',
          formTitleH2: 'Erfasse deine Flugdaten.',
          activePilot: [],
          
          //validation-states
          validationTxt: '',
          errorAlert: false,

          formErrors: {landingplace: '', date: '', startplace: '', flighttime: '', valueHour: '', valueMinute: '', description: '', xcdistance: '', maxaltitude: '', heightgain: '', maxclimb: '', startingtime: '', distance: '', imgUrl:'', syrideLink: '', xcontestLink: '', airtribuneLink: '', weatherDescription: '', maxsink: '', paragliders: ''},
          formErrorsValid: {landingplace: false, date: true, startplace: false, flighttime: false, description: false, xcdistance: true, maxaltitude: true, heightgain: true, maxclimb: true, maxsink: true, startingtime: true, distance: true, imgUrl: true, syrideLink: true, xcontestLink: true, airtribuneLink: true, weatherDescription: true, paragliders: true},
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
          maxsinkValid: true,
          startingtimeValid: true, 
          weatherDescriptionValid: true, 
          distanceValid: true,
          paraglidersValid: true,
          //form3
          imgUrlValid: true,
          pictures: [],
          flightPictureURL: [],
          errorMessageImage: '',
          successPreview: false,
          progress: [],
          renderImageUploader: true,
          renderButtonSave: false,
          renderButtons: true,
          renderButtonNext: true, 
          renderButtonClose: false,
          renderButtonSaveClose: false,
          progressObj: [],
          previewUrl: [],
          uploadfinished: false,
          clickedOnWeiterBtn: false,
          clickedOnCloseBtn: false,
          classNameBackButton: 'button',
          checkifImageFinished: [],
          //form4
          syrideLinkValid: true,
          xcontestLinkValid: true,
          airtribuneLinkValid: true,

          //states for the flighttime and the names of inputfields
          valueHour:'',
          valueMinute: '',
          nameHour: 'valueHour',
          nameMinute: 'valueMinute',
          nameComment: 'description',
          nameStartplace: 'startplace',
          nameParagliders: 'paragliders',
          nameWeatherDescription: 'weatherDescription',
          
          valueStartHour:'',
          valueStartMinute: '',
          nameStartHour: 'valueStartHour',
          nameStartMinute: 'valueStartMinute',
          
          //data for database
          date: '',
          description: '',
          startplace: {},
          startplace2: {},
          landingplace: '',
          landingplaceLink: '',
          flighttime: '',
          xcdistance: '',
          maxaltitude: '',
          heightgain:'',
          maxclimb: '',
          maxsink: '',
          startingtime:'',
          distance: '',
          imgUrl: [''],
          imgName: [''],
          syrideLink: '',
          xcontestLink: '',
          airtribuneLink: '',
          weatherDescription: '',
          rating: '',
          writeDate: '',
          lastUpdate: '',
          paraglider: {},
          paragliders2: {}
        };

        this.getOptionsGlider = this.getOptionsGlider.bind(this);
        this.getOptionsStartplace = this.getOptionsStartplace.bind(this);
        this.getOptionsTime = this.getOptionsTime.bind(this);
        this.getOptionsStartTime = this.getOptionsStartTime.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.onChange = this.onChange.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.abort = this.abort.bind(this);
        
        this.goNext = this.goNext.bind(this);

        this.goBack2 = this.goBack2.bind(this);
        this.goNext2 = this.goNext2.bind(this);

        this.goBack3 = this.goBack3.bind(this);
        this.goNext3 = this.goNext3.bind(this);
        this.goNext3_setState = this.goNext3_setState.bind(this);
        this.onSubmitImageUploadClose = this.onSubmitImageUploadClose.bind(this);

        this.goBack4 = this.goBack4.bind(this);
        this.goNext4 = this.goNext4.bind(this);

        this.handleChangeDate = this.handleChangeDate.bind(this);

        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.errorClass = this.errorClass.bind(this);
        
        this.onChangeImgUpload = this.onChangeImgUpload.bind(this);
        this.onSubmitImgUpload = this.onSubmitImgUpload.bind(this);
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getFlights();
        this.props.getUser();
        this.props.getPilots();
        this.props.getStartplaces();
        this.props.getParagliders();
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.uid === undefined) {
            this.props.history.replace(routes.LANDING);
        }
        //set data of active pilot
        for(let i = 0; i<nextProps.pilots.length; i++){
            if(nextProps.pilots && nextProps.user.email === nextProps.pilots[i].email){
                this.setState({
                    activePilot: this.props.pilots[i],
                    paragliders: nextProps.pilots[i].paraglider
                }) 
            }
        }
        //if history.location.state is set (if someone likes to update a Flight), set the values of Form-Input-Field       
        if( nextProps.flight && nextProps.flight.pilot.pilotId !== undefined && nextProps.flight.pilot.email === nextProps.user.email){
            let currentFlight = nextProps.flight;
            if(currentFlight !==null || currentFlight !==undefined || currentFlight !==[]){
                //get the hours and minutes and set into state
                const akthour = Math.floor(Number(currentFlight.flighttime)/60);
                const aktminute = Number(currentFlight.flighttime)%60;

                //get the hours and minutes and set into state
                const akthourstart = Math.floor(Number(currentFlight.startingtime)/60);
                const aktminutestart = Number(currentFlight.startingtime)%60;

                //convert date-string to dateobject for the datepicker
                let dateParts = currentFlight.date.split(".");
                let dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);  
                this.setState({
                    valueHour: akthour,
                    valueMinute: aktminute,

                    valueStartHour: akthourstart,
                    valueStartMinute: aktminutestart,

                    flightId: nextProps.flight.id,
                    IDtoUpdate: nextProps.flight.id,
                    date: currentFlight.date,
                    startDate: moment(dateObject),
                    startplace: _.values(currentFlight.startplace).join(' '),
                    startplace2: currentFlight.startplace,
                    landingplace: currentFlight.landingplace,
                    flighttime: currentFlight.flighttime,
                    xcdistance: currentFlight.xcdistance,
                    description: currentFlight.description,
                    paragliders: currentFlight.paraglider.id,
                    paragliders2: currentFlight.paraglider,
                    maxaltitude: currentFlight.maxaltitude,
                    heightgain: currentFlight.heightgain,
                    maxclimb: currentFlight.maxclimb,
                    maxsink: currentFlight.maxsink,
                    startingtime: currentFlight.startingtime,
                    distance: currentFlight.distance,
                    imgUrl: currentFlight.imgUrl,
                    imgName: currentFlight.imgName,
                    syrideLink: currentFlight.syrideLink,
                    xcontestLink: currentFlight.xcontestLink,
                    airtribuneLink: currentFlight.airtribuneLink,
                    weatherDescription: currentFlight.weatherDescription,
                    writeDate: currentFlight.writeDate,
                    lastUpdate: currentFlight.lastUpdate,

                    //set state of forminput
                    //TODO: find a better solution
                    landingplaceValid: true,
                    startplaceValid: true,
                    paraglidersValid: true,
                    formValid: true, 
                    flighttimeValid: true,
                    descriptionValid: true,
                    weatherDescriptionValid: true,
                    xcdistanceValid: true,
                });
            }
        }else{
            //add actual date, if it's the first input
            this.setState({
                date: new Date().toLocaleDateString("de-ch",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }),
                writeDate: new Date().toLocaleDateString("de-ch",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
            })
        }
    }

    componentDidUpdate(){
        //update state to jump to next page, only when images-upload is finished (when goNext3 is called and images have to be uploaded)
        if(this.state.uploadfinished === true && this.state.clickedOnWeiterBtn === true){
            this.setState({
                clickedOnWeiterBtn: false,
                renderButtonSaveClose: false
            });
            this.goNext3_setState(true);
        }

        if(this.state.uploadfinished === true && this.state.clickedOnCloseBtn === true){
            this.setState({
                clickedOnCloseBtn: false,
                renderButtonSaveClose: false,
                renderButtons: false
            });
            this.onSubmit();
        }
    }
    //TODO: Validation for Links and set and test it on the right places!
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
        let maxsinkValid = this.state.maxsinkValid;
        let startingtimeValid = this.state.startingtimeValid;
        let distanceValid = this.state.distanceValid;
        let weatherDescriptionValid = this.state.weatherDescriptionValid;
        let paraglidersValid = this.state.paraglidersValid;
        //form3
        let imgUrlValid = this.state.imgUrlValid
        //form4
        let syrideLinkValid = this.state.syrideLinkValid
        let xcontestLinkValid = this.state.xcontestLinkValid
        let airtribuneLinkValid = this.state.airtribuneLinkValid
        switch(fieldName) {
            case 'landingplace':
            landingplaceValid = value.length > 0 && value.length <= 150 && value !== '' && (typeof value === 'string');
            fieldValidationErrors.landingplace = landingplaceValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess150}.`;
            break;
            case 'date':
            dateValid = (/^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{4}$/i).test(this.state.date);
            fieldValidationErrors.date = dateValid ? '' : `${validation.valField} ${validation.valDate}.`;
            break;
            case 'startplace': 
            startplaceValid = value.length > 0 && value.length <= 150 && (typeof value === 'string') && value !== '0';
            fieldValidationErrors.startplace = startplaceValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess150}.`;
            break;
            case 'flighttime':
            flighttimeValid = value !== 0 && !isNaN(value);
            fieldValidationErrors.flighttime = flighttimeValid ? '' : `${validation.valField} ${validation.valEmpty}.`;
            break;
        case 'description':
            descriptionValid = value.length > 0 && value.length <= 5000 && (typeof value === 'string');
            fieldValidationErrors.description = descriptionValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess5000}.`;
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
        case 'maxsink':
            maxsinkValid = value.length === 0 || (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.maxsink = maxsinkValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        case 'startingtime':
            startingtimeValid = value === 0 || !isNaN(value);
            fieldValidationErrors.startingtime = startingtimeValid ? '' : `${validation.valField} ${validation.valNumber}.`;
            break;
        case 'distance':
            distanceValid = value.length === 0 || (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.distance = distanceValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        case 'weatherDescription':
            weatherDescriptionValid = value.length === 0 || (value.length > 1 && value.length <= 5000 && (typeof value === 'string'));
            fieldValidationErrors.weatherDescription = weatherDescriptionValid ? '' : `${validation.valField} ${validation.valLess5000}.`;
            break;
        case 'paragliders':
            paraglidersValid = value.length === 0 || (value.length <= 150 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.paragliders = paraglidersValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess150}.`;
            break;
        //form3
        case 'imgUrl':
            imgUrlValid = value.length === 0 || (value.length <= 150 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.imgUrl = imgUrlValid ? '' : `${validation.valField} ${validation.valLess150}.`;
            break;
        //form4
        case 'syrideLink':
            syrideLinkValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.syrideLink = syrideLinkValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'xcontestLink':
            xcontestLinkValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.xcontestLink = xcontestLinkValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'airtribuneLink':
            airtribuneLinkValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.airtribuneLink = airtribuneLinkValid ? '' : `${validation.valField} ${validation.valLess200}.`;
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
            paragliders: paraglidersValid,
            xcdistance: xcdistanceValid, 
            maxaltitude: maxaltitudeValid,
            heightgain: heightgainValid,
            maxclimb: maxclimbValid,
            maxsink: maxsinkValid,
            startingtime: startingtimeValid,
            distance: distanceValid,
            imgUrl: imgUrlValid,
            syrideLink: syrideLinkValid,
            xcontestLink: xcontestLinkValid,
            airtribuneLink: airtribuneLinkValid,
            weatherDescription: weatherDescriptionValid
            },
                        landingplaceValid: landingplaceValid,
                        dateValid: dateValid,
                        startplaceValid: startplaceValid,
                        flighttimeValid: flighttimeValid,
                        descriptionValid: descriptionValid,
                        paraglidersValid: paraglidersValid,
                        xcdistanceValid: xcdistanceValid,
                        maxaltitudeValid: maxaltitudeValid,
                        heightgainValid: heightgainValid,
                        maxclimbValid: maxclimbValid,
                        maxsinkValid: maxsinkValid,
                        startingtimeValid: startingtimeValid,
                        distanceValid: distanceValid,
                        imgUrlValid: imgUrlValid,
                        syrideLinkValid: syrideLinkValid,
                        xcontestLinkValid: xcontestLinkValid,
                        airtribuneLinkValid: airtribuneLinkValid,
                        weatherDescriptionValid: weatherDescriptionValid
                        }, this.validateForm);
    } 

    validateForm() {
        this.setState({formValid: this.state.landingplaceValid && 
            this.state.dateValid && 
            this.state.startplaceValid && 
            this.state.flighttimeValid && 
            this.state.descriptionValid && 
            this.state.paraglidersValid &&
            this.state.xcdistanceValid &&
            this.state.maxaltitudeValid &&
            this.state.heightgainValid &&
            this.state.maxclimbValid &&
            this.state.maxsinkValid &&
            this.state.startingtimeValid &&
            this.state.distanceValid &&
            this.state.imgUrlValid &&
            this.state.syrideLinkValid &&
            this.state.xcontestLinkValid &&
            this.state.airtribuneLinkValid &&
            this.state.weatherDescriptionValid
        });
    }

    errorClass(error) {
    return(error.length === 0 ? '' : 'formular--error');
    }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        let ftime = 0;
        let ftimestart = 0;
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
        }else if(name === 'valueStartMinute' || name === 'valueStartHour'){
            if(name === 'valueStartMinute'){
                minuteSZ = Number(value);
             }  else if(name === 'valueStartHour'){
                hourSZ = Number(value*60);
             }
             ftimestart = hourSZ + minuteSZ;
             this.setState({
                startingtime: ftimestart},
                () => { this.validateField('startingtime', ftimestart) 
              });
        }else if(name === 'startplace'){
            let valuesplittet = value.split(' ');
            let startplace = {}; //creating copy of object
            startplace.area = valuesplittet[0];
            startplace.startplace = valuesplittet[1];
            this.setState({
                startplace2: startplace},
                () => { this.validateField('startplace', value) 
              });
        }else if(name === 'paragliders'){
            let valuesplittet2 = _.find(this.props.paragliders, {id: value}); //creating copy of object
            let newparaglider = {};
            newparaglider.brand = valuesplittet2.brand;
            newparaglider.id = valuesplittet2.id;
            newparaglider.model = valuesplittet2.model;
            this.setState({
                paragliders2: newparaglider},
                () => { this.validateField('paragliders', value) 
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
        let ftimestart = 0;
        
        if(Number(this.state.valueStartHour) > 0){
            ftimestart = (Number(this.state.valueStartHour)*60) + Number(this.state.valueStartMinute);
        }else{
            ftimestart = Number(this.state.valueStartMinute);
        }
        this.setState({startingtime: ftimestart},
            () => { this.validateField('startingtime', ftimestart) 
          })
        if(this.state.formValid){
            this.setState({
                errorAlert: false,
                form1: false,
                form2: false,
                form3: true,
                form4: false,
                ani: 'form3',
                maxaltitude: this.state.maxaltitude,
                heightgain: this.state.heightgain,
                maxclimb: this.state.maxclimb,
                maxsink: this.state.maxsink,
                startingtime: this.state.startingtime,
                distance: this.state.distance,
                weatherDescription: this.state.weatherDescription,
                paragliders: this.state.paragliders,
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
            ani: 'form1',
            formTitleH2: 'Erfasse deine Flugdaten.',
        });
    }

    goNext3(e){
        e.preventDefault();
        this.setState({
            clickedOnWeiterBtn: true
        })
        if(this.state.formValid){
            if(this.state.pictures.length !== 0 && this.state.clickedOnWeiterBtn === false){
                this.onSubmitImgUpload(e);
            }else{
                this.goNext3_setState(false);
            }
        }else{
            this.setState({errorAlert: true})
                Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
                    this.errorClass(this.state.formErrors[fieldName]);
                    this.validateField(fieldName, this.state[fieldName]);
                    return '';
        });
        }
    }

    goNext3_setState(withImages){
        this.setState({
            errorAlert: false,
            form1: false,
            form2: false,
            form3: false,
            form4: true,
            ani: 'form4',
            formTitleH2: 'Links zu anderen Flugplatformen.'
        });
        if (withImages){
            this.setState({
                uploadfinished: false
            });
        }
    }

    onSubmitImageUploadClose(e){
        e.preventDefault();
        this.setState({
            clickedOnCloseBtn: true
        })
        if(this.state.formValid){
            this.onSubmitImgUpload(e);
        }else{
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
            ani: 'form2',
            formTitleH2: 'Weitere optionale Daten zum Flug.',
            pictures: [],
            successPreview: false,
            renderButtonSave: false,
            renderButtonSaveClose: false,
            renderButtonNext: true,
            classNameBackButton: 'button'
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
                imgUrl: this.state.imgUrl,
                formTitleH2: 'Screenshots zum Wetter hochladen.'
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

    goBack4(e){
        e.preventDefault();
        this.setState({
            form1: false,
            form2: false,
            form3: true,
            form4: false,
            ani: 'form3',
            formTitleH2: 'Bilder hochladen.',
            renderButtonNext: true
        });
    } 

    onSubmit(e){
        e.preventDefault();
        let ftime = 0;
        let ftimestart = 0;
        let actualTimestamp = moment().format("YYYY-MM-DD HH:mm:ss Z");
        //add all Infos for the pilots-object
        let pilotObj = {};
        pilotObj.email = this.props.user.email;
        pilotObj.lastname = this.props.currentpilot.lastname;
        pilotObj.name = this.props.currentpilot.firstname;
        pilotObj.pilotId = this.props.user.uid;

        if(Number(this.state.valueHour) > 0){
            ftime = (Number(this.state.valueHour)*60) + Number(this.state.valueMinute);
        }else{
            ftime = Number(this.state.valueMinute);
        }
        
        if(Number(this.state.valueStartHour) > 0){
            ftimestart = (Number(this.state.valueStartHour)*60) + Number(this.state.valueStartMinute);
        }else{
            ftimestart = Number(this.state.valueStartMinute);
        }

        this.setState({flighttime: ftime, flightId: ''},
            () => { this.validateField('flighttime', ftime) 
          })
        //to delete the first empty value of array imgURL and imgName, shift first empty value, when there are several urls and names
        if(this.state.imgUrl.length>1 && this.state.imgUrl[0]===''){
            this.state.imgUrl.shift();
            this.state.imgName.shift();
        }
        
        if(this.state.formValid){
         this.setState({errorAlert: false})
        obj = {
            pilot: pilotObj,
            date: this.state.date,
            startplace: this.state.startplace2,
            landingplace: this.state.landingplace,
            landingplaceLink: this.state.landingplaceLink,
            flighttime: ftime,
            xcdistance: this.state.xcdistance,
            maxaltitude: this.state.maxaltitude,
            heightgain: this.state.heightgain,
            maxclimb: this.state.maxclimb,
            maxsink: this.state.maxsink,
            startingtime: ftimestart,
            distance: this.state.distance,
            description: this.state.description,
            paraglider: this.state.paragliders2,
            imgUrl: this.state.imgUrl,
            imgName: this.state.imgName,
            syrideLink: this.state.syrideLink,
            xcontestLink: this.state.xcontestLink,
            airtribuneLink: this.state.airtribuneLink,
            weatherDescription: this.state.weatherDescription,
            rating: this.state.rating,
            writeDate: this.state.writeDate,
            lastUpdate: updateLastUpdateArray(this.state.lastUpdate, actualTimestamp)
        }

        //if there is set an ID to update a fligt. Otherwise save a new flight
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
      
    //TODO outsorce as function/Component -> it's used in startplaces-formular as well
    getOptionsGlider(sp, text, keyForOption, sorting, keyForOption2){
        let all = [];
        let arr = [<option key={'0'} value={0}>{text}</option>];
        const startplacesData = Object.keys(sp).map(i => sp[i]);
        startplacesData.sort((a, b)=>{return compare(a, b, sorting)});
        all = startplacesData.map((item)=> {
            let keyName = keyForOption2 ? (item[keyForOption2] + ' ' + item[keyForOption]) : item[keyForOption];
            return <option key={item.id} value={item.id}>{keyName}</option>;
        });
       
        arr.push(all);
        return arr;
    }
    getOptionsStartplace(sp, text, keyForOption, sorting, keyForOption2, subobject){
        let all = [];
        let arr = [<option key={'0'} value={0}>{text}</option>];
        const startplacesData = Object.keys(sp).map(i => sp[i]);
        startplacesData.sort((a, b)=>{return compare(a, b, sorting)});
        all = startplacesData.map((item, index)=> {
            //When the area has startplaces, return an Object, otherwise user can not choose it
            if(item && item.startplaces){
                let secondSpData = (startplacesData[index]) ? Object.keys(startplacesData[index][subobject]).map(i => startplacesData[index][subobject][i]) : null;
                return secondSpData.map((seconditem)=>{
                    let keyName = keyForOption2 ? (item[keyForOption2] + ' ' + seconditem[keyForOption]) : item[keyForOption];
                    return <option key={item.id+seconditem.id} value={`${item.id} ${seconditem.id}`}>{keyName}</option>;
                });
            }else{
                return null;
            }
        });
        arr.push(all);
        return arr;
    }
    getOptionsTime(number, text, multiplied, endTxtPlural){
        let option = [];
        let numberTxt = '';
        let textWithEnd = endTxtPlural;
        for(let i=0; i<=number; i=i+multiplied){
            if(i===0){
                numberTxt=''
                textWithEnd=text+endTxtPlural
            }else if (i===1){
                numberTxt='1'
                textWithEnd=text+''
            }else{
                numberTxt=i
                textWithEnd=text+endTxtPlural
            }
            option.push(<option key={i.toString()} className="formular__dropdown-option" value={i.toString()}>{numberTxt} {textWithEnd}</option>)
        }
        return option;
    }
    getOptionsStartTime(number, multiplied){
        let option = [];
        let numberTxt = '';
        for(let i=0; i<=number; i=i+multiplied){
            if(i===0){
                numberTxt='00'
            }else if (i<10){
                numberTxt='0'+i
            }else{
                numberTxt=i
            }
            option.push(<option key={i.toString()} className="formular__dropdown-option" value={i.toString()}>{numberTxt}</option>)
        }
        return option;
    }

    goToPage(e){
        e.preventDefault();
        this.props.history.push({
            pathname: routes.STARTPLATZ_ERFASSEN,
            state: [{from: routes.FLUGDATEN_ERFASSEN}]
        });
    }

    componentWillUnmount() {
        this.setState({
            flightId: ''
        });
    }

    //image-upload (Form3) functions
    onChangeImgUpload(picture){
        this.setState({
            pictures: picture,
            checkifImageFinished: []
        });
        if(picture.length === 0){
            this.setState({
                successPreview: false,
                renderButtonSave: false,
                renderButtonSaveClose: false,
                renderButtonNext: true,
            });
        }else{
            this.setState({
                successPreview: true,
                renderButtonSave: true,
                renderButtonSaveClose: true,
                renderButtonNext: false
            });
        }
      }

     onSubmitImgUpload(e){
        e.preventDefault();
        let file = this.state.pictures;
        let that = this;
        const date = this.state.date.split(".").reverse().join('');
        const pilotId = this.props.user.uid;
        const randomNo = Math.floor((Math.random() * 100));

        this.setState({
            renderButtonSave: false,
            renderButtons: false
        });
        file.forEach(function(element) {  
            //PreviewUrl safe in state "preview Url"
            let reader = new FileReader();
            reader.onload = function(event) {
                that.setState({
                    previewUrl: that.state.previewUrl.concat(event.target.result)
                })
            };
            reader.readAsDataURL(element);
            
            let img = firebase.storage().ref('images/' + date + '-' + pilotId + '/' + randomNo + '/' + element.name).put(element);
            img.on('state_changed', function(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                let obj = {name: element.name, progressbar: progress, uploaded: false};
                that.setState({
                    progress: progress,
                    renderImageUploader: false,
                    progressObj: that.state.progressObj.concat(obj)
                });
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    console.log('default');
                    break;
                }
              }, function(error) {
                that.setState({errorMessageImage: error})
                console.log(error);
              }, function() {
                    console.log('Uploaded a blob or file!');
                    that.setState({
                        imgUrl: that.state.imgUrl.concat(img.snapshot.downloadURL),
                        successPreview: false,
                        imgName: that.state.imgName.concat(element.name),
                        checkifImageFinished: that.state.checkifImageFinished.concat(true)
                    });
                    //Detect numbers of images, which will be uploaded, set in a variable all to true, if reached the number of images, set state uf uploadfinished to its state
                    //TODO: find a better solution, maybe with a promise?
                    if(that.state.checkifImageFinished.length>0 && that.state.checkifImageFinished.length === file.length){
                        that.setState({
                            uploadfinished: that.state.checkifImageFinished[file.length-1],
                            renderButtonClose: true,
                            renderButtons: true,
                        })
                    }
              });
        });
     }

     getUrl(filename){
        firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({flightPictureURL: url}));
    }

    abort(e){
        e.preventDefault();
        this.props.history.push(routes.LANDING);
    }

    render() {
        return ( 
            <main className="main">
                <section className="centered-layout">
                    <BackButton 
                        backto = {false}
                        backfunction={this.abort}
                        text = 'Abbrechen'
                    />
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {this.state.ani}
                        />}
                        classes = 'centered-layout__header'
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
                        getOptions={this.getOptionsStartplace(this.props.startplaces, 'Startplatz wählen', 'name', 'name', 'name', 'startplaces')}
                        getOptionsHour={this.getOptionsTime(8, 'Std.', 1, '')}
                        getOptionsMinute={this.getOptionsTime(60, 'Min.', 5, '')}
                        nameSP={this.state.nameStartplace}
                        selectedValueSP={this.state.startplace}
                        goToPage={this.goToPage}
                        valueLandeplatz={this.state.landingplace}
                        startDate={this.state.startDate}
                        handleChange={this.handleChangeDate}
                        onChangeDate={this.onChange}
                        classNameDate={`formular__input-wrapper ${this.errorClass(this.state.formErrors.date)}`}
                        classNameDateLP={`formular__input-wrapper ${this.errorClass(this.state.formErrors.landingplace)}`}
                        classNameDateFT={`formular__input-wrapper formular__input-Icon-wrapper ${this.errorClass(this.state.formErrors.flighttime)}` }
                        classNameSP={`formular__input-wrapper ${this.errorClass(this.state.formErrors.startplace)}`}
                        classNameDescription={`formular__input-wrapper formular__input--text ${this.errorClass(this.state.formErrors.description)}`}
                        errorMessageLP={this.state.formErrors.landingplace}
                        errorMessageST={this.state.formErrors.startplace}
                        errorMessageDate={this.state.formErrors.date}
                        errorMessageFT={this.state.formErrors.flighttime}
                        errorMessageDesc={this.state.formErrors.description}
                        labelDescription='Kommentar'
                        hrefStartplaces={routes.STARTPLATZ_ERFASSEN}
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
                        valueXcdistance={this.state.xcdistance}
                        valueMaxsink={this.state.maxsink}
                        classNamemaxaltitude={`formular__input-wrapper margin-top-0 ${this.errorClass(this.state.formErrors.maxaltitude)}`}
                        classNameheightgain={`formular__input-wrapper ${this.errorClass(this.state.formErrors.heightgain)}`}
                        classNamemaxclimb={`formular__input-wrapper ${this.errorClass(this.state.formErrors.maxclimb)}`}
                        classNamestartingtime={`formular__input-wrapper ${this.errorClass(this.state.formErrors.startingtime)}`}
                        classNamedistance={`formular__input-wrapper ${this.errorClass(this.state.formErrors.distance)}`}
                        classNameXcdistance={`formular__input-wrapper ${this.errorClass(this.state.formErrors.xcdistance)}`}
                        classNameMaxsink={`formular__input-wrapper ${this.errorClass(this.state.formErrors.maxsink)}`}
                        errorMessagemaxaltitude={this.state.formErrors.maxaltitude}
                        errorMessageheightgain={this.state.formErrors.heightgain}
                        errorMessagemaxclimp={this.state.formErrors.maxclimb}
                        errorMessagestartingtime={this.state.formErrors.startingtime}
                        errorMessagedistance={this.state.formErrors.distance}
                        errorMessageXC={this.state.formErrors.xcdistance}
                        errorMessagemaxsink={this.state.formErrors.maxsink}
                        classNameWeatherDescription={`formular__input-wrapper formular__input--text ${this.errorClass(this.state.formErrors.weatherDescription)}`}
                        labelWeatherDescription='Das Wetter'
                        nameWeatherDescription={this.state.nameWeatherDescription}
                        valueWeatherDescription={this.state.weatherDescription}
                        errorMessageWeatherDescription={this.state.formErrors.weatherDescription}

                        nameStartHour={this.state.nameStartHour} 
                        valueStartHour={this.state.valueStartHour}
                        getOptionsStartHour={this.getOptionsStartTime(24, 1)} 
                        nameStartMinute={this.state.nameStartMinute} 
                        valueStartMinute={this.state.valueStartMinute}
                        getOptionsStartMinute={this.getOptionsStartTime(59, 5)}

                        classNameGlider={`formular__input-wrapper ${this.errorClass(this.state.formErrors.paragliders)}`}
                        gliderLabel={'Gleitschirm-Modell'}
                        nameGlider={this.state.nameParagliders}
                        valueGlider={this.state.paragliders}
                        getOptionsGlider={this.getOptionsGlider(this.props.paragliders, 'Gleitschirm wählen', 'model', 'brand', 'brand')}
                        errorMessageGlider={this.state.formErrors.paragliders}
                    />}
                </ReactTransitionGroup> 
                <ReactTransitionGroup component="div" className="formular-wrapper">
                    {this.state.form3 &&
                    <FlugdatenForm3 
                        onChange={this.onChangeImgUpload}
                        onSubmit={this.onSubmit}
                        onSubmitImageUploadClose={this.onSubmitImageUploadClose}
                        goBack={this.goBack3}
                        goNext={this.goNext3}
                        ani3={this.state.ani}
                        valueImgUrl={this.state.imgUrl}
                        classNameimgUrl={`formular__input-wrapper formular__input-wrapper--centered ${this.errorClass(this.state.formErrors.imgUrl)}`}
                        errorMessageimgUrl={this.state.formErrors.imgUrl}
                        renderImageUploader={this.state.renderImageUploader}
                        renderButtonSave={this.state.renderButtonSave}
                        renderButtonClose={this.state.renderButtonClose}
                        renderButtonSaveClose={this.state.renderButtonSaveClose}
                        renderButtonNext={this.state.renderButtonNext}
                        renderButtons={this.state.renderButtons}
                        pictures={this.state.pictures}
                        progressObj= {this.state.progressObj}
                        previewUrl= {this.state.previewUrl}
                        classNameBackButton={this.state.classNameBackButton}
                    />}
                </ReactTransitionGroup> 
                <ReactTransitionGroup component="div" className="formular-wrapper">
                    {this.state.form4 &&
                    <FlugdatenForm4 
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        goBack={this.goBack4}
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
      let key = (props.match.params.id) ? props.match.params.id : '';
    return {
          flight: _.find(state.flights, { id: key }),
          user: state.user,
          pilots: state.pilots,
          currentpilot:  _.find(state.pilots, { email: state.user.email }),
          startplaces: state.startplaces,
          paragliders: state.paragliders
    };
}, { saveFlights, getFlights, deleteFlights, getUser, updateFlights, getPilots, getStartplaces, getParagliders })(flightform);

export default withRouter(flightform);
