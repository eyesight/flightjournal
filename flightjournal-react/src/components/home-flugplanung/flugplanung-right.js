import React, { Component } from 'react';
import MainTitleWrapper from '../mainTitleWrapper/mainTitleWrapper';
import Linkbox from '../linkbox/linkbox';
import ScrollableAnchor from 'react-scrollable-anchor';

class FlugplanungRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonTxt:'+ mehr Links',
            classNameH3: 'title title-h3',
            classNameTitleReg: 'title title--regular',
            classNameAnchor: 'link-box__link anchor'
        };
        this.slideshowInit = this.slideshowInit.bind(this);
        this.dotfunc = this.dotfunc.bind(this);
        this.prevNext = this.prevNext.bind(this);
    }

    slideshowInit() {
        let linkboxPrevTitle = document.querySelector('.link-box__prev-text');
        let linkboxNextTitle = document.querySelector('.link-box__next-text');
        // media query change
        if (matchMedia) {
            const mq2 = window.matchMedia("(max-width: 550px)");
            mq2.addListener(WidthChange2);
            WidthChange2(mq2);
        }

        // media query change
        function WidthChange2(mq2) {
            const parents = document.getElementsByClassName('js-linkbox-slideshow-container');
            for (let j = 0; j < parents.length; j++) {
                const slides = parents[j].getElementsByClassName("js-linkbox");
                const dots = parents[j].getElementsByClassName("js-dot");
                const linkboxTitle = parents[j].getElementsByClassName('title-h3');
                linkboxPrevTitle = document.getElementsByClassName('link-box__prev-text');
                linkboxNextTitle = document.getElementsByClassName('link-box__next-text');
                slides[0].classList.add('slide-active');

                setTimeout(function () {
                    slides[0].classList.add('slide-visible');
                }, 100);

                dots[0].classList.add('dot-active');
                let titleLength = linkboxTitle.length;

                //adding Text to prev- / next-button
                linkboxPrevTitle[j].innerHTML = linkboxTitle[titleLength - 1].innerHTML.match(/^\S+(?=\.)/gi)[0];
                linkboxNextTitle[j].innerHTML = linkboxTitle[1].innerHTML.match(/^\S+(?=\.)/gi)[0];
            }
        }
        this.dotfunc(linkboxPrevTitle, linkboxNextTitle);
        this.prevNext();
    }

    //TODO:  Line 70:  Don't make functions within a loop  no-loop-func
    dotfunc(linkboxPrevTitle, linkboxNextTitle){
        const dots = document.getElementsByClassName('js-dot'); //dots functionality

        for (let i = 0; i < dots.length; i++) {
            let index = 0;
            let indexPrev = index;
            let indexNex = index;

            dots[i].onclick = function () {
                const slides = this.parentNode.parentNode.getElementsByClassName("js-linkbox");
                const linkboxTitle = this.parentNode.parentNode.getElementsByClassName('title-h3');
                linkboxPrevTitle = this.parentNode.parentNode.getElementsByClassName('link-box__prev-text');
                linkboxNextTitle = this.parentNode.parentNode.getElementsByClassName('link-box__next-text');

                for (let j = 0; j < this.parentNode.children.length; j++) {
                    this.parentNode.children[j].classList.remove('dot-active');
                    slides[j].classList.remove('slide-active', 'slide-visible');
                    if (this.parentNode.children[j] === this) {
                        index = j;
                    }
                }
                this.classList.add('dot-active');
                slides[index].classList.add('slide-active');
                setTimeout(function () {
                    slides[index].classList.add('slide-visible');
                }, 50);

                if (index >= linkboxTitle.length - 1) {
                    indexPrev = index - 1;
                    indexNex = 0;
                } else if (index <= 0) {
                    indexPrev = linkboxTitle.length - 1;
                    indexNex = index + 1;
                } else {
                    indexPrev = index - 1;
                    indexNex = index + 1;
                }

                linkboxPrevTitle[0].innerHTML = linkboxTitle[indexPrev].innerHTML.match(/^\S+(?=\.)/gi)[0];
                linkboxNextTitle[0].innerHTML = linkboxTitle[indexNex].innerHTML.match(/^\S+(?=\.)/gi)[0];
            }
        }
    }

    //prev/next functionality
    prevNext(){
        const prev_next = document.querySelectorAll('.link-box__prev-next button');
        for (let ind = 0; ind < prev_next.length; ind++) {
            prev_next[ind].onclick = function () {
                let current = this.parentNode.parentNode;
                const slides = current.getElementsByClassName("js-linkbox");
                const dots = current.getElementsByClassName("js-dot");
                let curr_linkboxTitle = current.getElementsByClassName('title-h3');
                let curr_slide = current.getElementsByClassName('slide-active')[0];
                let curr_dot = current.getElementsByClassName('dot-active')[0];
                let curr_linkboxPrevTitle = this.parentNode.parentNode.getElementsByClassName('link-box__prev-text')[0];
                let curr_linkboxNextTitle = this.parentNode.parentNode.getElementsByClassName('link-box__next-text')[0];
                let curr_index = Number(curr_dot.getAttribute('data-dot') - 1);

                let index_prev = slides.length - 1;
                let index_next = curr_index + 1;

                curr_slide.classList.remove('slide-active', 'slide-visible');
                curr_dot.classList.remove('dot-active');

                if (this.classList.contains('js-next')) {
                    if (curr_index >= slides.length - 1) {
                        curr_index = 0;
                        index_prev = slides.length - 1;
                        index_next = curr_index + 1;
                    } else if (curr_index === 0) {
                        curr_index += 1;
                        index_next = curr_index + 1;
                        if (index_prev <= 0) {
                            index_prev = slides.length - 1;
                        } else {
                            index_prev = curr_index - 1;
                        }
                    } else {
                        curr_index += 1;
                        index_prev = curr_index - 1;
                        if (index_next >= slides.length - 1) {
                            index_next = 0;
                        } else {
                            index_next = curr_index + 1;
                        }
                    }

                    for(let slidei = 0; slidei<slides.length; slidei++){
                        if(slides[slidei].classList.contains('prev')){
                            slides[slidei].classList.remove('prev');
                        }
                    }


                    if (curr_slide.nextElementSibling.classList.contains('js-linkbox')) {
                        curr_slide.nextElementSibling.classList.add('slide-active');
                        setTimeout(function () {
                            curr_slide.nextElementSibling.classList.add('slide-visible');
                        }, 100);
                        curr_dot.nextElementSibling.classList.add('dot-active');
                    } else {
                        slides[0].classList.add('slide-active');
                        setTimeout(function () {
                            slides[0].classList.add('slide-visible');
                        }, 100);
                        dots[0].classList.add('dot-active');
                    }
                }

                if (this.classList.contains('js-prev')) {
                    if (curr_index <= 0) {
                        curr_index = slides.length - 1;
                        index_next = 0;
                        index_prev = curr_index - 1;
                    } else if (curr_index === slides.length - 1) {
                        curr_index = 0;
                        index_next = curr_index + 2;
                        index_prev = 0;
                    } else {
                        curr_index = curr_index - 1;
                        index_next = curr_index + 1;

                        if (index_prev >= slides.length - 1) {
                            index_prev = slides.length - 1;
                        } else {
                            index_prev = curr_index - 1;
                        }
                    }

                    for(let slidei = 0; slidei<slides.length; slidei++){
                        if(!slides[slidei].classList.contains('prev')){
                            slides[slidei].classList.add('prev');
                        }
                    }

                    if (curr_slide.previousElementSibling) {
                        curr_slide.previousElementSibling.classList.add('slide-active');
                        setTimeout(function () {
                            curr_slide.previousElementSibling.classList.add('slide-visible');
                        }, 50);
                        curr_dot.previousElementSibling.classList.add('dot-active');
                    } else {
                        slides[slides.length - 1].classList.add('slide-active');
                        setTimeout(function () {
                            slides[slides.length - 1].classList.add('slide-visible');
                        }, 50);
                        dots[slides.length - 1].classList.add('dot-active');
                    }

                }
                curr_linkboxPrevTitle.innerHTML = curr_linkboxTitle[index_prev].innerHTML.match(/^\S+(?=\.)/gi)[0];
                curr_linkboxNextTitle.innerHTML = curr_linkboxTitle[index_next].innerHTML.match(/^\S+(?=\.)/gi)[0];
            }
        }
    }

    componentDidMount() {
        this.slideshowInit();
    }

    componentWillUnmount(){
        this.slideshowInit();
    }

    render() {
        return (
            <ScrollableAnchor id={'flugplanung'}>
                <div id={'section-1'} className="start__right">
                    <MainTitleWrapper 
                        classNameWrapper='start__lead-wrapper'
                        withAnchor={false}
                        withIcon={false} 
                        classNameH1='main-title main-title--mobile-large'
                        classNameSpan='main-title--bold'
                        textBold='(R)auf und davon.'
                        textReg='Mit dem Gleitschirm unterwegs.'
                        withParagraph={false}
                    />
                    <Linkbox />            
                </div>
            </ScrollableAnchor>
        );
    }
}

export default FlugplanungRight;
