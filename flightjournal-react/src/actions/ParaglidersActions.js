import { paraglidersdb } from '../server/firebase';
import { FETCH_Paragliders } from '../constants/user';

export function getParagliders () {
  return dispatch => {
    paraglidersdb.on('value', snapshot => {
      dispatch({
        type: FETCH_Paragliders,
        payload: snapshot.val()
      })
    })
  }
}

export function saveParagliders(post) {
  return dispatch => {
    const newRef = paraglidersdb.push();
    const newItem = {
      id: newRef.key,
      ...post
    };
    return newRef.set(newItem);
  }
}

export function deleteParagliders(id) {
  return dispatch => paraglidersdb.child(id).remove();
}

export function updateParagliders(id, updates) {
  return dispatch => paraglidersdb.child(id).update(updates);
}
