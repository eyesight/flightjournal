import React from 'react';

const ImageGallerie = (props) => {
    function renderImages(url, name){
        let items = [];
        for(let i=0; i<name.length; i++){
            items.push(<img key={i.toString()} className="image-galerie__image js-image-galerie__image" src={url[i]} alt={name[i]} />)
        }
        return items;
    }
    function renderDots(name){
        let items = [];
        for(let i=0; i<name.length; i++){
            items.push( <span key={i.toString()} className="image-galerie__dot js-img-dot" data-dot={i.toString()}></span>)
        }
        return items;
    }
    return (
        <div className={props.classNameOuterDiv}>
            <div className="image-galerie__wrapper">
                {renderImages(props.url, props.name)}
            </div>
            <div className="image-galerie__prev-next">
                <a className="image-galerie__prev js-img-prev"><span className="image-galerie__prev-text"></span><i className="fas fa-chevron-left image-galerie__fa"></i></a>
                <a className="image-galerie__next js-img-next"><i className="fas fa-chevron-right image-galerie__fa"></i><span className="image-galerie__next-text"></span></a>
            </div>
            <div className="image-galerie__dots">
            {renderDots(props.name)}
            </div>
        </div>
    );
};
export default ImageGallerie;