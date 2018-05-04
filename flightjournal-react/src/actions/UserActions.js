import { auth } from '../server/firebase';
import { GET_USER } from '../constants/user';

export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            dispatch({
                type: GET_USER,
                payload: user
            });
        });
    };
}

export function login(email, password) {
    return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
    return dispatch => auth.signOut();
}

export function pwforget(email) {
    return dispatch => auth.sendPasswordResetEmail(email);
}

export function createAccount(email, password) {
    return dispatch => auth.createUserWithEmailAndPassword(email, password);
}