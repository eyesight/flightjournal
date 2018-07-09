import React from 'react';

const Arrow = (props) => {
    return (
        <a className={props.classNameAnchor} onClick={props.prevNextFunction}><i className={props.classNameIcon}></i></a>
    );
};   
export default Arrow;