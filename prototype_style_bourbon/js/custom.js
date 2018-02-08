/**
 * Created by claudia on 03.02.18.
 */

'use strict';

(function(win) {

/*
    funktion to scroll the image/starttext
*/
    const intViewportHeight = window.innerHeight;
    const linkbox = document.querySelector('.start__right');
    const imagebox = document.querySelector('.start__image-wrapper');
    const starttextbox = document.querySelector('.start__text-wrapper');
    const header = document.querySelector('.header');
    const img = document.querySelector('.js-start__image');
    const links = document.querySelectorAll('.js-linkbox-links');
    const linkboxes = document.querySelectorAll('.js-linkbox-content');

    let elheader = header.getBoundingClientRect();
    let headerheight = elheader.height;

    //get the height of the start-text-element
    let styleoftextbox = window.getComputedStyle(starttextbox, null);
    let elStarttext = starttextbox.getBoundingClientRect();
    let starttextheight = elStarttext.height;

    //get the margin-bottom of the start-text-element
    let starttextmargin = styleoftextbox.marginBottom;
    starttextmargin=starttextmargin.match(/\d+/g).map(Number).join();
    starttextmargin=Number(starttextmargin);
    let startextheightmargin = starttextheight + starttextmargin;

    function leftscroll(){
        //get the height and bottom-position of the linkbox
        let elLinkbox = linkbox.getBoundingClientRect();
        let bottom = elLinkbox.bottom;
        let linkboxheight = elLinkbox.height;

        if(intViewportHeight >= bottom){
            imagebox.style.position = 'absolute';
            imagebox.style.top = (linkboxheight-intViewportHeight) + 'px';
            starttextbox.style.position = 'absolute';
            starttextbox.style.top = (linkboxheight-startextheightmargin) + 'px';

        } else{
            imagebox.style.position = 'fixed';
            imagebox.style.top = '0px';
            starttextbox.style.position = 'fixed';
            starttextbox.style.top = 'auto';

        }

        //add/remove class of header to show logo positive
        if(bottom <= headerheight){
            header.classList.add('js-header--positive');
        }else{
            header.classList.remove('js-header--positive');
        }
    }

    /*
     funktion to show and hide header
     */
    let last_known_scroll_position = 0;
    let scrollDown = 0;
    let ticking = false;

    function scrollaction(scroll_pos) {
        let scroll_up = last_known_scroll_position;
        if (scroll_up < scrollDown ) {
            header.classList.remove('js-header--hide');
        } else {
            header.classList.add('js-header--hide');
        }
        scrollDown = scroll_up;
    }

    /*
     funktion to change images
     */
    function changeImages(imagepath, fruehling, sommer, herbst, winter){
        let d = new Date();
        let Today = d.getDate();
        let Month = d.getMonth();

        let actualMonthNumber = 0;
        let season = '';
        let seasonLetter = '';

        if (Month <= 3 && Month > 0){
            actualMonthNumber = winter;
            season = 'winter';
            seasonLetter = 'w';
        } else if (Month <= 6 && Month > 3){
            actualMonthNumber = fruehling;
            season = 'fruehling';
            seasonLetter = 'f';
        } else if (Month <= 9 && Month > 6){
            actualMonthNumber = sommer;
            season = 'sommer';
            seasonLetter = 's';
        } else if (Month <= 12 && Month > 9){
            actualMonthNumber = herbst;
            season = 'herbst';
            seasonLetter = 'h';
        } else{
            img.src = imagepath + 'default.jpg';
        }

        let randomImage = Math.floor(Math.random() * (actualMonthNumber))+1;
        img.src = imagepath + season + '/' + seasonLetter +randomImage+'.jpg';
    }

    /*
     funktion for show more text
     */

    function showMoreText(numberOfLinks, buttonTextshow, buttonTexthide){
        for (let i = 0; i < linkboxes.length; i++) {
             let allLinks = linkboxes[i].querySelectorAll('.link-box__link');
             let linkBoxLinks = linkboxes[i].querySelector('.js-linkbox-links');
             let showMoreButton = linkboxes[i].querySelector('.js-show-more');

             if(allLinks.length <= numberOfLinks){
                 showMoreButton.classList.add('link-box__show-more--hide');
             } else{
                 linkBoxLinks.classList.add('js-linkbox-content--hide');
                 showMoreButton.classList.add('link-box__show-more--show');
            }

            showMoreButton.addEventListener('click', function (e) {
                e.preventDefault();
                let targetLinkbox = e.target.parentNode.querySelector('.js-linkbox-links');
                let clickedButton = e.target;
                if(targetLinkbox.classList.contains('js-linkbox-content--hide')){
                    targetLinkbox.classList.remove('js-linkbox-content--hide');
                    targetLinkbox.classList.add('js-linkbox-content--show');
                    clickedButton.innerHTML = buttonTexthide;
                } else{
                    targetLinkbox.classList.remove('js-linkbox-content--show');
                    targetLinkbox.classList.add('js-linkbox-content--hide');
                    clickedButton.innerHTML = buttonTextshow;
                }
            });
        }
    }

    window.addEventListener("scroll", function(){
        //scroll left side
        leftscroll();

        //hide/show header
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollaction(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;

    }, false);

    window.addEventListener("scroll", function(){
        //scroll left side
        leftscroll();

        //hide/show header
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollaction(last_known_scroll_position);
                ticking = false;
            });
        }
        ticking = true;

    }, false);

    showMoreText(4, '+ mehr Links', '&ndash; weniger Links');
    changeImages('assets/img/', 2, 2, 2, 2);
})(window);