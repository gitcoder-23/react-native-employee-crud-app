import * as types from './types/employeeTypes';
import axios from 'axios';
import { rootApi } from '../../constants/rootApi';

const getEmployees = (employees) => ({
  type: types.GET_EMPLOYEES,
  payload: employees,
});

export const loadEmployees = () => {
  return function (dispatch) {
    axios
      .get(`${rootApi}/employees`)
      .then((resp) => {
        console.log('loadEmployees->', resp.data.employees);
        dispatch(getEmployees(resp.data.employees.reverse()));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
