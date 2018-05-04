import firebase from 'firebase'
import keys from './ApiKeys'

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

