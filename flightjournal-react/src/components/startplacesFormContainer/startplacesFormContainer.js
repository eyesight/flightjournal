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
import StartareasForm from './startareasForm';
import FormAnimation from '../formAnimation/formAnimation';
import FormTitle from '../formTitle/formTitle';
import  _ from 'lodash';

let obj = {};

class StartplaceFormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ani:'',
            formisvisible: true,
            formstartareaisvisible: false,
            titleForm: 'neuen Startplatz erfassen.',

            saveAreaIds: false,
            startplaceIds: [],
            firstcall: true,

            saveRegionIds: false,
            startareasIds: [],
            firstcallRegion: true,

            areasLabel: '',
            nameAreas: '',
            getOptionsAreas: '',
            errorMessageAreas: '',
            errorMessageDesc: '',
            errorMessageRegion: '',
            errorMessageAreaName: '',
            errorMessageFunicularLink: '',
            errorMessageSandortpin: '', 
            errorMessageSBB: '', 
            errorMessageGoogleMaps: '', 
            errorMessageWebcams1: '', 
            errorMessageWebcams2: '', 
            errorMessageWebcams3: '', 
            errorMessageShvInfo: '', 
            errorMessageWindMeteocentrale: '', 
            errorMessageLiveWindmap: '', 
            errorMessageThermikhotspots: '', 
            errorMessageMeteoswiss: '', 
            errorMessageThermikforecast: '', 
            errorMessageXc: '', 
            errorMessageAreaDescription: '',

            startplaceClassName: 'formular__input-wrapper',
            classNameAltitude: 'formular__input-wrapper formular__input-wrapper--margin-left',
            classNamePlace: 'formular__input-wrapper formular__input-wrapper--fullwith',
            classNameAreas: `formular__input-wrapper formular__input-wrapper--fullwith`,
            //Values of Form Startingplaces
            name : '',
            altitude : '',
            startareasId: '',
            description : '',
            locationpin: '',
            danger: '',
            winddirection: [],
            writeDateSP: '',
            lastUpdateSP: '',
            //Values of Form Startingareas
            region: '',
            startareaname: '',
            funicularLink: '',
            arealocationpin: '',
            googleMaps: '',
            sbb: '',
            webcams: [],
            shvInfo: '',
            windMeteocentrale: '',
            liveWindmap: '',
            thermikHotspots: '',
            meteoswiss: '',
            therikForecast: '',
            xc: '',
            areaDescription: '',
            startplaces: [],
            imagesUrl: '',
            imagesCount: 0,
            writeDateSA: '',
            lastUpdateSA: ''
        };
        this.onChange = this.onChange.bind(this);  
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitArea = this.onSubmitArea.bind(this);
        this.goBack = this.goBack.bind(this);
        this.goToPage = this.goToPage.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.getOptionsCheckbox = this.getOptionsCheckbox.bind(this);
    }
    
    componentWillMount() {
        window.scrollTo(0, 0);
        this.props.getStartplaces();
        this.props.getUser();
        this.props.getRegions();
        this.props.getStartareas();
        this.props.getWinddirections();
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
        this.props.history.push(routes.FLUGDATEN_ERFASSEN);
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

    onChange(theEvent){
        if(theEvent.target.name === 'winddirection'){
            let indexOfItem = this.state.winddirection.indexOf(theEvent.target.value);
            indexOfItem === -1 ? this.state.winddirection.push(theEvent.target.value) : this.state.winddirection.splice(indexOfItem, 1);
            this.setState({
                [theEvent.target.name]: this.state.winddirection
            });
        }else{
            this.setState({
                [theEvent.target.name]: theEvent.target.value,
            });
        }
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
        obj = {
            writeDate: this.state.writeDateSP,
            lastUpdate: this.state.lastUpdateSP,
            name: this.state.name,
            altitude : this.state.altitude,
            locationpin: this.state.locationpin,
            description : this.state.description,
            startareasId: this.state.startareasId,
            danger: this.state.danger,
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
    }

    onSubmitArea(e){
        e.preventDefault();
        let webcamarr = [];
        if(this.state.webcam){webcamarr.push(this.state.webcam)};
        if(this.state.webcam2){webcamarr.push(this.state.webcam2)};
        if(this.state.webcam3){webcamarr.push(this.state.webcam3)};
        this.setState({
            webcams: webcamarr,
            webcam: '',
            webcam2: '',
            webcam3: ''
        })

        obj = {
            writeDate: this.state.writeDateSA,
            lastUpdate: this.state.lastUpdateSA,
            name: this.state.startareaname,
            regionsId: this.state.region,
            funicularLink: this.state.funicularLink,
            locationpin: this.state.arealocationpin,
            googleMaps: this.state.googleMaps,
            sbb: this.state.sbb,
            webcams: webcamarr,
            shvInfo: this.state.shvInfo,
            windMeteocentrale: this.state.windMeteocentrale,
            liveWindmap: this.state.liveWindmap,
            thermikHotspots: this.state.thermikHotspots,
            meteoswiss: this.state.meteoswiss,
            therikForecast: this.state.therikForecast,
            xc: this.state.xc,
            description: this.state.areaDescription,
            rating: '',
            imagesUrl: this.state.imagesUrl
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
        this.props.dispatch(reset('NewPost'));
        this.setState({
            formisvisible: false
        });
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
                    history={this.props.history}
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                    goBack={this.goBack}
                    goToPage={this.goToPage}
                    ani={this.state.ani}
                    delayEnter={0.2}
                    delayLeave={0.2}
                    
                    valueAreas={this.state.startareasId}
                    getOptionsAreas={this.getOptions(this.props.startareas, 'Fluggebiet wählen', 'name')}  

                    classNameName={this.state.startplaceClassName}
                    classNameAltitude={this.state.classNameAltitude}
                    classNamePlace={this.state.classNamePlace}
                    classNameAreas={this.state.classNameAreas}
                    nameStartplaceName='name'
                    nameAltitude='altitude'
                    namePlace='locationpin'
                    nameDescription='description'
                    nameAreas='startareasId'
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
                    errorMessageDesc={this.state.errorMessageDesc}

                    cbClassNameWrapper='formular__input-wrapper formular__input-wrapper--checkboxes'
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
            <ReactTransitionGroup component="div" className="formular-wrapper">
            {this.state.formstartareaisvisible ? 
                <StartareasForm 
                    onChange={this.onChange}
                    onSubmitArea={this.onSubmitArea}
                    goBack={this.goBack}
                    classNameRegio={this.state.classNameAreas}
                    regioLabel='Region wählen'
                    nameRegio='region'
                    valueRegio={this.state.regionsId}
                    getOptionsRegio={this.getOptions(this.props.regions, 'Region wählen', 'name')}
                    errorMessageRegio={this.state.errorMessageRegion}
                    errorMessageAreaName= {this.state.errorMessageAreaName}
                    errorMessageFunicularLink={this.state.errorMessageFunicularLink} 
                    errorMessageSandortpin={this.state.errorMessageSandortpin}
                    errorMessageSBB={this.state.errorMessageSBB}
                    errorMessageGoogleMaps={this.state.errorMessageGoogleMaps}
                    errorMessageWebcams1={this.state.errorMessageWebcams1}
                    errorMessageWebcams2={this.state.errorMessageWebcams2}
                    errorMessageWebcams3={this.state.errorMessageWebcams3}
                    errorMessageShvInfo={this.state.errorMessageShvInfo}
                    errorMessageWindMeteocentrale={this.state.errorMessageWindMeteocentrale}
                    errorMessageLiveWindmap={this.state.errorMessageLiveWindmap}
                    errorMessageThermikhotspots={this.state.errorMessageThermikhotspots}
                    errorMessageMeteoswiss={this.state.errorMessageMeteoswiss}
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
