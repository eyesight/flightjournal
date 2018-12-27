import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm, reset } from 'redux-form';
import { getStartplaces, saveStartplaces, updateStartplaces, deleteStartplaces } from '../../actions/StartplacesActions';
import { getStartareas, updateStartareas, saveStartareas } from '../../actions/StartareasActions';
import { getRegions, updateRegions } from '../../actions/RegionsActions';
import { getWinddirections, updateWinddirections } from '../../actions/WinddirectionActions';
import { getUser } from '../../actions/UserActions';
import * as routes from '../../constants/routes';
import ReactTransitionGroup from 'react-addons-transition-group';
import StartplacesForm from './startplacesForm';
import BackButton from './../backButton/backButton';
import StartareasForm from './startareasForm';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle'; 
import { updateLastUpdateArray } from '../../utils/updateLastUpdateArray';
import * as validation from '../../utils/validationText';
import  _ from 'lodash';
import moment from 'moment';
import FormErrorAlert from '../formErrorAlert/formErrorAlert';

let obj = {};

class StartplaceFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ani:'',
            formisvisible: true,
            formstartareaisvisible: false,
            titleForm: 'Neuen Startplatz erfassen.',
            _isMounted: false,

            saveAreaIds: false,
            startplaceIds: [],
            firstcall: true,

            saveRegionIds: false,
            startareasIds: [],
            firstcallRegion: true,

            areasLabel: '',
            nameAreas: '',
            getOptionsAreas: '',
            errorMessageRegion: '',
            errorMessageAreaName: '',
            errorMessageFunicularLink: '',
            errorMessageSandortpin: '', 
            errorMessageWebcams1: '', 
            errorMessageWebcams2: '', 
            errorMessageWebcams3: '', 
            errorMessageWindstation1: '',
            errorMessageWindstation2: '',
            errorMessageWindstation3: '',
            errorMessageShvInfo: '', 
            errorMessageThermikforecast: '', 
            errorMessageXc: '', 
            errorMessageAreaDescription: '',

            classNameAreas: `formular__input-wrapper formular__input-wrapper--fullwith`,

            //validation-states
            validationTxt: '',
            errorAlert: false,
            formValid: false, 

            formErrors: {startareasId: '', name: '', altitude: '', locationpin: '', winddirection: '', description: '', imagesUrl: '', imagesCount:''},
            formErrorsValid: {startareasId: false, name: false, altitude: false, locationpin:true, winddirection: false, description: true, imagesUrl: true, imagesCount: true},

            //startplaces-form
            startareasIdValid: false,
            nameValid: false,
            altitudeValid: false,
            locationpinValid: true,
            winddirectionValid: false,
            descriptionValid: true,
            imagesUrlValid: true,
            imagesCountValid: true,

            //validation-states area
            errorAlertArea: false,
            formValidArea: false,
            formErrorsArea:{},
            formErrorsValidValid: {},
          
            //Values of Form Startingplaces
            name : '',
            altitude : '',
            startareasId: '',
            description : '',
            locationpin: '',
            winddirection: [],
            lastUpdateSP: '',
            imagesUrl: '',
            imagesCount: 0,
            //Values of Form Startingareas
            region: '',
            startareaname: '',
            funicularLink: '',
            arealocationpin: '',
            webcams: [],
            shvInfo: '',
            weatherstations: [],
            xc: '',
            areaDescription: '',
            startplaces: [],
            lastUpdateSA: '',
            landingplaces: []
        };
        this.onChange = this.onChange.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitArea = this.onSubmitArea.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.getOptionsCheckbox = this.getOptionsCheckbox.bind(this);
        this.goBack = this.goBack.bind(this);
        this.validateField = this.validateField.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.errorClass = this.errorClass.bind(this);
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getStartplaces();
        this.props.getUser();
        this.props.getRegions();
        this.props.getStartareas();
        this.props.getWinddirections();
        this.setState({
            _isMounted: true
        })
        if (this.props.user.loading === false && this.props.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.loading === false && nextProps.user.email === undefined) {
            this.props.history.replace(routes.LANDING);
          }
        //to compare when function onSubmitArea is called and new ID has to be put in database startareas
        if (_.isEmpty(this.props.startplaces) === false && (this.state.firstcall === true)){
            const keyStartplaces = Object.keys(nextProps.startplaces);
            this.setState({
                startplaceIds: keyStartplaces,
                firstcall: false
            })
        }
    }

    componentWillUnmount() {
        console.log('unmount');
        this.setState({
            _isMounted: false
        });
        
      }
    
    componentDidUpdate(){
        //when state saveAreaId is set to true, the new Object set in function onSubmit 
        if(this.state.startareasId && this.state.saveAreaIds){
            let that = this;
            let sparray = [];
            let newarr = [];
            const keysOfStartareas = Object.keys(this.props.startareas).map(i => this.props.startareas[i]);
            const startplacesID = Object.keys(this.props.startplaces).map(i => this.props.startplaces[i]);
            startplacesID.map(function (item) {
                return newarr.push(item.id);
            });
            //compare the new array of startplaces-Objects with the old one, before user clicked on "save" - so Id of new object stored in variable diff
            let diff = newarr.filter(y => !that.state.startplaceIds.includes(y));
            //add all the startplaces-IDs whitch are stored in "startplaces" of Object startareas and push the new Id (stored in variable diff)
            keysOfStartareas.map(function (item) {
                if(item.id === that.state.startareasId){
                    //if array of startareas exits, add the new Id, otherwise build a new array with first Id in it
                    return (item.startplaces) ? (
                        sparray = item.startplaces,
                        sparray.push(...diff)
                    ) : sparray = diff;
                };
                return sparray;
            });
            let objArea = {
                startplaces: sparray
            }
            //update Startareas with the updated array of startplaces-Ids
            this.props.updateStartareas(this.state.startareasId, objArea).then(
                this.props.dispatch(reset('NewPost')),
                this.setState({
                    saveAreaIds: false
                }),
                //When Object is updated, return to flight-form
                this.props.history.push(routes.FLUGDATEN_ERFASSEN)
            ).catch((err) => {
                console.log('error when update startareas when safe startplaces');
                console.log(err)
              }
            );
        }
        //when state saveRegionIds is set to true, the new Object set in function onSubmitArea
        if(this.state.region && this.state.saveRegionIds){
            let that = this;
            let regioarr = [];
            let newarrArea = [];
            const keysOfRegions = Object.keys(this.props.regions).map(i => this.props.regions[i]);
            const regionsId = Object.keys(this.props.startareas).map(i => this.props.startareas[i]);
            regionsId.map(function (item) {
                return newarrArea.push(item.id);
            });
            //compare the new array of startareas-Objects with the old one, before user clicked on "save" - so Id of new object is stored in variable diffArea
            let diffArea = newarrArea.filter(y => !that.state.startareasIds.includes(y));
            keysOfRegions.map(function (item) {
                if(item.id === that.state.region){
                    //if array of startareas exits, add the new Id, otherwise build a new array with first Id in it
                    return (item.startareas) ? (
                        regioarr = item.startareas,
                        regioarr.push(...diffArea)
                    ) : regioarr = diffArea;
                };
                return regioarr;
            });
            let objRegio = {
                startareas: regioarr
            }
            //update Regions with the updated array of startareas-Ids
            this.props.updateRegions(this.state.region, objRegio).then(
                this.props.dispatch(reset('NewPost')),
                //When Object is updated, return to startplaces-form by changing states
                this.setState({
                    formstartareaisvisible: false,
                    formisvisible: true,
                    titleForm: 'neuen Startplatz erfassen.',
                    saveRegionIds: false
                })
            ).catch((err) => {
                console.log('error when update startareas when safe startplaces');
                console.log(err)
              }
            );
        }
    }

    validateField(fieldName, value) {
        //Startplaces-Form
        let fieldValidationErrors = this.state.formErrors;
        let startareasIdValid = this.state.startareasIdValid;
        let nameValid = this.state.nameValid;
        let altitudeValid = this.state.altitudeValid;
        let locationpinValid = this.state.locationpinValid;
        let winddirectionValid = this.state.winddirectionValid;
        let descriptionValid = this.state.descriptionValid;
        let imagesUrlValid = this.state.imagesUrlValid;
        let imagesValid = false;
        let imagesCountValid = this.state.imagesCountValid;

        //Startarea-Form
        let fieldValidationErrorsArea = this.state.formErrorsArea;
        switch(fieldName) {
        //Startplaces
        case 'startareasId': 
            startareasIdValid = value.length > 0 && value.length <= 150 && (typeof value === 'string') && value !== '0';
            fieldValidationErrors.startareasId = startareasIdValid ? '' : `${validation.valField} ${validation.valEmpty}.`;
            break;
        case 'name': 
            nameValid = value.length > 0 && value.length <= 150 && (typeof value === 'string') && value !== '0';
            fieldValidationErrors.name = nameValid ? '' : `${validation.valField} ${validation.valEmpty} und ${validation.valLess150}.`;
            break;
        case 'altitude':
            altitudeValid = value.length > 0 && (!isNaN(value) && value.length <= 5);
            fieldValidationErrors.altitude = altitudeValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess5}.`;
            break;
        case 'locationpin': 
            locationpinValid = value.length === 0 || (value.length <= 200 && (typeof value === 'string') && value !== '0');
            fieldValidationErrors.locationpin = locationpinValid ? '' : `${validation.valField} ${validation.valLess200}.`;
            break;
        case 'winddirection': 
            winddirectionValid = value.length > 0 && (value.length <= 8) && (typeof value[0] === 'string') && value !== '0';
            fieldValidationErrors.winddirection = winddirectionValid ? '' : `${validation.valField} ${validation.valEmpty}.`;
            break;
        case 'description':
            descriptionValid = (value.length === 0) || (value.length <= 5000 && (typeof value === 'string'));
            fieldValidationErrors.description = descriptionValid ? '' : `${validation.valField} ${validation.valLess5000}.`;
            break;
        case 'imagesUrl':
            // eslint-disable-next-line
            imagesValid = (/^[a-zA-Z0-9\_]*$/gi).test(this.state.imagesUrl);
            imagesUrlValid = value.length === 0 || (imagesValid === true && value.length <= 50 && value !== '' && (typeof value === 'string'));
            fieldValidationErrors.imagesUrl = imagesUrlValid ? '' : `${validation.valField} ${validation.specialChars} und ${validation.valLess50}.`;
            break;
        case 'imagesCount':
            imagesCountValid = value === 0 || (value.length < 2 && !isNaN(value));
            fieldValidationErrors.imagesCount = imagesCountValid ? '' : `${validation.valField} ${validation.valNumber} und ${validation.valLess1}.`;
            break;
        //Areas
          default:
            break;
        }
        this.setState({formErrorsValid: {
            startareasId: startareasIdValid,
            name: nameValid,
            altitude: altitudeValid,
            locationpin: locationpinValid,
            winddirection: winddirectionValid,
            description: descriptionValid,
            imagesUrl: imagesUrlValid,
            imagesCount: imagesCountValid
        },
        startareasIdValid: startareasIdValid,
        nameValid: nameValid,
        altitudeValid: altitudeValid,
        locationpinValid: locationpinValid,
        winddirectionValid: winddirectionValid,
        descriptionValid: descriptionValid,
        imagesUrlValid: imagesUrlValid,
        imagesCountValid: imagesCountValid
        }, this.validateForm);
        
      } 

      validateForm() {
        this.setState({formValid: 
            this.state.startareasIdValid &&
            this.state.nameValid &&
            this.state.altitudeValid &&
            this.state.locationpinValid &&
            this.state.winddirectionValid &&
            this.state.descriptionValid &&
            this.state.imagesUrlValid &&
            this.state.imagesCountValid
        });
      }

      errorClass(error) {
        return(error.length === 0 ? '' : 'formular--error');
      }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'winddirection'){
            let indexOfItem = this.state.winddirection.indexOf(value);
            indexOfItem === -1 ? this.state.winddirection.push(value) : this.state.winddirection.splice(indexOfItem, 1);
            this.setState({
                [name]: this.state.winddirection
            }, () => { this.validateField(name, this.state.winddirection) });
        }else{
            this.setState({[name]: value}, 
                () => { this.validateField(name, value) });
        }
        console.log(name + ': ' + value);
    };

    getOptions(sp, text, keyForOption, keyForOption2){
        const startplacesData = Object.keys(sp).map(i => sp[i]);
        const startplacesDatakey = Object.keys(sp);
        let optionArray = [];
        optionArray.push(<option key='0' value='0'>{text}</option>);
        startplacesData.map(function (item, i) {
            let keyName = keyForOption2 ? (item[keyForOption2] + ' ' + item[keyForOption]) : item[keyForOption];
            return optionArray.push(<option key={startplacesDatakey[i]} value={startplacesDatakey[i]}>{keyName}</option>);
        });
        return optionArray;
    }

    getOptionsCheckbox(cb, label){
        const checkboxData = Object.keys(cb).map(i => cb[i]);
        const arr = [];
        checkboxData.map(function (item) {
            return arr.push(item[label]);
        });
        return arr;
    }

    onSubmit(e){
        e.preventDefault();
        let actualTimestamp = moment().format("YYYY-MM-DD HH:mm:ss Z");
        if(this.state.formValid){
            this.setState({errorAlert: false})
        obj = {
            writeDate: actualTimestamp,
            lastUpdate: updateLastUpdateArray(this.state.lastUpdateSP, actualTimestamp),
            name: this.state.name,
            altitude : this.state.altitude,
            locationpin: this.state.locationpin,
            description : this.state.description,
            startareasId: this.state.startareasId,
            winddirectionsId: this.state.winddirection,
            rating: '',
            imagesUrl: this.state.imagesUrl,
            imagesCount: this.state.imagesCount
        }
        //when new Object is added, state saveAreaIds will set to true, so function in componentDidUpdate will be continued
        this.props.saveStartplaces(obj).then(
            this.props.dispatch(reset('NewPost')),
            this.setState({
                saveAreaIds: true
            })
        ).catch((err) => {
            console.log('error when safe startplaces');
            console.log(err)
          }
        );      
     }else{
        this.setState({errorAlert: true})
        Object.keys(this.state.formErrorsValid).map((fieldName, i) => {
               this.errorClass(this.state.formErrors[fieldName]);
               this.validateField(fieldName, this.state[fieldName]);
               return '';
         });
        } 
    }

    onSubmitArea(e){
        e.preventDefault();
        let actualTimestamp = moment().format("YYYY-MM-DD HH:mm:ss Z");
        let webcamarr = [];
        let windstationarr = [];
        if(this.state.webcam){webcamarr.push(this.state.webcam)};
        if(this.state.webcam2){webcamarr.push(this.state.webcam2)};
        if(this.state.webcam3){webcamarr.push(this.state.webcam3)};
        if(this.state.windstation1){windstationarr.push(this.state.windstation1)};
        if(this.state.windstation2){windstationarr.push(this.state.windstation2)};
        if(this.state.windstation3){windstationarr.push(this.state.windstation3)};

        this.setState({
            webcams: webcamarr,
            webcam: '',
            webcam2: '',
            webcam3: '',
            weatherstations: windstationarr,
            windstation1: '',
            windstation2: '',
            windstation3: ''
        })

        obj = {
            description: this.state.areaDescription,
            funicularLink: this.state.funicularLink,
            imagesUrl: this.state.imagesUrl,
            landingplaces: this.state.landingplaces,
            lastUpdate: updateLastUpdateArray(this.state.lastUpdateSA, actualTimestamp),
            locationpin: this.state.arealocationpin,
            name: this.state.startareaname,
            rating: '',
            regionsId: this.state.region,
            shvInfo: this.state.shvInfo,
            
            webcams: webcamarr,
            weatherstations: windstationarr,
            writeDate: actualTimestamp,
            xc: this.state.xc
        }
        //when new Object is added, state saveRegionIds will set to true, so function in componentDidUpdate will be continued
        this.props.saveStartareas(obj).then(
            this.props.dispatch(reset('NewPost')),
            this.setState({
                saveRegionIds: true
            })
        ).catch((err) => {
            console.log('error when safe startareas');
            console.log(err)
          }
        );
    }

    goBack(e){
        e.preventDefault();
        //Check if we are on Form Startarea or Startplaces by variable formstartareaisvisible. When Startarea is true, return to startplaces by change variables. When not, then return to Flightform
        if(this.state.formstartareaisvisible){
            this.setState({
                formstartareaisvisible: false,
                formisvisible: true,
                titleForm: 'Neuen Startplatz erfassen.',
            });
        }else{
            this.props.dispatch(reset('NewPost'));
            this.props.history.push(routes.FLUGDATEN_ERFASSEN)
        }
    }

    goToPage(e){
        e.preventDefault();
        const keyStartareas = Object.keys(this.props.startareas);
        this.setState({
            formstartareaisvisible: true,
            formisvisible: false,
            titleForm: 'Neues Fluggebiet erfassen.',
            startareasIds: keyStartareas
        });
    }

    render() {
        return ( 
            <main className="main">
                <section className="centered-layout">
                    <BackButton 
                        backto = {false}
                        backfunction={this.goBack}
                        text = 'Abbrechen'
                    />
                    <FormTitle 
                        children = {<FormAnimation
                            xyz = {this.state.ani}
                        />}
                        classes = 'centered-layout__header'
                        titleH2 = {this.state.titleForm}
                    />
            <ReactTransitionGroup component="div" className="formular-wrapper">
            {this.state.formisvisible ? 
                <StartplacesForm 
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goToPage={this.goToPage}
                    delayEnter={0.2}
                    delayLeave={0.2}
                    
                    valueAreas={this.state.startareasId}
                    getOptionsAreas={this.getOptions(this.props.startareas, 'Fluggebiet wählen', 'name')}  

                    classNameAreas={`formular__input-wrapper formular__input-wrapper--fullwith ${this.errorClass(this.state.formErrors.startareasId)}`}
                    classNameName={`formular__input-wrapper ${this.errorClass(this.state.formErrors.name)}`}
                    classNameAltitude={`formular__input-wrapper formular__input-wrapper--margin-left ${this.errorClass(this.state.formErrors.altitude)}`}
                    classNamePlace={`formular__input-wrapper formular__input-wrapper--fullwith ${this.errorClass(this.state.formErrors.locationpin)}`}
                    classNameDesc={`formular__input-wrapper formular__input--text ${this.errorClass(this.state.formErrors.description)}`}
                    classNameImageUrl={`formular__input-wrapper ${this.errorClass(this.state.formErrors.imagesUrl)}`}
                    classNameImageNumber={`formular__input-wrapper ${this.errorClass(this.state.formErrors.imagesCount)}`}
                    
                    nameStartplaceName='name'
                    nameAltitude='altitude' 
                    namePlace='locationpin'
                    nameDescription='description'
                    nameAreas='startareasId'
                    nameImages='imagesUrl'
                    nameImagesCount='imagesCount'
                    valueDescription={this.state.startplacesDescription}
                    typeName='text'
                    typeAltitude='text'
                    typePlace='text'
                    typeDescription='text'
                    labelName='Name'
                    labelAltitude='Höhe in Meters'
                    labelPlace='Standortpin'
                    labelDescription='Beschrieb'
                    areasLabel='Fluggebiet wählen'
                    labelImages='Bildordner'
                    labelImagesCount='Anzahl Bilder'

                    errorMessageAreas={this.state.formErrors.startareasId}
                    errorMessageName={this.state.formErrors.name}
                    errorMessageAltitude={this.state.formErrors.altitude}
                    errorMessagePlace={this.state.formErrors.locationpin}
                    errorMessagecb={this.state.formErrors.winddirection}
                    errorMessageDesc={this.state.formErrors.description}
                    errorMessageImagesUrl={this.state.formErrors.imagesUrl}
                    errorMessageimagesCount={this.state.formErrors.imagesCount}

                    cbClassNameWrapper={`formular__input-wrapper formular__input-wrapper--checkboxes ${this.errorClass(this.state.formErrors.winddirection)}`}
                    cbClassNameLabel='formular__part-title'
                    cbLabel='Windrichtungen'
                    classNameCheckboxWrapper='formular__checkbox-wrapper'
                    cbOptions={this.getOptionsCheckbox(this.props.winddirections, 'id')}
                    cbClassNameLabelItem='formular__checkbox-item'
                    cbName='winddirection'
                    cbSelectedOptions={this.state.winddirection}
                    classNameCheckbox='formular__checkbox'
                    classNameCheckboxTxt='formular__checkbox-text'
                /> : null}
            </ReactTransitionGroup>
            {this.state.errorAlert && <FormErrorAlert>{validation.valForm}</FormErrorAlert>}
            <ReactTransitionGroup component="div" className="formular-wrapper">
            {this.state.formstartareaisvisible ? 
                <StartareasForm 
                    delayEnter={0.75}
                    delayLeave={0.2}

                    onChange={this.onChange}
                    onSubmitArea={this.onSubmitArea}
                    classNameRegio={this.state.classNameAreas}
                    regioLabel='Region wählen'
                    nameRegio='region'
                    valueRegio={this.state.regionsId}
                    getOptionsRegio={this.getOptions(this.props.regions, 'Region wählen', 'name')}
                    errorMessageRegio={this.state.errorMessageRegion}
                    errorMessageAreaName= {this.state.errorMessageAreaName}
                    errorMessageFunicularLink={this.state.errorMessageFunicularLink} 
                    errorMessageSandortpin={this.state.errorMessageSandortpin}
                    errorMessageWebcams1={this.state.errorMessageWebcams1}
                    errorMessageWebcams2={this.state.errorMessageWebcams2}
                    errorMessageWebcams3={this.state.errorMessageWebcams3}
                    errorMessageWindstation1={this.state.errorMessageWindstation1}
                    errorMessageWindstation2={this.state.errorMessageWindstation2}
                    errorMessageWindstation3={this.state.errorMessageWindstation3}
                    errorMessageShvInfo={this.state.errorMessageShvInfo}
                    errorMessageThermikforecast={this.state.errorMessageThermikforecast}
                    errorMessageXc={this.state.errorMessageXc}
                    errorMessageAreaDescription={this.state.errorMessageAreaDescription}
                /> : null}
            </ReactTransitionGroup>
            </section>
           </main>
        );
    }
}

let flightform = reduxForm({
    form: 'NewPost'
  })(StartplaceFormContainer);
  
  flightform = connect((state, props) => {
          return  {
                startplaces: state.startplaces,
                user: state.user,
                regions: state.regions,
                startareas: state.startareas,
                winddirections: state.winddirections
            };
        }, { saveStartplaces, getStartplaces, updateStartplaces, deleteStartplaces, getUser, getStartareas, updateStartareas, saveStartareas, getRegions, updateRegions, getWinddirections, updateWinddirections }
    )(flightform);

export default withRouter(flightform);
