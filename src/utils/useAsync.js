import { useReducer, useEffect } from 'react';
import { REQUEST_STATUS, reducer } from './utils';

const useAsync = (initialState, data, asyncFunction) => {
  const initialReducerState = {
    status: REQUEST_STATUS.IDLE,
    data: null,
    error: null,
  };
  const [state, dispatch] = useReducer(reducer, {
    ...initialReducerState,
    ...initialState,
  });

  useEffect(() => {
    if (!data) return;
    asyncFunction(data, dispatch);
  }, [data]);

  return { ...state };
};

export default useAsync;
