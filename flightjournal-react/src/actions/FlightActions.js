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

export function saveFlights(flight) {
  return dispatch => {
    const newRef = database.push();
    const newItem = {
      id: newRef.key,
      ...flight
    };
    return newRef.set(newItem);
  }
}

export function deleteFlights(id) {
  return dispatch => database.child(id).remove();
}

export function updateFlights(id, updates) {
  return dispatch => database.child(id).update(updates);
}