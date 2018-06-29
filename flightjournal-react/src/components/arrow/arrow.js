import React from 'react';

const Arrow = (props) => {
    let classNameAnchor = (props.arrow === 'right') ? 'image-galerie__next' : 'image-galerie__prev';
    let classNameIcon = (props.arrow === 'right') ? 'fas fa-chevron-right image-galerie__fa' : 'fas fa-chevron-left image-galerie__fa';
    return (
        <a className={classNameAnchor} onClick={props.prevNextFunction}><i className={classNameIcon}></i></a>
    );
};   
export default Arrow;