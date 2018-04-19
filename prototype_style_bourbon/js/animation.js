'use strict';
window.addEventListener("DOMContentLoaded", function() {
    const tropfen1 = document.querySelector('.tropfen1');
    const tropfen2 = document.querySelector('.tropfen2');
    const tropfen3 = document.querySelector('.tropfen3');
    const tropfen4 = document.querySelector('.tropfen4');
    const regen = document.querySelector('.regen');
    const schrift = document.querySelector('.schrift');
    const berge = document.querySelector('.berge');
    const flug = document.querySelector('.flug');
    const ziit = document.querySelector('.ziit');
    const wolkeR = document.querySelector('.wolke1');
    const wolkeL = document.querySelector('.wolke2');
    const wolken = [wolkeR, wolkeL];
    const sonne = document.querySelector('.sonne');
    const tropfen = [tropfen1, tropfen2, tropfen3, tropfen4];

    //changed api for gathering location
    const APIIP = "https://ipinfo.io/json";

    function Get(yourUrl){
        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET",yourUrl,false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }
    let loc = JSON.parse(Get(APIIP));
    let region = loc.region;

    if(!loc){
        region = Zurich;
    }

    let url = "https://api.openweathermap.org/data/2.5/weather?q="+region+"&appid=f747ad7fcba6ef4fe91531b6e4c9cf90";

    if(!url){
        url = "https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=f747ad7fcba6ef4fe91531b6e4c9cf90";
    }

    let weather = JSON.parse(Get(url));
    // when the url for openweather doesn't know the region render data of zurich
    if(!url || weather.cod == 404 || weather == undefined || !weather){
        url = "https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=f747ad7fcba6ef4fe91531b6e4c9cf90";
        weather = JSON.parse(Get(url));
        console.log('region not readable ' + region + ' ' + weather.name + ' ' + weather.weather[0].description);
    }else{
        console.log(region);
        console.log(weather.name + ' ' + weather.weather[0].description);
    }

    const tl = new TimelineLite({paused:true});
    const tlr = new TimelineLite({paused:true});
    const tls = new TimelineLite({paused:true});
    const tlw = new TimelineLite({paused:true});
    const tlsw = new TimelineLite({paused:true});

    let frain;
    let fsun;
    let fcloud;
    let fscloud;
        frain = tlr;
        fsun = tls;
        fcloud = tlw;
        fscloud = tlsw;
        tl.delay(1).play();

    tl.add('text');

    //start-animation mobile
    tl.fromTo(flug, 0.5, {x:17}, {x:0}, 'text')
       .fromTo(ziit, 0.5, {x:-17},{x:0}, 'text');


    //animation for rain mobile
    tlr.fromTo(regen, 1, {opacity:0, y:'50px', x:'2px'}, {opacity:1, y:'20px'})
        .staggerFrom(tropfen, 0.2, {opacity: 0}, -0.15)
        .staggerTo(tropfen, 0.1, {opacity: 0}, -0.15)
        .staggerTo(tropfen, 0.2, {opacity: 1}, -0.15)
        .staggerTo(tropfen, 0.1, {opacity: 0}, -0.15)
        .staggerTo(tropfen, 0.2, {opacity: 1}, -0.15)
        .staggerTo(tropfen, 0.1, {opacity: 0}, -0.15)
        .staggerTo(tropfen, 0.2, {opacity: 1}, -0.15);

    //animation sun mobile
    tls.fromTo(sonne, 1, {opacity:0, y:'50px'}, {opacity:1, y:'30px'});

    //animtion clouds mobile
    tlw.staggerFromTo(wolken, 0.5,
        {x: '16px',
            y:'50px',
            scaleY:0,
            scaleX:0,
            transformOrigin: '0 0'},
        {y:'50px',
            scaleY:1,
            scaleX:1,
            transformOrigin: '50% 50%'})
        .to(wolkeL, 0.5, {y: '30px'}, '-=0.4')
        .to(wolkeR, 0.5, {y: '30px'}, '-=0.4');

    //animation sunny with clouds mobile
    tlsw.fromTo(sonne, 0.5, {opacity:0, y:'50px'}, {opacity:1, y:'20px'})
        .staggerFromTo(wolken, 0.5,
            {x: '16px',
                scaleY:0,
                scaleX:0,
                transformOrigin: '0 0',
                opacity: 1},
            {scaleY:1,
                scaleX:1,
                transformOrigin: '50% 50%',
                opacity: 1}, "+=0.25", "-=0.4")
        .to(wolkeL, 0.5, {y: '30px'}, '-=0.4')
        .to(wolkeR, 0.5, {y: '30px'}, '-=0.4');

    console.log(weather.weather[0].id);
    //switch for the weather-id
    switch(weather.weather[0].id){
        case 801:
            fsun.time(0).pause();
            frain.time(0).pause();
            fcloud.time(0).pause();
            fscloud.delay(1).play();
            break;
        case 800:
            frain.time(0).pause();
            fcloud.time(0).pause();
            fscloud.time(0).pause();
            fsun.delay(1).play();
            break;
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 522:
        case 531:
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
            fsun.time(0).pause();
            fcloud.time(0).pause();
            fscloud.time(0).pause();
            frain.delay(1).play();
            break;
        case 802:
        case 803:
        case 804:
            fsun.time(0).pause();
            frain.time(0).pause();
            fscloud.time(0).pause();
            fcloud.delay(1).play();
            break;
        default:
            fsun.time(0).pause();
            frain.time(0).pause();
            fcloud.time(0).pause();
            fscloud.delay(1).play();
    }
}, false);