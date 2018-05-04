import { FETCH_FLIGHTS } from '../constants/user';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_FLIGHTS:
        return action.payload;
      default:
        return state;
    }
  }