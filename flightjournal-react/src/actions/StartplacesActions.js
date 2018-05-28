import { startplacesdb } from '../server/firebase';
import { FETCH_SP } from '../constants/user';

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
    let key = startplacesdb.push().key;
    post.id = key;
    return startplacesdb.push(post);
  }
}

export function deleteStartplaces(id) {
  return dispatch => startplacesdb.child(id).remove();
}

export function updateStartplaces(id, updates) {
  return dispatch => startplacesdb.child(id).update(updates);
}