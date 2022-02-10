import * as types from '../actions/types/employeeTypes';

const initialState = {
  allEmpDatas: [],
  singleEmployee: {},
  isLoding: true,
  isError: false,
  message: '',
};

const employeeReducer = (state = initialState, action) => {
  // if (action.type == 'ADD_DATA') {
  //   return {
  //     ...state,
  //     data: action.payload,
  //   };
  // }

  // if (action.type == 'SET_LOADING') {
  //   return {
  //     ...state,
  //     isLoding: action.payload,
  //   };
  // }
  // return state;

  switch (action.type) {
    case types.GET_EMPLOYEES:
      return {
        ...state,
        allEmpDatas: action.payload,
        isLoding: false,
        isError: false,
      };

    default:
      return state;
  }
};

export default employeeReducer;
