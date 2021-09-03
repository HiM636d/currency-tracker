
import {combineReducers} from 'redux';
import {rateReducer} from "./rateReducer";


const reducers = combineReducers({

    allRates: rateReducer,
});

export default reducers;

