const initialState = {
  data: [],
  loader: true,
  error: false,
  message: '',
};

export const employeeReducer = (state = initialState, action) => {
  if (action.type == 'ADD_DATA') {
    return {
      ...state,
      data: action.payload,
    };
  }

  if (action.type == 'SET_LOADING') {
    return {
      ...state,
      loader: action.payload,
    };
  }

  return state;
};
