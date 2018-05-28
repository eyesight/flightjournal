import { pilotsdb } from '../server/firebase';
import { FETCH_Pilots } from '../constants/user';

export function getPilots () {
  return dispatch => {
    pilotsdb.on('value', snapshot => {
      dispatch({
        type: FETCH_Pilots,
        payload: snapshot.val()
      })
    })
  }
}

export function savePilots(post) {
  return dispatch => {
    let key = pilotsdb.push().key;
    post.id = key;
    return pilotsdb.push(post)
  }
}

export function deletePilots(id) {
  return dispatch => pilotsdb.child(id).remove();
}