import React, {Component} from 'react';
import InputField from '../formInputfield/formInputfield';

class LandingplacesFormPart extends Component {
    render() {
        const { 
            onChange, valueDesc, errorMessageDesc, classNameName, nameStartplaceName, typeName, labelName, nameImages, nameImagesCount, classNameDesc,
            classNameAltitude, labelAltitude, typeAltitude, nameAltitude, labelImages, labelImagesCount,
            errorMessageImagesUrl, errorMessageimagesCount,
            classNamePlace, labelPlace, typePlace, namePlace, labelDescription, nameDescription, typeDescription, classNameImageUrl, classNameImageNumber,
            errorMessageName, errorMessageAltitude, errorMessagePlace,
            valueName, valueAltitude, valuePlace, valueImageUrl, valueImageNumber } = this.props;
        return (
            <section className='formular__part'>
                <div className='formular__part-title'>
                    <p>Landeplatz#1</p>
                </div>
                <InputField
                    classes={classNameName}
                    label={labelName}
                    inputAction={onChange}
                    type={typeName}
                    name={nameStartplaceName}
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageName}
                    value={valueName}
                />
                <InputField 
                    classes={classNameAltitude}
                    label={labelAltitude}
                    inputAction={onChange}
                    type={typeAltitude}
                    name={nameAltitude}
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageAltitude}
                    value={valueAltitude}
                />
                <InputField 
                    classes={classNamePlace}
                    label={labelPlace}
                    inputAction={onChange}
                    type={typePlace}
                    name={namePlace}
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessagePlace}
                    value={valuePlace}
                />
                <div className={classNameDesc}>
                    <label className="formular__label">{labelDescription}</label>
                    <textarea className="formular__input" type={typeDescription} name={nameDescription} value={valueDesc} onChange={onChange}></textarea>
                    <span className='formular__validationBox'>{errorMessageDesc}</span>
                </div>
                <InputField 
                    classes={classNameImageUrl}
                    label={labelImages}
                    inputAction={onChange}
                    type='text'
                    name={nameImages}
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageImagesUrl}
                    value={valueImageUrl}
                />
                <InputField 
                    classes={classNameImageNumber}
                    label={labelImagesCount}
                    inputAction={onChange}
                    type='text'
                    name={nameImagesCount}
                    autocomp=''
                    classNamesError='formular__validationBox'
                    errorMessage={errorMessageimagesCount}
                    value={valueImageNumber}
                />
           </section>          
        );
    }
};
export default LandingplacesFormPart;