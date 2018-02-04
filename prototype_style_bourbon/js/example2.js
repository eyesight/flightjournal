'use strict';

;(function($){
    $(function() {

        // Begin input common focus and blur for value.

        $('input:text,input:password,textarea').focus(function () {
            if (this.value == this.defaultValue) {
                this.value = ''
            }
        });

        $('input:text,input:password,textarea').blur(function () {
            if (!this.value) {
                this.value = this.defaultValue;
            }
        });

        // Ends input common focus and blur for value.


        $('.phone-nav').click(function () {

            $('.main-nav').slideToggle()

        });

        $('.main-nav a, .home-projects__title__inner, .home-projects__image-wrapper__link').each(function () {
            $(this).attr('target', '_top')
        });


        if ($('.project-page').length) {

            $('body').addClass('project-page-body')

        }


        if ($('#home-page').length) {

            $('body').addClass('home-page-body')


        }


        if ($('.contact-text').length) {

            $('body').addClass('contact-page-body')

        }


        if ($('.about-page').length) {

            $('body').addClass('about-page-body')

        }


        var WindowHeight = $(window).height()


        $(window).resize(function () {

            WindowHeight = $(window).height()

        })


        if ($(window).width() > 767) {

            $('.scroll-down-btn').click(function (e) {

                e.preventDefault()

                if ($(window).width() > 1024) {

                    $('html, body').stop(true, true).animate({

                        scrollTop: WindowHeight

                    }, 500)

                }

                else {

                    $('html, body').stop(true, true).animate({

                        scrollTop: WindowHeight + 100

                    }, 500)

                }

            })

        }


        else {

            $('.scroll-down-btn').click(function (e) {

                e.preventDefault()

                $('html, body').stop(true, true).animate({

                    scrollTop: $('#one-slide-section').offset().top - 60

                }, 500)

            })

        }


        if ($('.project-page').length) {


            $('body').addClass('one-slide-section-fixed')


            $(window).scroll(function () {

                if ($(window).scrollTop() > WindowHeight) {

                    $('body').removeClass('one-slide-section-fixed')

                }


                else {

                    $('body').addClass('one-slide-section-fixed')

                }

            })

        }
    }
})(jQuery);