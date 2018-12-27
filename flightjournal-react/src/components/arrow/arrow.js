import React from 'react';

const Arrow = (props) => {
    return (
        <button className={props.classNameAnchor} onClick={props.prevNextFunction}><i className={props.classNameIcon}></i></button>
    );
};   
export default Arrow;