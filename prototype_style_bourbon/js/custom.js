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
        console.log(intViewportHeight);
        console.log(bottom);

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
            console.log('tr');
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

    }, false)
})(window);