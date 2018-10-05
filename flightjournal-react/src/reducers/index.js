import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import UserReducer from './UserReducers';
import FlightReducers from './FlightReducers';
import StartplacesReducer from './StartplacesReducer';
import PilotReducer from './PilotReducer'
import ParaglidersReducer from './ParaglidersReducers'
import FilterReducers from './FilterReducers';

const rootReducer = combineReducers({
    form: formReducer,
    user: UserReducer,
    flights: FlightReducers,
    startplaces: StartplacesReducer,
    pilots: PilotReducer,
    filter: FilterReducers,
    paragliders: ParaglidersReducer,
});

export default rootReducer;