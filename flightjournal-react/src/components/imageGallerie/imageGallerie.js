import React, { Component } from 'react';
import Arrow from '../arrow/arrow';
import Dots from '../dots/dots';

class ImageGallerie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 0,
            classNameDot: 'image-galerie__dot'
        }
        this.prevFunction = this.prevFunction.bind(this);
        this.nextFunction = this.nextFunction.bind(this);
        this.renderImages = this.renderImages.bind(this);
        this.onClickDot = this.onClickDot.bind(this);
    }
    renderImages(url, name){
        let items = [];
        let classNameImg = 'image-galerie__image';
        for(let i=0; i<name.length; i++){
            classNameImg = (this.state.isActive === i) ? 'image-galerie__image js-active' : 'image-galerie__image';
            items.push(<img key={i.toString()} className={classNameImg} src={url[i]} alt={name[i]} />)
        }
        return items;
    }

    nextFunction(e){
        e.preventDefault();
        if(this.props.name.length-1 <= this.state.isActive){
            this.setState({
                isActive: 0
            })
        }else{
            this.setState({
                isActive: this.state.isActive+1
            })
        }
    }
    prevFunction(e){
        e.preventDefault();
        if(this.state.isActive-1 === -1){
            this.setState({
                isActive: this.props.name.length-1
            })
        }else{
            this.setState({
                isActive: this.state.isActive-1
            })
        }
    }
    onClickDot(i){
        this.setState({
            isActive: i
        })
    }
    render() {
    return (
        <div className={this.props.classnamesWrapper}>
            <div className="image-galerie__wrapper">
                {this.renderImages(this.props.url, this.props.name)}
            </div>
            <div className="image-galerie__prev-next">
                <Arrow 
                    prevNextFunction={this.nextFunction}
                    classNameAnchor='image-galerie__next'
                    classNameIcon='fas fa-chevron-right image-galerie__fa'
                />
                <Arrow 
                    prevNextFunction={this.prevFunction}
                    classNameAnchor='image-galerie__prev'
                    classNameIcon='fas fa-chevron-left image-galerie__fa'
                /> 
            </div>
            <div className="image-galerie__dots">
                {this.props.name.map((item, index) =>{
                    let classNameDot = (this.state.isActive === index) ? 'image-galerie__dot js-active' : 'image-galerie__dot';
                        return <Dots key={index.toString()}
                            classNameDot={classNameDot}
                            onItemClick={this.onClickDot} 
                            id={index}
                        />
                    }
                )}
            </div>
        </div>
    );
}
};
export default ImageGallerie;