import React, { Component } from 'react';
import * as routes from '../../constants/routes';

class FlugplanungLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {
            srcpath:''
        };
        this.leftscroll = this.leftscroll.bind(this);
        this.changeImages = this.changeImages.bind(this);
    }

    leftscroll(){
        const header = document.querySelector('.header');
        let elheader = header.getBoundingClientRect();
        let headerheight = elheader.height;

        const intViewportHeight = window.innerHeight;
        const linkbox = document.querySelector('.start__right');

        const imagebox = document.querySelector('.start__image-wrapper');

        //get the height and bottom-position of the linkbox
        let elLinkbox = linkbox.getBoundingClientRect();
        let bottom = elLinkbox.bottom;
        let linkboxheight = elLinkbox.height;

        if (matchMedia) {
            const mq = window.matchMedia("(min-width: 1024px)");
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        // media query change
        function WidthChange(mq) {
            if (mq.matches) {
                if (intViewportHeight >= bottom) {
                    imagebox.style.position = 'absolute';
                    imagebox.style.top = (linkboxheight - intViewportHeight) + 'px';
                } else {
                    imagebox.style.position = 'fixed';
                    imagebox.style.top = '0px';
                }

                //add/remove class of header to show logo positive
                if (bottom <= headerheight) {
                    header.classList.add('js-header--positive');
                } else {
                    header.classList.remove('js-header--positive');
                }
            } else {
                imagebox.style.position = 'relative';
                imagebox.style.top = '0px';
            }
        }
    }

    changeImages(imagepath, fruehling, sommer, herbst, winter) {
        const img = document.querySelector('.js-start__image');
        let d = new Date();
        let Month = d.getMonth();

        let actualMonthNumber = 0;
        let season = '';
        let seasonLetter = '';
        if (Month <= 2 && Month >= 0) {
            actualMonthNumber = winter;
            season = 'winter';
            seasonLetter = 'w';
        } else if (Month <= 5 && Month > 2) {
            actualMonthNumber = fruehling;
            season = 'fruehling';
            seasonLetter = 'f';
        } else if (Month <= 8 && Month > 5) {
            actualMonthNumber = sommer;
            season = 'sommer';
            seasonLetter = 's';
        } else if (Month <= 11 && Month > 8) {
            actualMonthNumber = herbst;
            season = 'herbst';
            seasonLetter = 'h';
        } else {
            this.setState({
                srcpath: imagepath + 'default.jpg'
            });
        }

        let randomImage = Math.floor(Math.random() * (actualMonthNumber)) + 1;
        if(img){
            this.setState({
                srcpath: imagepath + season + '/' + seasonLetter + randomImage + '.jpg'
            });
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.leftscroll);
        this.changeImages(routes.LANDINGPAGEIMAGES, 6, 5, 6, 2);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.leftscroll);
        this.changeImages(routes.LANDINGPAGEIMAGES, 6, 5, 6, 2);
    }

    render() {
        return (
            <div className="start__left">
                <div className="start__image-wrapper">
                    <img className="start__image js-start__image" alt="startbild" src={this.state.srcpath}/>
                </div>
            </div>
        );
    }
}

export default FlugplanungLeft;
