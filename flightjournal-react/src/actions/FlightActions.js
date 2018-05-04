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

export function saveFlights(post) {
  return dispatch => database.push(post)
}

export function deleteFlights(id) {
  return dispatch => database.child(id).remove();
}

export function updateFlights(id, updates) {
  return dispatch => database.child(id).update(updates);
}