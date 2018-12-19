import { database } from '../server/firebase';
import { FETCH_FLIGHTS } from '../constants/user';

export function getFlights () {
  return dispatch => {
    database.on('value', snapshot => {
      dispatch({
        type: FETCH_FLIGHTS,
        payload: snapshot.val()
      })
    })
  }
}

//Todo: add id and overridign ID may easier to add/have one function for both
export function saveFlights(flight) {
  return dispatch => {
    let newRef = database.push();
    let newItem = {
      id: newRef.key,
      ...flight
    };
    newItem.id = newRef.key;
    console.log(newItem.id);
    return newRef.set(newItem);
  }
}

export function deleteFlights(id) {
  return dispatch => database.child(id).remove();
}

export function updateFlights(id, updates) {
  return dispatch => database.child(id).update(updates);
}