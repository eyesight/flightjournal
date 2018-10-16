import firebase from 'firebase'
import keys from './Keys'

var config = {
    apiKey: keys.firebase,
    authDomain: "flugziit.firebaseapp.com",
    databaseURL: "https://flugziit.firebaseio.com",
    projectId: "flugziit",
    storageBucket: "flugziit.appspot.com",
    messagingSenderId: keys.firebaseSenderId
};

firebase.initializeApp(config);
let id;

export const auth = firebase.auth();
export const database = firebase.database().ref('Flights/');
export const databaseDetail = firebase.database().ref(`Flights/${id}`);
export const startplacesdb = firebase.database().ref('startplaces/');
export const startareadb = firebase.database().ref('startareas/');
export const regiondb = firebase.database().ref('regions/');
export const winddirectionsdb = firebase.database().ref('winddirections/');
export const pilotsdb = firebase.database().ref('Pilots/');
export const paraglidersdb = firebase.database().ref('paragliders/');



