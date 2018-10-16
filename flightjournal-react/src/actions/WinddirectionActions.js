import { winddirectionsdb } from '../server/firebase';
import { FETCH_WINDDIRECTION } from '../constants/user';

export function getWinddirections() {
  return dispatch => {
    winddirectionsdb.on('value', snapshot => {
      dispatch({
        type: FETCH_WINDDIRECTION,
        payload: snapshot.val()
      })
    })
  }
}

export function saveWinddirections(post) {
  return dispatch => {
    const newRef = winddirectionsdb.push();
    const newItem = {
      id: newRef.key,
      ...post
    };
    return newRef.set(newItem);
  }
}

export function deleteWinddirections(id) {
  return dispatch => winddirectionsdb.child(id).remove();
}

export function updateWinddirections(id, updates) {
  return dispatch => winddirectionsdb.child(id).update(updates);
}