import React from 'react';
import Arrow from '../arrow/arrow';

const ImageGallerie = (props) => {
    function renderImages(url, name){
        let items = [];
        let classNameImg = 'image-galerie__image';
        for(let i=1; i<name.length; i++){
            classNameImg = (props.isActiveImg === i) ? 'image-galerie__image js-active' : 'image-galerie__image';
            items.push(<img key={i.toString()} className={classNameImg} src={url[i]} alt={name[i]} />)
        }
        return items;
    }
    function renderDots(name){
        let items = [];
        let classNameDot = 'image-galerie__dot';
        for(let i=1; i<name.length; i++){
            classNameDot = (props.isActiveImg === i) ? 'image-galerie__dot js-active' : 'image-galerie__dot';
            items.push( <span key={i.toString()} className={classNameDot} data-dot={i.toString()} onClick={props.onClickDot}></span>)
        }
        return items;
    }
    return (
        <div className={props.classNameOuterDiv}>
            <div className="image-galerie__wrapper">
                {renderImages(props.url, props.name)}
            </div>
            <div className="image-galerie__prev-next">
                <Arrow 
                    arrow="right"
                    prevNextFunction={props.nextFunction}
                />
                <Arrow 
                    arrow="left"
                    prevNextFunction={props.prevFunction}
                />
            </div>
            <div className="image-galerie__dots">
                {renderDots(props.name)}
            </div>
        </div>
    );
};
export default ImageGallerie;