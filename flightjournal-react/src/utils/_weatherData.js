export function weather(){
    //changed api for gathering location
    const APIIP = "https://ipinfo.io/json";

    function Get(yourUrl){
        let Httpreq = new XMLHttpRequest(); // a new request
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }
    let loc = JSON.parse(Get(APIIP)); 
    let region = (loc) ? loc.region : 'Zurich';
    //let region = 'Zurich';

    let url = "https://api.openweathermap.org/data/2.5/weather?q="+region+"&appid=f747ad7fcba6ef4fe91531b6e4c9cf90";

    if(!url){
        url = "https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=f747ad7fcba6ef4fe91531b6e4c9cf90";
        console.log('url doesnt work');
    }

    let weather = JSON.parse(Get(url));
    // when the url for openweather doesn't know the region render data of zurich
    if(!url || weather.cod === '404' || weather === undefined || !weather){
        url = "https://api.openweathermap.org/data/2.5/weather?q=Zurich&appid=f747ad7fcba6ef4fe91531b6e4c9cf90";
        weather = JSON.parse(Get(url));
        console.log('region not readable ' + region + ' ' + weather.name + ' ' + weather.weather[0].description);
    }else{
        console.log(region);
    }
    return weather;
}