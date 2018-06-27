import React from 'react';

const MainTitle = (props) => {
    return (
        <h1 className={props.classNameH1}>
            <span className={props.classNameSpan}>{props.txtBold}<br />
            </span>{props.txtReg}
        </h1>
    );
}; 
export default MainTitle;