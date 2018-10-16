import { FETCH_WINDDIRECTION } from '../constants/user';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_WINDDIRECTION:
        return action.payload;
      default:
        return state;
    }
  }