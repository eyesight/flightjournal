import { FETCH_STARTAREAS } from '../constants/user';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_STARTAREAS:
        return action.payload;
      default:
        return state;
    }
  }