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

export const auth = firebase.auth();
