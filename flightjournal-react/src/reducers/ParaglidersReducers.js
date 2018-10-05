import { FETCH_Paragliders } from '../constants/user';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_Paragliders:
        return action.payload;
      default:
        return state;
    }
  }