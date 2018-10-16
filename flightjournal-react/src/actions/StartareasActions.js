import { startareadb } from '../server/firebase';
import { FETCH_STARTAREAS } from '../constants/user';

export function getStartareas () {
  return dispatch => {
    startareadb.on('value', snapshot => {
      dispatch({
        type: FETCH_STARTAREAS,
        payload: snapshot.val()
      })
    })
  }
}

export function saveStartareas(post) {
  return dispatch => {
    const newRef = startareadb.push();
    const newItem = {
      id: newRef.key,
      ...post
    };
    return newRef.set(newItem);
  }
}

export function deleteStartareas(id) {
  return dispatch => startareadb.child(id).remove();
}

export function updateStartareas(id, updates) {
  return dispatch => startareadb.child(id).update(updates);
}