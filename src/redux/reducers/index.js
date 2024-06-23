import { combineReducers } from 'redux';
import salaryReducer from './salaryReducer';

const rootReducer = combineReducers({
  salary: salaryReducer,
});

export default rootReducer;
