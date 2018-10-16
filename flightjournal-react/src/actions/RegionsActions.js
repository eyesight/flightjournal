import { regiondb } from '../server/firebase';
import { FETCH_REGIONS } from '../constants/user';

export function getRegions () {
  return dispatch => {
    regiondb.on('value', snapshot => {
      dispatch({
        type: FETCH_REGIONS,
        payload: snapshot.val()
      })
    })
  }
}

export function saveRegions(post) {
  return dispatch => {
    const newRef = regiondb.push();
    const newItem = {
      id: newRef.key,
      ...post
    };
    return newRef.set(newItem);
  }
}

export function deleteRegions(id) {
  return dispatch => regiondb.child(id).remove();
}

export function updateRegions(id, updates) {
  return dispatch => regiondb.child(id).update(updates);
}