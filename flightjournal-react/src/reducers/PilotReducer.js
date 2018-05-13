import { FETCH_Pilots } from '../constants/user';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_Pilots:
        return action.payload;
      default:
        return state;
    }
  }