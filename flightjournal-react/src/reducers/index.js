import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import UserReducer from './UserReducers';

const rootReducer = combineReducers({
    form: formReducer,
    user: UserReducer
});

export default rootReducer;