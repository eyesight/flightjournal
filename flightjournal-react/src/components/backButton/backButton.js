import React from 'react';

const BackButton = (props) => {
    let classOfButton = "back-button"
    if(props.backto === true){
        classOfButton = "back-button back-button__backto"
    }
    return (
        <a className={classOfButton} onClick={props.backfunction} href={props.href}>
            <div className="back-button__icon-text">{props.text}</div>
            <div className="back-button__icon">
                <span></span>
                <span></span>
            </div>
        </a>
    );
};   
export default BackButton; 