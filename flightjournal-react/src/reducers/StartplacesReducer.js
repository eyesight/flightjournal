import { FETCH_SP } from '../constants/user';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_SP:
        return action.payload;
      default:
        return state;
    }
  }