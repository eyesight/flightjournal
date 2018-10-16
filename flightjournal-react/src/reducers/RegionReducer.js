import { FETCH_REGIONS } from '../constants/user';

export default function (state = {}, action) {
    switch (action.type) {
      case FETCH_REGIONS:
        return action.payload;
      default: 
        return state;
    }
  }