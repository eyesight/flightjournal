'use strict';

(function () {

    /*
     funktion to scroll the image/starttext
     */
    const header = document.querySelector('.header');
    const img = document.querySelector('.js-start__image');
    const links = document.querySelectorAll('.js-linkbox-links');
    const linkboxes = document.querySelectorAll('.js-linkbox-content');
    const navigation = document.querySelector('.main-nav');
    const logo = document.querySelector('.header__logo');
    let navlinks = document.querySelectorAll('.main-nav__link');
    let linkboxPrevTitle = document.querySelector('.link-box__prev-text');
    let linkboxNextTitle = document.querySelector('.link-box__next-text');

    let elheader = header.getBoundingClientRect();
    let headerheight = elheader.height;

    const burger = document.querySelector('.mobile-toggle');

    function leftscroll() {
        const intViewportHeight = window.innerHeight;
        const linkbox = document.querySelector('.start__right');
        const imagebox = document.querySelector('.start__image-wrapper');
        const starttextbox = document.querySelector('.start__text-wrapper');

        //get the height of the start-text-element
        let styleoftextbox = window.getComputedStyle(starttextbox, null);


        let elStarttext = starttextbox.getBoundingClientRect();
        let starttextheight = elStarttext.height;

        //get the margin-bottom of the start-text-element
        let starttextmargin = styleoftextbox.marginBottom;
        starttextmargin = starttextmargin.match(/\d+/g).map(Number).join();
        starttextmargin = Number(starttextmargin);
        let startextheightmargin = starttextheight + starttextmargin;


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
                    starttextbox.style.position = 'absolute';
                    starttextbox.style.top = (linkboxheight - startextheightmargin) + 'px';
                } else {
                    imagebox.style.position = 'fixed';
                    imagebox.style.top = '0px';
                    starttextbox.style.position = 'fixed';
                    starttextbox.style.top = 'auto';
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

    /*
     funktion to show and hide header
     */
    let last_known_scroll_position = 0;
    let scrollDown = 0;
    let ticking = false;

    function scrollaction(scroll_pos) {

        // media query change
        if (matchMedia) {
            const mq = window.matchMedia("(min-width: 1024px)");
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        // media query change
        function WidthChange(mq) {
            if (mq.matches) {
                let scroll_up = last_known_scroll_position;
                if (scroll_up < scrollDown) {
                    header.classList.remove('js-header--hide');
                } else {
                    header.classList.add('js-header--hide');
                }
                scrollDown = scroll_up;
            }
        }
    }


    /*
     funktion to change images
     */
    function changeImages(imagepath, fruehling, sommer, herbst, winter) {
        let d = new Date();
        let Today = d.getDate();
        let Month = d.getMonth();

        let actualMonthNumber = 0;
        let season = '';
        let seasonLetter = '';

        if (Month <= 2 && Month > 0) {
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
            img.src = imagepath + 'default.jpg';
        }

        let randomImage = Math.floor(Math.random() * (actualMonthNumber)) + 1;
        if(img){
            img.src = imagepath + season + '/' + seasonLetter + randomImage + '.jpg';
        }
    }

    /*
     funktion for show more text
     */
    function showMoreText(numberOfLinks, buttonTextshow, buttonTexthide) {
        for (let i = 0; i < linkboxes.length; i++) {
            let allLinks = linkboxes[i].querySelectorAll('.link-box__link');
            let linkBoxLinks = linkboxes[i].querySelector('.js-linkbox-links');
            let showMoreButton = linkboxes[i].querySelector('.js-show-more');

            if (allLinks.length <= numberOfLinks) {
                showMoreButton.classList.add('link-box__show-more--hide');
            } else {
                linkBoxLinks.classList.add('js-linkbox-content--hide');
                showMoreButton.classList.add('link-box__show-more--show');
            }

            showMoreButton.addEventListener('click', function (e) {
                e.preventDefault();
                let targetLinkbox = e.target.parentNode.querySelector('.js-linkbox-links');
                let clickedButton = e.target;
                if (targetLinkbox.classList.contains('js-linkbox-content--hide')) {
                    targetLinkbox.classList.remove('js-linkbox-content--hide');
                    targetLinkbox.classList.add('js-linkbox-content--show');
                    clickedButton.innerHTML = buttonTexthide;
                } else {
                    targetLinkbox.classList.remove('js-linkbox-content--show');
                    targetLinkbox.classList.add('js-linkbox-content--hide');
                    clickedButton.innerHTML = buttonTextshow;
                }
            });
        }
    }

    /*
     funktion lazy loading images
     */
    function lazyloading() {
        const images = document.querySelectorAll('img[data-src]');
        if (images.length === 0) return;

        for (const image of images) {
            if (image.getBoundingClientRect().top <= window.innerHeight * 0.75 && image.getBoundingClientRect().top > 0) {
                image.setAttribute('src', image.getAttribute('data-src'));
                image.onload = function () {
                    image.removeAttribute('data-src');
                };
            }
        }
    }

    /*
     funktion to activate navigation anchor, when section is in viewport
     */
    function scrollNavigation() {
        let section = document.querySelectorAll('section');
        let sections = {};
        let i = 0;
        let scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        Array.prototype.forEach.call(section, function (e) {
            sections[e.id] = e.offsetTop;
        });

        for (i in sections) {
            if (sections[i] <= scrollPosition) {
                if (document.querySelector('.active')) {
                    document.querySelector('.active').classList.remove('active');
                    if(img){
                        document.querySelector('a[href*=\\#' + i + ']').classList.add('active');
                    }
                } else {
                    if(img) {
                        document.querySelector('a[href*=\\#' + i + ']').classList.add('active');
                    }
                }
            }
        }
    }

    if (screen.width <= 550) {

    }

    /*
     funktion slideshow of Linklists
     TODO: Make a funkction for the media-query (it's the second time I used it). Refactor Code!
     */
    slideshowInit(); //on page load - show first slide, hide the rest

    function slideshowInit() {
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
    }

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
            }, 100);

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

    //prev/next functionality
    const prev_next = document.querySelectorAll('.link-box__prev-next a');

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
                    }, 100);
                    curr_dot.previousElementSibling.classList.add('dot-active');
                } else {
                    slides[slides.length - 1].classList.add('slide-active');
                    setTimeout(function () {
                        slides[slides.length - 1].classList.add('slide-visible');
                    }, 100);
                    dots[slides.length - 1].classList.add('dot-active');
                }

            }
            curr_linkboxPrevTitle.innerHTML = curr_linkboxTitle[index_prev].innerHTML.match(/^\S+(?=\.)/gi)[0];
            curr_linkboxNextTitle.innerHTML = curr_linkboxTitle[index_next].innerHTML.match(/^\S+(?=\.)/gi)[0];
        }
    }

    burger.addEventListener('click', function (event) {
        event.preventDefault();
        if (navigation.classList.contains('js-mobile-nav--visible')) {
            navigation.classList.remove('js-mobile-nav--visible');
        } else {
            navigation.classList.add('js-mobile-nav--visible');
        }

        if (logo.classList.contains('js-mobile-logo--visible')) {
            logo.classList.remove('js-mobile-logo--visible');
        } else {
            logo.classList.add('js-mobile-logo--visible');
        }
    });

    navlinks = [].slice.call(navlinks);

    navlinks.forEach(function (e) {
        e.addEventListener('click', function (e) {
            if (navigation.classList.contains('js-mobile-nav--visible') && logo.classList.contains('js-mobile-logo--visible')) {
                navigation.classList.remove('js-mobile-nav--visible');
                logo.classList.remove('js-mobile-logo--visible');
            }
        });
    });

        window.addEventListener("scroll", function () {
            //scroll left side
            if(img) {
                leftscroll();
            }
            //lazyload images
            lazyloading();
            //activate menu of section
            scrollNavigation();

            //hide/show header
            last_known_scroll_position = window.pageYOffset;
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    scrollaction(last_known_scroll_position);
                    ticking = false;
                });
            }
            ticking = true;

        }, false);

    window.addEventListener("resize", function () {
        if(img) {
            leftscroll();
        }
    });

    showMoreText(5, '+ mehr Links', '&ndash; weniger Links');
    changeImages('assets/img/', 6, 3, 9, 2);


})(window);
