import { startplacesdb } from '../server/firebase';
import firebase from 'firebase'
import { FETCH_SP } from '../constants/user';

let refflights = firebase.database().ref(`flights/`);
export function getStartplaces () {
  return dispatch => {
    startplacesdb.on('value', snapshot => {
      dispatch({
        type: FETCH_SP,
        payload: snapshot.val()
      })
    })
  } 
}

export function saveStartplaces(post) {
  return dispatch => {
    const newRef = startplacesdb.push();
    const newItem = {
      id: newRef.key,
      ...post
    };
    return newRef.set(newItem);
  }
}

//TODO: it's somehow wrong. Rewrite it better -> it's not returning a promise
export function deleteStartplaces(id) {
  return dispatch => {
    let isUsed = [];
    //check in the flights, if this area is used. If it is, don't delete it
    refflights.on("value", (snapshot)=> {
      snapshot.forEach((data) =>{
        if(data.child('startplace').child('area').val() === id){
          console.log('here');
          return isUsed.push(data.key);
        };
      });
      if(isUsed.length <=0){
        return startplacesdb.child(id).remove();
      }else{
        console.log('this area is used');
      }
    });
  }
}

export function updateStartplaces(id, updates, updates2) {
  if(updates2){
    return dispatch => startplacesdb.child(id).update(updates, updates2);
  }else{
    return dispatch => startplacesdb.child(id).update(updates);
  }
}

//TODO: it's somehow wrong. Rewrite it better -> it's not returning a promise
export function deleteOneStartplace(idSP, idArea) {
  return dispatch => {
    //check in the flights, if this startplace is used. If it is, don't delete it
    let ref = firebase.database().ref(`startareas/${idArea}/startplaces`);
    return ref.once('value', snapshot =>{
      let isUsed = [];
      refflights.on("value", (snapshot)=> {
        snapshot.forEach((data) =>{
          if(data.child('startplace').child('startplace').val() === idSP){
            return isUsed.push(data.key);
          };
        });
        if(snapshot.numChildren() > 1 && isUsed.length <=0){
          return ref.child(idSP).remove();
        }
      });
    });
  }
}

export function deleteOneLandingplace(idLP, idArea) {
  return dispatch => {
    //check in the flights, if this startplace is used. If it is, don't delete it
    let ref = firebase.database().ref(`startareas/${idArea}/landingplaces`);
    return ref.once('value', snapshot =>{
          return ref.child(idLP).remove();
    });
  }
}