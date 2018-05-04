import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import UserReducer from './UserReducers';
import FlightReducers from './FlightReducers';
import StartplacesReducer from './StartplacesReducer'

const rootReducer = combineReducers({
    form: formReducer,
    user: UserReducer,
    flights: FlightReducers,
    startplaces: StartplacesReducer
});

export default rootReducer;