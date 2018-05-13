import { startplacesdb } from '../server/firebase';
import { FETCH_Pilots } from '../constants/user';

export function getPilots () {
  return dispatch => {
    startplacesdb.on('value', snapshot => {
      dispatch({
        type: FETCH_Pilots,
        payload: snapshot.val()
      })
    })
  }
}

export function savePilots(post) {
  return dispatch => startplacesdb.push(post)
}

export function deletePilots(id) {
  return dispatch => startplacesdb.child(id).remove();
}