import { useReducer, useCallback } from 'react';
import { REQUEST_STATUS, reducer } from './utils';

const useAsync = (initialState) => {
  const initialReducerState = {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, {
    ...initialReducerState,
    ...initialState,
  });

  const runAsyncFunction = useCallback((fn, data = null) => {
    dispatch({ status: REQUEST_STATUS.PENDING });
    fn(data, dispatch);
  }, []);

  return { ...state, runAsyncFunction };
};

export default useAsync;
