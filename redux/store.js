import { createStore, combineReducers } from 'redux';
import { employeeReducer } from './reducers/employeeReducer';

// configure store
export const store = combineReducers({
  employee: employeeReducer,
});
