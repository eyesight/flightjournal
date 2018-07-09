import React from 'react';

const TitleH3 = (props) => {
    return (
        <h3 className={props.classNameH3}>{props.txtBold}<br /><span className={props.classNameTitleReg}>{props.txtReg}</span></h3>
    );
}; 
export default TitleH3;