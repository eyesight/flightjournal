import React from 'react';

const Anchor = (props) => {
    return (
        <a className={props.classNameAnchor} href={props.hrefAnchor}>{props.withIcon && <i className={props.classNameIcon}></i>}{props.anchorText}</a>
    );
}; 
export default Anchor;