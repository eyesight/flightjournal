import firebase from 'firebase'
import keys from './Keys'

/* const config = {
    apiKey: keys.firebase,
    authDomain: "flugziit.firebaseapp.com",
    databaseURL: "https://flugziit.firebaseio.com",
    projectId: "flugziit",
    storageBucket: "flugziit.appspot.com",
    messagingSenderId: keys.firebaseSenderId
}; */

var config = {
    apiKey: keys.firebase,
    authDomain: "flugziittest.firebaseapp.com",
    databaseURL: "https://flugziittest.firebaseio.com",
    projectId: "flugziittest",
    storageBucket: "flugziittest.appspot.com",
    messagingSenderId: keys.firebaseSenderId
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database().ref('flights/');
export const startplacesdb = firebase.database().ref('startareas/');
export const startareadb = firebase.database().ref('startareas/');
export const regiondb = firebase.database().ref('regions/');
export const winddirectionsdb = firebase.database().ref('winddirections/');
export const pilotsdb = firebase.database().ref('pilots/');
export const paraglidersdb = firebase.database().ref('paragliders/');



