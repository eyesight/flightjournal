import React from 'react';

const Anchor = (props) => {
    let target = (props.withTarget) ? '_blank' : '_self';
    return (
        <a className={props.classNameAnchor} target={target} rel={props.rel} href={props.hrefAnchor}>{props.withIcon && <i className={props.classNameIcon}></i>}{props.anchorText}</a>
    );
}; 
export default Anchor;